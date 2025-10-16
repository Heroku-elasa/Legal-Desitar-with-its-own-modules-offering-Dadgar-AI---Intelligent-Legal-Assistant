import { GoogleGenAI, Type } from "@google/genai";
import { Source, StrategyTask, IntentRoute, DraftPreparationResult, Notary } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

// Centralized, robust error handler for Gemini API calls
function throwEnhancedError(error: unknown, defaultMessage: string): never {
    console.error("Gemini API Error:", error);

    let messageToParse: string;
    
    if (error instanceof Error) {
        messageToParse = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
        messageToParse = (error as any).message;
    } else if (typeof error === 'string') {
        messageToParse = error;
    } else {
        try {
            messageToParse = JSON.stringify(error);
        } catch {
            messageToParse = String(error);
        }
    }

    let finalErrorMessage = messageToParse;
    try {
        const jsonMatch = finalErrorMessage.match(/({.*})/s);
        if (jsonMatch && jsonMatch[1]) {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed.error?.message) {
                const status = parsed.error.status || '';
                const code = parsed.error.code || '';
                finalErrorMessage = `${code} ${status}: ${parsed.error.message}`;
            }
        }
    } catch (e) {
        // No valid JSON found.
    }
    
    const lowerCaseMessage = finalErrorMessage.toLowerCase();

    if (lowerCaseMessage.includes('api key not valid')) {
        throw new Error('Invalid API Key. Please check your API key in the environment variables.');
    }
    
    if (lowerCaseMessage.includes('permission_denied') || lowerCaseMessage.includes('does not have permission')) {
        throw new Error('Permission Denied. Please ensure the Generative Language API is enabled for your project and that your API key has the correct permissions. (Permission Denied)');
    }
    
    if (lowerCaseMessage.includes('resource_exhausted') || lowerCaseMessage.includes('429')) {
        if (lowerCaseMessage.includes('quota')) {
            throw new Error('You have exceeded your API usage quota. Please check your Google AI Studio account for details. (Quota Exceeded)');
        } else {
            throw new Error('The AI model is currently busy due to high demand. Please try again in a few moments. (Rate Limit Exceeded)');
        }
    }

    if (lowerCaseMessage.includes('400') || lowerCaseMessage.includes('invalid argument')) {
        throw new Error('There was a problem with the request. Please check the document or prompt. (Bad Request)');
    }
    if (lowerCaseMessage.includes('500') || lowerCaseMessage.includes('internal error') || lowerCaseMessage.includes('rpc failed')) {
        throw new Error('The AI service encountered an internal error. Please try again later. (Server Error)');
    }

    throw new Error(finalErrorMessage || defaultMessage);
}


// A generic retry wrapper for non-streaming Gemini calls.
async function withRetry<T>(apiCall: () => Promise<T>, errorMessage: string): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Gemini API call attempt ${attempt} failed:`, lastError);

      const message = lastError.message.toLowerCase();
      if (message.includes('api key not valid') || message.includes('quota') || message.includes('400') || message.includes('invalid argument') || message.includes('permission denied')) {
          break; 
      }

      if (attempt < MAX_RETRIES) {
        const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throwEnhancedError(lastError, errorMessage);
}


export async function* generateReportStream(prompt: string): AsyncGenerator<string, void, undefined> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: prompt,
      });

      for await (const chunk of response) {
          yield chunk.text;
      }
      return; 

    } catch (error) {
      lastError = error instanceof Error ? error : new Error('An unknown error occurred during the API call');
      console.error(`Gemini API call attempt ${attempt} failed:`, lastError.message);

      if (attempt < MAX_RETRIES) {
        const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throwEnhancedError(lastError, `Failed to generate content from Gemini after ${MAX_RETRIES} attempts.`);
}

export interface SearchResult {
  text: string;
  sources: Source[];
}

async function performSearch(prompt: string, errorMessage: string): Promise<SearchResult> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const text = response.text;
    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = rawSources
      .filter(source => source.web?.uri)
      .map(source => ({
        web: {
          uri: source.web!.uri!,
          title: source.web!.title || source.web!.uri!,
        },
      }));

    return { text, sources };
  }, errorMessage);
}


export async function findLawyers(prompt: string): Promise<SearchResult> {
  return performSearch(prompt, 'Failed to find lawyers. There might be an issue with the API or your request.');
}

export async function findNotaries(prompt: string): Promise<SearchResult> {
    return performSearch(prompt, 'Failed to find notaries. There might be an issue with the API or your request.');
}

export async function summarizeNews(prompt: string): Promise<SearchResult> {
    return performSearch(prompt, 'Failed to summarize news. There might be an issue with the API or your request.');
}

export async function analyzeWebPage(prompt: string): Promise<SearchResult> {
    return performSearch(prompt, 'Failed to analyze web page. The URL might be inaccessible or the content could not be processed.');
}

export async function generateStrategy(goal: string, promptTemplate: string): Promise<StrategyTask[]> {
  const prompt = promptTemplate.replace('{goal}', goal);

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        taskName: { type: Type.STRING, description: "A concise name for the task." },
        description: { type: Type.STRING, description: "A brief explanation of what the task involves." },
        effortPercentage: { type: Type.NUMBER, description: "An estimated percentage of the total project effort this task will take." },
        deliverableType: { type: Type.STRING, description: "A short, clear name for the output of this task (e.g., 'Business Plan', 'Market Research Report', 'Podcast Script')." },
        suggestedPrompt: { type: Type.STRING, description: "A detailed, high-quality prompt for an AI to generate the deliverable for this task." },
      },
      required: ['taskName', 'description', 'effortPercentage', 'deliverableType', 'suggestedPrompt'],
    },
  };
  
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // It might be wrapped in markdown ```json ... ```, let's strip that.
    const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanJson);
  }, 'Failed to generate strategy. There might be an issue with the API or your request.');
}

export async function getSuggestions(query: string, contextPrompt: string): Promise<string[]> {
  const prompt = `${contextPrompt}: "${query}"`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      suggestions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of 3 to 5 concise suggestions related to the user input.'
      }
    },
    required: ['suggestions']
  };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 150,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
    const result = JSON.parse(cleanJson);
    
    if (result.suggestions && Array.isArray(result.suggestions)) {
        return result.suggestions.slice(0, 5);
    }
    return [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    // Don't throw for suggestions, just return empty array
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
      docType: { type: Type.STRING, description: "The most relevant document type from the provided list." },
      topic: { type: Type.STRING, description: "A concise title for the document." },
      description: { type: Type.STRING, description: "Detailed information for the document drafter." },
    },
    required: ['docType', 'topic', 'description'],
  };

  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanJson);
  }, 'Failed to prepare draft from task. There might be an issue with the API or your request.');
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
          description: "The key of the suggested module. Must be one of: 'legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer'.",
          enum: ['legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer']
        },
        confidencePercentage: { type: Type.NUMBER, description: "A percentage (0-100) indicating the confidence in this suggestion." },
        reasoning: { type: Type.STRING, description: "A brief explanation for why this module is recommended." },
      },
      required: ['module', 'confidencePercentage', 'reasoning'],
    },
  };
  
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const cleanJson = jsonText.replace(/^```json\s*|```$/g, '');
    const parsedResult = JSON.parse(cleanJson);

    // Basic validation to ensure module keys are correct
    if (Array.isArray(parsedResult)) {
        return parsedResult.filter(item => 
            typeof item === 'object' &&
            item !== null &&
            ['legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer'].includes(item.module)
        ) as IntentRoute[];
    }
    
    throw new Error("Received invalid data structure from AI.");

  }, 'Failed to get routing suggestions. There might be an issue with the API or your request.');
}