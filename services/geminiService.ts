import { Type } from "@google/genai";
import { Source, StrategyTask, IntentRoute, DraftPreparationResult } from '../types';

// Centralized, robust error handler for API call errors
function throwEnhancedError(error: unknown, defaultMessage: string): never {
    console.error("API Error:", error);

    let messageToParse: string;
    
    // Attempt to extract a meaningful message from various error types
    if (error instanceof Error) {
        messageToParse = error.message;
    } else if (typeof error === 'object' && error !== null) {
        const errorObj = error as any;
        messageToParse = errorObj.error?.message || errorObj.message || JSON.stringify(error);
    } else {
        messageToParse = String(error);
    }
    
    const lowerCaseMessage = messageToParse.toLowerCase();

    if (lowerCaseMessage.includes('api key not valid')) {
        throw new Error('Invalid API Key. Please check your Cloudflare environment variables.');
    }
    if (lowerCaseMessage.includes('permission_denied')) {
        throw new Error('Permission Denied. Please ensure the Generative Language API is enabled for your project. (Permission Denied)');
    }
    if (lowerCaseMessage.includes('resource_exhausted') || lowerCaseMessage.includes('429')) {
        if (lowerCaseMessage.includes('quota')) {
            throw new Error('You have exceeded your API usage quota. Please check your Google AI Studio account for details. (Quota Exceeded)');
        } else {
            throw new Error('The AI model is currently busy. Please try again in a few moments. (Rate Limit Exceeded)');
        }
    }
    if (lowerCaseMessage.includes('400') || lowerCaseMessage.includes('invalid argument')) {
        throw new Error('There was a problem with the request. Please check the prompt. (Bad Request)');
    }
    if (lowerCaseMessage.includes('500') || lowerCaseMessage.includes('internal error')) {
        throw new Error('The AI service encountered an internal error. Please try again later. (Server Error)');
    }

    throw new Error(messageToParse || defaultMessage);
}

// Generic helper function to call our backend proxy
async function callApi(body: object) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: { message: `API request failed with status ${response.status}` } }));
        throwEnhancedError(errorBody, 'An unknown API error occurred.');
    }
    return response;
}

export async function* generateReportStream(prompt: string): AsyncGenerator<string, void, undefined> {
  const response = await callApi({
      stream: true,
      model: "gemini-2.5-flash",
      contents: prompt,
  });

  if (!response.body) {
      throw new Error('Streaming response has no body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = '';
  while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last, potentially incomplete line

      for (const line of lines) {
          if (line.startsWith('data: ')) {
              try {
                  const json = JSON.parse(line.substring(6));
                  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                  if (text) {
                      yield text;
                  }
              } catch (e) {
                  console.error('Failed to parse stream chunk:', line);
              }
          }
      }
  }
}

export interface SearchResult {
  text: string;
  sources: Source[];
}

async function performSearch(prompt: string): Promise<SearchResult> {
    const response = await callApi({
      stream: false,
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        // thinkingConfig is an SDK-specific feature, we omit it for the direct REST call.
      },
    });
    
    const geminiResponse = await response.json();

    const text = geminiResponse.text; // The proxy adds this for convenience
    const rawSources = geminiResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = rawSources
      .filter((source: any) => source.web?.uri)
      .map((source: any) => ({
        web: {
          uri: source.web.uri,
          title: source.web.title || source.web.uri,
        },
      }));

    return { text, sources };
}


export async function findLawyers(prompt: string): Promise<SearchResult> {
  return performSearch(prompt);
}

export async function findNotaries(prompt: string): Promise<SearchResult> {
    return performSearch(prompt);
}

export async function summarizeNews(prompt: string): Promise<SearchResult> {
    return performSearch(prompt);
}

export async function analyzeWebPage(prompt: string): Promise<SearchResult> {
    return performSearch(prompt);
}

export async function generateStrategy(goal: string, promptTemplate: string): Promise<StrategyTask[]> {
  const prompt = promptTemplate.replace('{goal}', goal);

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        taskName: { type: Type.STRING },
        description: { type: Type.STRING },
        effortPercentage: { type: Type.NUMBER },
        deliverableType: { type: Type.STRING },
        suggestedPrompt: { type: Type.STRING },
      },
      required: ['taskName', 'description', 'effortPercentage', 'deliverableType', 'suggestedPrompt'],
    },
  };
  
  const response = await callApi({
    stream: false,
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const geminiResponse = await response.json();
  const jsonText = geminiResponse.text.trim();
  const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
  return JSON.parse(cleanJson);
}

export async function getSuggestions(query: string, contextPrompt: string): Promise<string[]> {
  const prompt = `${contextPrompt}: "${query}"`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      suggestions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      }
    },
    required: ['suggestions']
  };
  
  try {
    const response = await callApi({
      stream: false,
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        maxOutputTokens: 150,
        temperature: 0.5,
      },
    });

    const geminiResponse = await response.json();
    const jsonText = geminiResponse.text.trim();
    const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
    const result = JSON.parse(cleanJson);
    
    if (result.suggestions && Array.isArray(result.suggestions)) {
        return result.suggestions.slice(0, 5);
    }
    return [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

export async function prepareDraftFromTask(task: StrategyTask, promptTemplate: string, docTypeOptions: string): Promise<DraftPreparationResult> {
  const prompt = promptTemplate
    .replace('{taskName}', task.taskName)
    .replace('{description}', task.description)
    .replace('{suggestedPrompt}', task.suggestedPrompt)
    .replace('{docTypeOptions}', docTypeOptions);

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      docType: { type: Type.STRING },
      topic: { type: Type.STRING },
      description: { type: Type.STRING },
    },
    required: ['docType', 'topic', 'description'],
  };

  const response = await callApi({
    stream: false,
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const geminiResponse = await response.json();
  const jsonText = geminiResponse.text.trim();
  const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
  return JSON.parse(cleanJson);
}

export async function routeUserIntent(goal: string, promptTemplate: string): Promise<IntentRoute[]> {
  const prompt = promptTemplate.replace('{goal}', goal);

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        module: { 
          type: Type.STRING,
          enum: ['legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer']
        },
        confidencePercentage: { type: Type.NUMBER },
        reasoning: { type: Type.STRING },
      },
      required: ['module', 'confidencePercentage', 'reasoning'],
    },
  };
  
  const response = await callApi({
    stream: false,
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });
  
  const geminiResponse = await response.json();
  const jsonText = geminiResponse.text.trim();
  const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
  const parsedResult = JSON.parse(cleanJson);

  if (Array.isArray(parsedResult)) {
      return parsedResult.filter((item: any) => 
          typeof item === 'object' && item !== null &&
          ['legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer'].includes(item.module)
      ) as IntentRoute[];
  }
  
  throw new Error("Received invalid data structure from AI.");
}
