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
        // We want to show "View More" if the height exceeds roughly 2 lines.
        // Assuming line-height is around 24px (1.5rem), 2 lines is 48px.
        // We'll use a slightly more robust check.
        const threshold = 50; // Match 2 lines of 1.5rem (24px * 2 = 48px)
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
            maxHeight: isExpanded ? "2000px" : "3.1rem", // Slightly increased for comfortable 2-line fit
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
                  href={`/${basePath}/${link.slug}`}
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
            className="mt-3 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-brand-green hover:text-white transition-colors group"
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
