import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./globals.css";
import { Outfit, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import ScrollReset from "@/components/ScrollReset";
import { Suspense } from "react";

import Metrics from "@/components/Metrics";
import ClientProviders from "@/components/ClientProviders";
import { DEFAULT_URL } from "@/config";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import LayoutWrapper from "@/components/LayoutWrapper";
import FooterWrapper from "@/components/layouts/FooterWrapper";
import TaboolaPixel from "@/components/TaboolaPixel";

const nord = localFont({
  src: [
    { path: "fonts/nord-thin.woff2", weight: "100", style: "normal" },
    { path: "fonts/nord-light.woff2", weight: "300", style: "normal" },
    { path: "fonts/nord-regular.woff2", weight: "400", style: "normal" },
    { path: "fonts/nord-medium.woff2", weight: "500", style: "normal" },
    { path: "fonts/nord-bold.woff2", weight: "700", style: "normal" },
    { path: "fonts/nord-black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-nord",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Bayard Vacations | Customized Travel Packages for Every Explorer",
    template: "%s | Bayard Vacations",
  },
  description:
    "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions, we craft journeys that cater to your unique interests.",
  keywords:
    "Customized travel packages, romantic getaways, group adventures, family vacations, solo expeditions, cultural tours, adventure travel, travel agency, vacation packages",
  authors: [{ name: "Bayard Vacations" }],
  creator: "Bayard Vacations",
  publisher: "Bayard Vacations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(DEFAULT_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: DEFAULT_URL,
    title: "Bayard Vacations | Customized Travel Packages for Every Explorer",
    description:
      "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions.",
    siteName: "Bayard Vacations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayard Vacations | Customized Travel Packages for Every Explorer",
    description:
      "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="128x128" />
        <link rel="preconnect" href="https://o4509820841295872.ingest.de.sentry.io" />
      </head>
      <Metrics />
      <body
        className={`${outfit.variable} ${nord.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Instant CSS-only Splash Screen (Optimized for First Contentful Paint) */}
        <div id="bayard-splash-screen" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          transition: 'opacity 0.5s ease-out, visibility 0.5s',
          fontFamily: 'sans-serif'
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes splash-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes splash-float { 
              0%, 100% { transform: translateY(0); } 
              50% { transform: translateY(-10px); } 
            }
            @keyframes splash-pulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.8; }
            }
            .splash-globe {
              width: 160px; height: 160px;
              border-radius: 50%;
              background: linear-gradient(135deg, #0146b3, #003488);
              box-shadow: inset -10px -10px 30px rgba(0,0,0,0.4), 0 10px 40px rgba(1,70,179,0.3);
              position: relative;
              overflow: hidden;
              animation: splash-float 6s ease-in-out infinite;
            }
            .splash-orbit {
              position: absolute;
              width: 200px; height: 200px;
              border: 1px dashed rgba(191,145,6,0.4);
              border-radius: 50%;
              animation: splash-spin 20s linear infinite;
            }
            .splash-plane-path {
              position: absolute;
              width: 240px; height: 240px;
              animation: splash-spin 8s linear infinite;
            }
            .splash-plane {
              position: absolute;
              top: 0; left: 50%;
              transform: translate(-50%, -50%);
              width: 40px; height: 40px;
              background: #BF9106;
              clip-path: polygon(50% 0%, 100% 100%, 50% 85%, 0% 100%);
              border-radius: 2px;
            }
            .splash-text {
              margin-top: 2rem;
              color: #0146b3;
              font-weight: 900;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              font-size: 1.2rem;
            }
            .splash-sub {
              color: #BF9106;
              font-size: 0.7rem;
              margin-top: 0.5rem;
              font-weight: 500;
              letter-spacing: 0.3em;
              text-transform: uppercase;
              opacity: 1;
              animation: splash-pulse 2s ease-in-out infinite;
            }
          `}} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="splash-orbit"></div>
            <div className="splash-plane-path">
              <div className="splash-plane"></div>
            </div>
            <div className="splash-globe"></div>
          </div>
          <div className="splash-text">Bayard Vacations</div>
          <div className="splash-sub">Initialising Journeys...</div>

          <script dangerouslySetInnerHTML={{ __html: `
            setTimeout(function() {
              var s = document.getElementById("bayard-splash-screen");
              if (s) {
                s.style.opacity = "0";
                s.style.visibility = "hidden";
              }
            }, 5000);
          `}} />
        </div>

        <ClientProviders>
          <ScrollReset />
          <LayoutWrapper 
            footer={
              <Suspense fallback={<div className="h-64 bg-slate-900 animate-pulse" />}>
                <FooterWrapper />
              </Suspense>
            }
          >
            {children}
          </LayoutWrapper>
          <SonnerToaster />
          <RadixToaster />
        </ClientProviders>
        <TaboolaPixel />
        <TailwindIndicator />
      </body>
    </html>
  );
}
