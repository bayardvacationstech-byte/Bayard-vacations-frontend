"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    // Start animation on mount
    setStart(true);
  }, []);

  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
      
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  }, [direction, speed]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  // Duplicate items for infinite scroll effect
  const duplicatedItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    // If fewer items, duplicate more times to fill width
    const minItems = 10; 
    let result = [...items];
    while (result.length < minItems) {
       result = [...result, ...items];
    }
    return [...result, ...result]; // Double it one last time for seamless loop
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            key={idx}
            className="w-[320px] sm:w-[400px] md:w-[500px] relative rounded-xl flex-shrink-0 bg-slate-800 border border-slate-700/50 p-4 md:p-5 transition-transform duration-300 hover:-translate-y-1 shadow-xl group overflow-hidden"
          >
             {/* Decorative Quote Icon Background */}
            <div className="absolute top-2 left-4 opacity-5 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white transform -scale-x-100">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 13.5912 10.1553 12.33 12.4649 12.2101L12.517 11.2099C8.30396 11.4286 7.98929 14.2818 8.00001 16H8V19H11V21H5V16C5 12 8 7 13 7V10C10 10 9 12 9 13.5042C9.176 13.5015 9.35624 13.5 9.54001 13.5029C10.6343 13.5205 11.7584 13.7845 12.5858 14.5858C13.4771 15.4488 14.017 16.6575 14.017 18V21ZM22.017 21L22.017 18C22.017 16.8954 21.1216 16 20.017 16H17C17 13.5912 18.1553 12.33 20.4649 12.2101L20.517 11.2099C16.304 11.4286 15.9893 14.2818 16 16H16V19H19V21H13V16C13 12 16 7 21 7V10C18 10 17 12 17 13.5042C17.176 13.5015 17.3562 13.5 17.54 13.5029C18.6343 13.5205 19.7584 13.7845 20.5858 14.5858C21.4771 15.4488 22.017 16.6575 22.017 18V21Z" />
              </svg>
            </div>

            <div className="flex flex-col h-full relative z-10 justify-between gap-3">
              {/* Text - Strict 2 lines */}
              <p className="text-sm md:text-base leading-snug text-white/90 font-medium line-clamp-2">
                &quot;{item.text}&quot;
              </p>

              {/* Bottom Row: User + Stars */}
              <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-1">
                 {/* User Info */}
                 <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        width={36}
                        height={36}
                        alt={item.author_name}
                        src={item.profile_photo_url}
                        className="rounded-full object-cover size-9 border border-white/30"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-white">
                        {item.author_name}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-brand-blue">
                        {item.author_role || "Traveler"}
                      </span>
                    </div>
                 </div>

                 {/* Stars */}
                 <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="size-3.5 fill-brand-accent text-brand-accent drop-shadow-sm"
                      />
                    ))}
                 </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
