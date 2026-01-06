// i// ❌ Sentry disabled
// import { withSentryConfig } from "@sentry/nextjs";
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Enable compiler optimizations
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },

//   // Enable experimental features for better performance
//   experimental: {
//     optimizePackageImports: ["lucide-react", "framer-motion"],
//   },

//   images: {
//     // Enable optimization for better performance
//     unoptimized: false,
//     formats: ["image/webp", "image/avif"],
//     // Add image optimization settings
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.bayardvacations.com",
//       },
//       {
//         protocol: "https",
//         hostname: "firebasestorage.googleapis.com",
//       },
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "swiperjs.com",
//       },
//       {
//         protocol: "https",
//         hostname: "technovans.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//     ],
//   },

//   // Enable Webpack optimizations
//   webpack: (config, { dev, isServer }) => {
//     // Optimize bundle size in production
//     if (!dev && !isServer) {
//       config.optimization.splitChunks.cacheGroups.commons = {
//         name: "commons",
//         chunks: "all",
//         minChunks: 2,
//       };
//     }
//     return config;
//   },
// };

// // In development, return config without Sentry to avoid source map warnings
// let moduleExports;

// if (process.env.NODE_ENV === "development") {
//   moduleExports = nextConfig;
// } else {
//   moduleExports = withSentryConfig(nextConfig, {
//     // For all available options, see:
//     // https://www.npmjs.com/package/@sentry/webpack-plugin#options

//     org: "swantech-5e",

//     project: "bayardvacations",

//     // Only print logs for uploading source maps in CI
//     silent: !process.env.CI,

//     // For all available options, see:
//     // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//     // Upload a larger set of source maps for prettier stack traces (increases build time)
//     widenClientFileUpload: true,

//     // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//     // This can increase your server load as well as your hosting bill.
//     // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//     // side errors will fail.
//     // tunnelRoute: "/monitoring",

//     // Automatically tree-shake Sentry logger statements to reduce bundle size
//     disableLogger: true,

//     // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//     // See the following for more information:
//     // https://docs.sentry.io/product/crons/
//     // https://vercel.com/docs/cron-jobs
//     automaticVercelMonitors: true,
//   });
// }

// export default moduleExports;

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
  // The previous webpack config (code splitting) was for production optimization
};

// ❌ Sentry disabled - commented out
// const isExport = process.env.NEXT_EXPORT === "true";

// const moduleExports = isExport
//   ? nextConfig
//   : withSentryConfig(nextConfig, {
//       org: "swantech-5e",
//       project: "bayardvacations",
//       silent: !process.env.CI,
//       widenClientFileUpload: true,
//       disableLogger: true,
//       automaticVercelMonitors: true,
//     });

export default nextConfig;
