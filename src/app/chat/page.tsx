"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "system", 
      content: "You are Vigneshwaran's AI assistant. Help users learn about his skills, projects, and career. Be friendly and informative. You can discuss his full-stack development experience, AI projects, and technical skills." 
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle API errors with specific messages
        const errorMessage = data.error || "Failed to get response from AI service";
        const details = data.details ? `\n\nDetails: ${data.details}` : "";
        throw new Error(`${errorMessage}${details}`);
      }

      const aiReply = data.choices?.[0]?.message;
      
      if (aiReply) {
        setMessages([...updatedMessages, aiReply]);
      } else {
        throw new Error("No response from AI - the API returned an empty response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Provide more specific error messages
      let errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later.";
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage = "API key configuration error. Please check your Chatbot API key.";
        } else if (error.message.includes("rate limit")) {
          errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
        } else if (error.message.includes("temporarily unavailable")) {
          errorMessage = "The AI service is temporarily unavailable. Please try again in a few minutes.";
        } else if (error.message.includes("No response from AI")) {
          errorMessage = "The AI service returned an empty response. Please try again.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI Assistant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ask me anything about Vigneshwaran's skills, projects, or career!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.slice(1).map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-3 rounded-lg ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {msg.role === "user" ? "You" : "AI Assistant"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-lg">
                  <div className="text-sm font-medium mb-1">AI Assistant</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder="Ask about my skills, projects, or career..."
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-medium"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
            
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              💡 Try asking: "What are your technical skills?" or "Tell me about your projects"
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
