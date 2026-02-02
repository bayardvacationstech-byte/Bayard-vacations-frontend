"use client";

import { useEffect, useCallback } from "react";
import useModal from "@/hooks/useModal";

/**
 * LeadGenerationTrigger handles the automatic opening of the lead enquiry form
 * based on user behavior (time on page or scroll depth).
 * 
 * It ensures the popup is only shown once per session using sessionStorage.
 */
const LeadGenerationTrigger = () => {
  const { openModal, isOpen } = useModal();

  const handleTrigger = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Check if already shown in this session
    const key = "bayard_lead_popup_final";
    if (sessionStorage.getItem(key) === "true") return;
    
    // Don't trigger if already open
    if (isOpen) return;

    sessionStorage.setItem(key, "true");
    openModal();
  }, [openModal, isOpen]);

  // If the user opens the modal manually, also count it as "shown"
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      sessionStorage.setItem("bayard_lead_popup_final", "true");
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Initial check to avoid setting timers if already shown
    const key = "bayard_lead_popup_final";
    if (sessionStorage.getItem(key) === "true") return;

    // --- Time-based Trigger ---
    // Show after 15 seconds
    const timer = setTimeout(() => {
      handleTrigger();
    }, 15000);

    // --- Scroll-based Trigger ---
    // Show when scrolling past 40% of the page
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Safety check for short pages
      if (scrollHeight <= clientHeight + 100) return;

      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage > 0.4) {
        handleTrigger();
      }
    };

    // Add a small delay before adding scroll listener to let page layout stabilize
    const scrollListenerTimer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      // Run initial check in case user is already scrolled down
      handleScroll();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollListenerTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleTrigger]);

  return null;
};

export default LeadGenerationTrigger;
