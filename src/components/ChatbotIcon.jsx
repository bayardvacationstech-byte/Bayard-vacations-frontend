"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import ChatbotPopup from "./ChatbotPopup";

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-4 sm:bottom-24 z-50 group"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse" />
          
          {/* Main button */}
          <div className="relative rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 p-4 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] hover:scale-110 transition-all duration-300 animate-floatSlow">
            <Bot className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
        </div>
      </button>

      <ChatbotPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
