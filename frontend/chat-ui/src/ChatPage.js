import "./App.css";
import React, { useState, useEffect, useRef } from "react";

// --- SVG Icon Components (No Changes Needed) ---
const BotAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mr-3 shadow-md flex-shrink-0">
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"
      />
    </svg>
  </div>
);

const SendIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);


function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "👋 Hello! I’m your AI Health Assistant. How can I help?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);


  // --- UPDATED handleSubmit Function with Multilingual Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Get the language preference saved by the Landing Page
    const userLanguage = localStorage.getItem('userLanguage') || 'en'; // Default to English

    try {
      // Send both the message AND the language to the backend
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: input, 
            language: userLanguage // Pass the language code here
        }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { text: data.bot_reply, sender: "bot" }]);
      }, 800);

    } catch (error) { // Changed to catch the specific error
      console.error("Connection issue:", error); // Log the error for debugging
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Connection issue. Please try again.", sender: "bot" },
      ]);
    }
  };


  return (
    <div className="relative h-screen flex items-center justify-center font-sans overflow-hidden">

      {/* --- Stylish Gradient Background with abstract shapes --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-100" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl animate-pulse" />

      {/* --- Chatbox Container --- */}
      <div className="relative w-full max-w-3xl h-[90vh] md:h-[80vh] bg-white/70 rounded-2xl shadow-2xl flex flex-col border border-gray-100 backdrop-blur-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-2xl">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
            <h1 className="text-lg font-bold">AI Health Assistant</h1>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-6 overflow-y-auto space-y-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && <BotAvatar />}
              <div
                className={`px-5 py-3 max-w-xs md:max-w-md shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-2xl rounded-bl-2xl"
                    : "bg-gray-50 text-gray-800 rounded-t-2xl rounded-br-2xl border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end">
              <BotAvatar />
              <div className="px-5 py-3 bg-gray-50 text-gray-500 rounded-t-2xl rounded-br-2xl shadow-md border">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white/80 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a health question..."
              className="flex-grow px-4 py-2 bg-gray-50 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:scale-110 transition flex-shrink-0"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;