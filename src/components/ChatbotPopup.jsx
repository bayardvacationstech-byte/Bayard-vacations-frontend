"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Send, Bot, User, Sparkles, MapPin, Calendar, Users, ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Copy, ThumbsUp, ThumbsDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPackagesByRegion } from "@/utils/firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as SwiperPagination } from "swiper/modules";
import PackageCard from "@/components/ui/PackageCard";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ChatPackageCard = ({ item }) => {
  const imageUrl = item.cardImages?.[0]?.url || item.bannerImages?.[0]?.url;
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[16/10] w-full">
        {imageUrl ? (
          <img src={imageUrl} alt={item.packageTitle} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <MapPin className="w-6 h-6" />
          </div>
        )}
        <div className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {item.days}D/{item.nights}N
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-xs text-gray-800 line-clamp-1 mb-2">{item.packageTitle}</h4>
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-blue-600 font-bold text-sm">₹{item.offerPrice || item.basePrice}</span>
            {item.offerPrice > 0 && item.basePrice > 0 && (
              <span className="text-[10px] text-gray-400 line-through ml-1">₹{item.basePrice}</span>
            )}
          </div>
          <a 
            href={`/packages/${item.region}/${item.packageSlug}`}
            target="_blank"
            className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default function ChatbotPopup({ isOpen, onClose }) {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const INITIAL_MESSAGES = [
    {
      id: 1,
      text: "Hello! 👋 Welcome to Bayard Vacations. How can I help you plan your perfect trip today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ];
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showDestinations, setShowDestinations] = useState(false);

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

  const handleDestinationClick = async (slug, name) => {
    // Add user message for destination selection
    const userMessage = {
      id: Date.now(),
      text: `Tell me about ${name} packages`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowDestinations(false);
    setIsTyping(true);

    try {
      const regionPackages = await getPackagesByRegion(slug);
      
      const botResponse = {
        id: Date.now() + 1,
        text: `Here are some amazing tour packages for **${name}**! 🌴`,
        sender: "bot",
        timestamp: new Date(),
        isHtml: true,
        packages: regionPackages.slice(0, 5), // Only show top 5 for brevity
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching packages:", error);
      handleSendMessage(null, `Tell me about Bali packages`); // Fallback to normal chat if fetch fails
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (text) => {
    setShowQuickReplies(false);
    if (text === "Popular Destinations") {
      setShowDestinations(true);
    }
    handleSendMessage(null, text);
  };

  const handleSendMessage = async (e, text = null, isRegenerate = false) => {
    if (e) e.preventDefault();
    const messageText = text || inputMessage;
    if (!messageText.trim()) return;

    // Filter and format history for API
    // If regenerating, we want to exclude the last bot message from history
    let historyToProcess = messages;
    if (isRegenerate) {
      // Find the last bot message index
      const lastBotIndex = [...messages].reverse().findIndex(m => m.sender === "bot");
      if (lastBotIndex !== -1) {
        // Remove the existing bot response being regenerated
        const actualIndex = messages.length - 1 - lastBotIndex;
        historyToProcess = messages.slice(0, actualIndex);
        setMessages(historyToProcess); // Clean UI for fresh generation
      }
    }

    const chatHistory = historyToProcess
      .filter(msg => msg.id !== 1)
      .slice(-10)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    // Add user message if not regenerating
    if (!isRegenerate) {
      const userMessage = {
        id: Date.now(),
        text: messageText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
    }

    setInputMessage("");
    setIsTyping(true);

    // Prepare a placeholder for the bot response
    const botMessageId = Date.now() + 1;
    let botResponseText = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: messageText,
          history: chatHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Chat API error:", response.status, errorData);
        throw new Error(errorData.error || "Failed to get response from AI");
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      setIsTyping(false); // Stop typing animation once we start receiving chunks

      // Initial bot response state
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          text: "",
          sender: "bot",
          timestamp: new Date(),
          isHtml: true,
        },
      ]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Split buffer by newlines to process complete lines
        const lines = buffer.split("\n");
        // Keep the last (potentially incomplete) line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("data: ")) {
            try {
              const dataStr = trimmedLine.slice(6);
              if (dataStr === "[DONE]") continue; // Handle end of stream if applicable
              
              const data = JSON.parse(dataStr);
              if (data.token) {
                botResponseText += data.token;

                // Update the bot message in real-time
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId ? { ...msg, text: botResponseText } : msg
                  )
                );
              } else if (data.full_response && !botResponseText) {
                // Fallback for non-streaming or final response if tokens were missed
                botResponseText = data.full_response;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId ? { ...msg, text: botResponseText } : msg
                  )
                );
              }
            } catch (e) {
              // Silently ignore parsing errors for partial lines or non-JSON data
              console.debug("SSE Parse Error:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error calling AI API:", error);
      setIsTyping(false);
      
      const fallbackResponse = {
        id: Date.now() + 2,
        text: "I'm having trouble connecting right now. Please call us at +91 6363117421 or try again in a moment! 🙏",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setShowQuickReplies(true);
    setShowDestinations(false);
    setInputMessage("");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleEdit = (text) => {
    setInputMessage(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
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
    html = html.replace(/^\s*[•\-]\s+(.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li>.*?<\/li>\n?)+/g, (match) => {
      return '<ul class="list-disc pl-5 space-y-1.5 my-3 marker:text-blue-400">' + match.trim() + '</ul>';
    });

    // Convert line breaks, but skip if they are inside <ul> to avoid extra spacing
    html = html.replace(/\n/g, '<br>');
    html = html.replace(/(<ul.*?>.*?<\/ul>)<br>/g, '$1'); // Clean up trailing br after ul

    return html;
  };

  return (
    <>
      {/* Chat Panel - Enhanced Design */}
      <div
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[450px] h-[80vh] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-50 transform transition-all duration-500 ease-out overflow-hidden flex flex-col ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Animated Header with Gradient */}
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white p-5 overflow-hidden flex-shrink-0">
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
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  onClick={handleClearChat}
                  className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 group/clear"
                  title="Clear conversation"
                >
                  <Trash2 className="w-5 h-5 group-hover/clear:scale-110 transition-transform" />
                </button>
              )}
              <button
                onClick={onClose}
                className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex animate-fadeIn ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                }`}
              >
                {message.isHtml && message.sender === "bot" ? (
                  <div className="space-y-3">
                    <div 
                      className="text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(message.text) }}
                    />
                    
                    {message.packages && message.packages.length > 0 && (
                      <div className="relative mt-3">
                        <Swiper
                          modules={[Navigation, SwiperPagination]}
                          spaceBetween={12}
                          slidesPerView={1.15}
                          grabCursor={true}
                          navigation={{
                            nextEl: `.chat-next-${message.id}`,
                            prevEl: `.chat-prev-${message.id}`,
                          }}
                          className="rounded-xl overflow-hidden"
                        >
                          {message.packages.map((pkg) => (
                            <SwiperSlide key={pkg.id}>
                              <ChatPackageCard item={pkg} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        
                        <div className="flex justify-end gap-2 mt-3">
                          <button className={`chat-prev-${message.id} p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow-sm`}>
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button className={`chat-next-${message.id} p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow-sm`}>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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

                {message.sender === "user" && (
                  <div className="flex items-center gap-1 mt-2 -mr-1 justify-end">
                    <button 
                      onClick={() => handleCopy(message.text)}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-blue-100 hover:text-white transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleEdit(message.text)}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-blue-100 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {message.sender === "bot" && (
                  <div className="flex items-center gap-1 mt-2 -ml-1">
                    <button 
                      onClick={() => {
                        // Find the last user message text to regenerate
                        const lastUserMessage = [...messages].reverse().find(m => m.sender === "user");
                        if (lastUserMessage) {
                          handleSendMessage(null, lastUserMessage.text, true);
                        }
                      }} 
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Regenerate"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleCopy(message.text)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors" title="Good response">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors" title="Bad response">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex animate-fadeIn">
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
                    onClick={() => handleDestinationClick(destination.slug, destination.name)}
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
        <div className="bg-white border-t border-gray-200 p-4 backdrop-blur-sm flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 min-h-[44px] max-h-[120px] rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-5 py-2.5 transition-all duration-300 resize-none h-auto scrollbar-none"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 w-11 h-11 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
          width: 5px;
          height: 0px;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f1f1;
          overflow-x: hidden;
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
        
        /* Hide horizontal scrollbar specifically */
        .custom-scrollbar::-webkit-scrollbar:horizontal {
          display: none;
        }
      `}</style>
    </>
  );
}
