import OpenAI from 'openai';

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.CHATBOT_KEY;

    console.log("API key exists:", !!apiKey);
    console.log("API key starts with:", apiKey?.substring(0, 10) || "none");

    if (!apiKey || apiKey === "your_chatbot_api_key_here") {
      return new Response(
        JSON.stringify({
          error: "Chatbot API key not configured or is a placeholder",
          details: "Please add CHATBOT_KEY to your .env.local and restart the dev server"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey,
      defaultHeaders: {
        'HTTP-Referer': process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000',
        'X-Title': 'Vigneshwaran AI Portfolio',
      },
    });

    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });
      
      


    return new Response(
      JSON.stringify({
        choices: [
          {
            message: completion.choices[0].message,
          },
        ],
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Chat API error:", {
      message: error.message,
      stack: error.stack,
      error,
    });

    let statusCode = 500;
    let errorMessage = "Internal server error";

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
      errorMessage = "Model not found. Please check the model ID.";
      statusCode = 404;
    } else if (error.message.includes("400")) {
      errorMessage = "Invalid request. Please check the request format.";
      statusCode = 400;
    } else {
      errorMessage = error.message || "Unknown error occurred";
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: error.message || "Unknown error occurred",
      }),
      { status: statusCode, headers: { "Content-Type": "application/json" } }
    );
  }
}
