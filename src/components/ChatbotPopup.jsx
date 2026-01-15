"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Send, Bot, User, Sparkles, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatbotPopup({ isOpen, onClose }) {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Bayard Vacations. How can I help you plan your perfect trip today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showDestinations, setShowDestinations] = useState(false);
  const messagesEndRef = useRef(null);

  // Popular destinations data
  const popularDestinations = [
    { name: "Bali", slug: "bali", emoji: "🌴", description: "Tropical paradise" },
    { name: "Dubai", slug: "dubai", emoji: "🏙️", description: "Modern marvels" },
    { name: "Maldives", slug: "maldives", emoji: "🏖️", description: "Luxury resorts" },
    { name: "Paris", slug: "paris", emoji: "🗼", description: "Romantic getaway" },
    { name: "Switzerland", slug: "switzerland", emoji: "🏔️", description: "Alpine beauty" },
    { name: "Thailand", slug: "thailand", emoji: "🛕", description: "Cultural wonders" },
    { name: "Singapore", slug: "singapore", emoji: "🌆", description: "Urban paradise" },
    { name: "Goa", slug: "goa", emoji: "🏝️", description: "Beach vibes" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { icon: MapPin, text: "Popular Destinations", emoji: "🌍" },
    { icon: Calendar, text: "Plan a Trip", emoji: "✈️" },
    { icon: Users, text: "Group Packages", emoji: "👥" },
    { icon: Sparkles, text: "Special Offers", emoji: "✨" },
  ];

  const handleDestinationClick = (slug) => {
    router.push(`/packages/${slug}`);
    onClose();
  };

  const handleQuickReply = (text) => {
    setShowQuickReplies(false);
    if (text === "Popular Destinations") {
      setShowDestinations(true);
    }
    handleSendMessage(null, text);
  };

  const handleSendMessage = async (e, quickReplyText = null) => {
    if (e) e.preventDefault();
    const messageText = quickReplyText || inputMessage;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call the API through our Next.js API route to avoid CORS issues
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      
      const botResponse = {
        id: messages.length + 2,
        text: data.ai_response || data.response || data.message || "I'm here to help! Please tell me more about your travel plans.",
        sender: "bot",
        timestamp: new Date(),
        isHtml: true, // Flag to indicate this should be rendered as HTML
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      
      // Fallback response if API fails
      const fallbackResponse = {
        id: messages.length + 2,
        text: "I'm having trouble connecting right now. Please call us at +91 6363117421 or try again in a moment! �",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Format markdown to HTML
  const formatMarkdownToHTML = (text) => {
    if (!text) return '';

    let html = text;

    // Convert **bold** to <strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Convert ### headers
    html = html.replace(/^##### (.+)$/gm, '<h5 class="font-bold text-sm mt-2 mb-1">$1</h5>');
    html = html.replace(/^#### (.+)$/gm, '<h4 class="font-bold text-base mt-2 mb-1">$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="font-bold text-lg mt-2 mb-1">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="font-bold text-xl mt-3 mb-2">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="font-bold text-2xl mt-3 mb-2">$1</h1>');

    // Convert bullet points (• or -)
    html = html.replace(/^[•\-] (.+)$/gm, '<li class="ml-4">$1</li>');

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li.*?>.*?<\/li>\n?)+/g, (match) => {
      return '<ul class="list-disc list-inside space-y-1 my-2">' + match + '</ul>';
    });

    // Convert line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  };

  return (
    <>
      {/* Chat Panel - Enhanced Design */}
      <div
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[400px] h-[calc(100vh-120px)] sm:h-[550px] max-h-[650px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-50 transform transition-all duration-500 ease-out overflow-hidden ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Animated Header with Gradient */}
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white p-5 overflow-hidden">
          {/* Animated background circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse [animation-delay:0.5s]" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <div className="relative bg-white/20 backdrop-blur-sm p-2.5 rounded-full border border-white/30">
                  <Bot className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Bayard Assistant
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-xs text-blue-100 font-medium">Online • Ready to help</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container with Custom Scrollbar */}
        <div className="h-[calc(100vh-280px)] sm:h-[360px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-2 animate-fadeIn ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                }`}
              >
                {message.isHtml && message.sender === "bot" ? (
                  <div 
                    className="text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(message.text) }}
                  />
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                )}
                <p
                  className={`text-xs mt-1.5 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-400"
                  }`}
                >
                  {isMounted && message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 animate-fadeIn">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4 text-gray-700" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-5 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          {/* Quick Reply Buttons */}
          {showQuickReplies && messages.length === 1 && (
            <div className="space-y-2 animate-fadeIn pt-2">
              <p className="text-xs text-gray-500 font-medium px-1">Quick options:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.text)}
                    className="flex items-center gap-2 p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group hover:scale-105 shadow-sm"
                  >
                    <span className="text-lg">{reply.emoji}</span>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">
                      {reply.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Destination Buttons */}
          {showDestinations && (
            <div className="space-y-2 animate-fadeIn pt-2">
              <p className="text-xs text-gray-500 font-medium px-1">Click to explore:</p>
              <div className="grid grid-cols-2 gap-2">
                {popularDestinations.map((destination, index) => (
                  <button
                    key={index}
                    onClick={() => handleDestinationClick(destination.slug)}
                    className="flex items-center justify-between p-3 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-300 group hover:scale-105"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{destination.emoji}</span>
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-800">{destination.name}</p>
                        <p className="text-[10px] text-gray-500">{destination.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-5 py-2.5 transition-all duration-300"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
        }
      `}</style>
    </>
  );
}
