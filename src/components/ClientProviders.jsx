"use client";

import { CheckoutProvider } from "@/contexts/CheckoutContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
      gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache for 24 hours
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch when component mounts if data exists
      retry: 1, // Only retry once on failure
      retryOnMount: false, // Don't retry failed queries on mount
    },
  },
});
// Increment CACHE_VERSION when you need to force all users to refresh their cache
// (e.g., when making breaking changes to data structure or hiding/showing regions)
const CACHE_VERSION = "v2";

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  key: `BAYARD_CACHE_${CACHE_VERSION}`,
});

// Clean up old cache versions from localStorage
if (typeof window !== "undefined") {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("BAYARD_CACHE_") && key !== `BAYARD_CACHE_${CACHE_VERSION}`) {
      localStorage.removeItem(key);
    }
  });
}

export default function ClientProviders({ children }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        // 2 hours
        maxAge: 1000 * 60 * 60 * 2,
      }}
    >
      <AuthProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
