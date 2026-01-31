"use client";
import { useState, useEffect } from 'react';

export function useMinimumLoading(isLoading, minDuration = 1500) {
  const [shouldShowLoading, setShouldShowLoading] = useState(isLoading);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      setShouldShowLoading(true);
    } else {
      // If loading finishes, keep it true for at least minDuration
      // But we need to know when it *started* loading to do this properly
      // A simpler approach for this specific UX: 
      // Just ensure that if it was loading, it stays loading for a bit.
      
      timeoutId = setTimeout(() => {
        setShouldShowLoading(false);
      }, minDuration);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading, minDuration]);

  return shouldShowLoading;
}
