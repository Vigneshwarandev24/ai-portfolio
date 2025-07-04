export async function GET() {
  return new Response(JSON.stringify({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasApiKey: !!process.env.CHATBOT_KEY
  }), {
    headers: { "Content-Type": "application/json" }
  });
} 