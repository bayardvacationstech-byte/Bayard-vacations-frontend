"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FooterSection = ({ title, links, basePath = "packages" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        // Show "View More" if the height exceeds roughly 3 lines.
        // Assuming line-height is around 24px (1.5rem), 3 lines is 72px.
        const threshold = 75; // Match 3 lines of 1.5rem (24px * 3 = 72px)
        setShouldShowButton(contentRef.current.scrollHeight > threshold);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [links]);

  return (
    <div className="flex flex-col gap-3">
      <h5 className="font-semibold tracking-wide text-white">{title}</h5>
      
      <div className="relative">
        <div
          style={{
            maxHeight: isExpanded ? "2000px" : "4.6rem", // Increased for comfortable 3-line fit
            overflow: "hidden",
            transition: "max-height 0.4s ease-in-out",
          }}
          className="relative"
        >
          <div
            ref={contentRef}
            className="flex flex-wrap gap-x-3 gap-y-1 text-white/80"
            style={{ lineHeight: "1.5rem", fontSize: "0.875rem" }}
          >
            {links.map((link, i) => (
              <div key={link.id || link.slug || i} className="flex items-center gap-2">
                <Link
                  href={`/${basePath}/${link.slug.split("?")[0]}`}
                  className="hover:text-brand-green hover:translate-x-1 transition-all duration-300 whitespace-nowrap"
                >
                  {link.name || link.title}
                </Link>
                {i !== links.length - 1 && (
                  <span className="opacity-20 select-none">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {shouldShowButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:to-yellow-500 transition-all group"
            style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </>
            ) : (
              <>
                View More <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FooterSection;
