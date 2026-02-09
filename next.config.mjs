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

  productionBrowserSourceMaps: false,

  images: {
    // ✅ Netlify supports optimized images with dynamic hosting
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.bayardvacations.com" },
      { protocol: "http", hostname: "cdn.bayardvacations.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "swiperjs.com" },
      { protocol: "https", hostname: "technovans.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },

  // ✅ Redirects to normalize category URLs and point to the new /themes route
  async redirects() {
    return [
      {
        source: "/categories/solo_expedition",
        destination: "/themes/solo-expedition",
        permanent: true,
      },
      {
        source: "/categories/romantic_getaways",
        destination: "/themes/romantic-getaways",
        permanent: true,
      },
      {
        source: "/categories/family_funventure",
        destination: "/themes/family-funventure",
        permanent: true,
      },
      {
        source: "/categories/religious_retreat",
        destination: "/themes/religious-retreat",
        permanent: true,
      },
      {
        source: "/categories/exploration_bundle",
        destination: "/themes/exploration-bundle",
        permanent: true,
      },
      {
        source: "/categories/relax_rejuvenate",
        destination: "/themes/relax-rejuvenate",
        permanent: true,
      },
      {
        source: "/categories/elite_escape",
        destination: "/themes/elite-escape",
        permanent: true,
      },
      {
        source: "/categories/:slug",
        destination: "/themes/:slug",
        permanent: true,
      },
      {
        source: "/group-departure",
        destination: "/themes/group-departure",
        permanent: true,
      },
      {
        source: "/themes/group-adventures",
        destination: "/themes/group-departure",
        permanent: true,
      },
    ];
  },

  // ✅ Turbopack is enabled via CLI: `next dev --turbo`
  // Note: Turbopack is primarily for dev mode; production builds still use webpack
};

// ✅ Sentry enabled for production
const moduleExports =
  process.env.NODE_ENV === "development"
    ? nextConfig
    : withSentryConfig(nextConfig, {
        org: process.env.SENTRY_ORG || "swantech-f0",
        project: "bayardvacations",
        silent: !process.env.CI,
        widenClientFileUpload: true,
        disableLogger: true,
        automaticVercelMonitors: true,
      });

export default moduleExports;
