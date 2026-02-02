import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./globals.css";
import { Outfit, Damion, Playfair_Display, Great_Vibes, Montserrat, Space_Grotesk, Crimson_Text, Syne, Cormorant_Garamond, Lato } from "next/font/google";
import localFont from "next/font/local";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import ScrollReset from "@/components/ScrollReset";

import Metrics from "@/components/Metrics";
import ClientProviders from "@/components/ClientProviders";
import { DEFAULT_URL } from "@/config";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import LayoutWrapper from "@/components/LayoutWrapper";
import { fetchRegions } from "@/lib/server";

const nord = localFont({
  src: [
    {
      path: "fonts/nord-thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "fonts/nord-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "fonts/nord-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/nord-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "fonts/nord-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/nord-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nord", // CSS variable to use with Tailwind
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const damion = Damion({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-damion",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
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

export default async function RootLayout({ children }) {
  // Fetch footer data on the server
  const { domesticRegions, internationalRegions } = await fetchRegions();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="128x128" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <Metrics />
      <body
        className={`${outfit.variable} ${nord.variable} ${damion.variable} ${playfair.variable} ${greatVibes.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${crimsonText.variable} ${syne.variable} ${cormorant.variable} ${lato.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ClientProviders>
          <ScrollReset />
          
          <LayoutWrapper footerData={{ domesticRegions, internationalRegions }}>
            {children}
          </LayoutWrapper>
          
          <SonnerToaster />
          <RadixToaster />
        </ClientProviders>
        <TailwindIndicator />
      </body>
    </html>
  );
}

