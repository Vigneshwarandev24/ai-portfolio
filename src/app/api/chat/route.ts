import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Debug logging for API key
    console.log("Checking Chatbot API key...");
    console.log("API key exists:", !!process.env.CHATBOT_KEY);
    console.log("API key length:", process.env.CHATBOT_KEY?.length || 0);
    console.log("API key starts with:", process.env.CHATBOT_KEY?.substring(0, 10) || "none");

    if (!process.env.CHATBOT_KEY) {
      console.error("Chatbot API key not configured");
      return new Response(
        JSON.stringify({ 
          error: "Chatbot API key not configured",
          details: "Please add CHATBOT_KEY to your .env.local file and restart the development server"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (process.env.CHATBOT_KEY === "your_chatbot_api_key_here") {
      console.error("Chatbot API key is still the placeholder value");
      return new Response(
        JSON.stringify({ 
          error: "Invalid API key configuration",
          details: "Please replace the placeholder API key in .env.local with your actual Chatbot API key"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Initializing OpenAI client with OpenRouter...");
    
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.CHATBOT_KEY,
      defaultHeaders: {
        'HTTP-Referer': process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'http://localhost:3002',
        'X-Title': 'Vigneshwaran AI Portfolio',
      },
    });

    console.log("Making request to OpenRouter API with DeepSeek model...");
    
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log("OpenRouter API success, response received");
    
    return new Response(JSON.stringify({
      choices: [{
        message: completion.choices[0].message
      }]
    }), {
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error("Chat API error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    
    // Handle specific OpenAI errors
    let errorMessage = "Internal server error";
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes("402")) {
        errorMessage = "Insufficient credits on OpenRouter. Please add more credits or try again later.";
        statusCode = 402;
      } else if (error.message.includes("401")) {
        errorMessage = "Invalid API key. Please check your Chatbot API key.";
        statusCode = 401;
      } else if (error.message.includes("429")) {
        errorMessage = "Rate limit exceeded. Please try again later.";
        statusCode = 429;
      } else if (error.message.includes("404")) {
        errorMessage = "DeepSeek model is currently unavailable. Please try again later.";
        statusCode = 404;
      } else if (error.message.includes("400")) {
        errorMessage = "Invalid request. Please check the request format.";
        statusCode = 400;
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      { status: statusCode, headers: { "Content-Type": "application/json" } }
    );
  }
}
