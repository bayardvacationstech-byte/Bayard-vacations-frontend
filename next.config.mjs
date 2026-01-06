import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Dynamic hosting on Netlify with SSR enabled
  // Removed: output: "export" for dynamic rendering

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    // ✅ Netlify supports optimized images with dynamic hosting
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.bayardvacations.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "swiperjs.com" },
      { protocol: "https", hostname: "technovans.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },

  // ✅ Turbopack is enabled via CLI: `next dev --turbo`
  // Note: Turbopack is primarily for dev mode; production builds still use webpack
};

// ✅ Sentry enabled for production
const moduleExports =
  process.env.NODE_ENV === "development"
    ? nextConfig
    : withSentryConfig(nextConfig, {
        org: "swantech-5e",
        project: "bayardvacations",
        silent: !process.env.CI,
        widenClientFileUpload: true,
        disableLogger: true,
        automaticVercelMonitors: true,
      });

export default moduleExports;
