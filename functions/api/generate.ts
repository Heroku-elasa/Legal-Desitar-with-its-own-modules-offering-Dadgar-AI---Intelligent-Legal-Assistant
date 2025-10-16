// This is a Cloudflare Pages Function that acts as a serverless backend.
// It will be deployed automatically when placed in the /functions directory.

/**
 * The Env interface defines the environment variables available to the function.
 * We expect GEMINI_API_KEY to be set in the Cloudflare Pages project settings.
 */
interface Env {
  GEMINI_API_KEY: string;
}

/**
 * This function handles all POST requests to the /api/generate endpoint.
 * It proxies requests to the Google Gemini API, securely injecting the API key.
 * @param context - The Cloudflare Pages function context, containing the request and environment variables.
 */
export const onRequestPost = async (context: { request: Request; env: Env }) => {
    try {
        // We get the body from the client's request. It contains the model,
        // contents, config, and a flag to indicate if it's a streaming request.
        const { model, stream, contents, config } = await context.request.json();
        
        // The REST API expects contents in a specific format. Since our client
        // sends a simple string, we wrap it here.
        const requestBody: any = {
            contents: [{ parts: [{ text: contents }] }]
        };

        // We map the SDK-style config object to the REST API structure.
        if (config) {
            // Tools are a top-level property
            if (config.tools) {
                requestBody.tools = config.tools;
            }
            
            // Other settings go into generationConfig
            const generationConfig: any = {};
            if (config.temperature) generationConfig.temperature = config.temperature;
            if (config.topK) generationConfig.topK = config.topK;
            if (config.topP) generationConfig.topP = config.topP;
            if (config.maxOutputTokens) generationConfig.maxOutputTokens = config.maxOutputTokens;
            if (config.responseMimeType) generationConfig.responseMimeType = config.responseMimeType;
            if (config.responseSchema) generationConfig.responseSchema = config.responseSchema;
            
            if (Object.keys(generationConfig).length > 0) {
              requestBody.generationConfig = generationConfig;
            }

            // System instruction is also top-level in the v1beta API
            if (config.systemInstruction) {
                requestBody.systemInstruction = { parts: [{ text: config.systemInstruction }] };
            }
        }

        // Determine the correct API endpoint for streaming vs. non-streaming
        const method = stream ? 'streamGenerateContent?alt=sse' : 'generateContent';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${method}`;

        // Make the actual call to the Google Gemini API, injecting the key from environment variables
        const geminiResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': context.env.GEMINI_API_KEY, 
            },
            body: JSON.stringify(requestBody),
        });

        // If the API call fails, we forward the error to the client
        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            return new Response(errorBody, { status: geminiResponse.status, headers: { 'Content-Type': 'application/json' } });
        }
        
        // For non-streaming requests, we parse the JSON and add a convenient `.text`
        // property to mimic the SDK's behavior, which minimizes frontend changes.
        if (!stream) {
            const responseJson = await geminiResponse.json();
            const text = responseJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const enhancedResponse = { ...responseJson, text };
            
            return new Response(JSON.stringify(enhancedResponse), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // For streaming, we pass the response body directly through.
        // We set cache-control headers to ensure the client gets fresh data.
        const responseHeaders = new Headers(geminiResponse.headers);
        responseHeaders.set('Cache-Control', 'no-cache');
        
        return new Response(geminiResponse.body, {
            status: geminiResponse.status,
            headers: responseHeaders,
        });

    } catch (e) {
        // Catch any unexpected errors in the proxy function itself
        const error = e instanceof Error ? e : new Error(String(e));
        return new Response(JSON.stringify({ error: { message: `Proxy Error: ${error.message}` } }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
