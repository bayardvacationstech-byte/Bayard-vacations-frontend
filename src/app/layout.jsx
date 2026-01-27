import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./globals.css";
import { Outfit, Damion, Playfair_Display } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import DesktopNavbar from "@/components/Navbars/DesktopNavbar";
import MobileNavbar from "@/components/Navbars/MobileNavbar";
import localFont from "next/font/local";
import LeadForm from "@/components/Forms/EnquiryForm/LeadForm";
import { Toaster } from "@/components/ui/sonner";
import FloatingLeadButton from "@/components/FloatingLeadButton";
import ScrollReset from "@/components/ScrollReset";

import Metrics from "@/components/Metrics";
import ClientProviders from "@/components/ClientProviders";
import { DEFAULT_URL } from "@/config";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ChatbotIcon from "@/components/ChatbotIcon";

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
        className={`${outfit.variable} ${nord.variable} ${damion.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ClientProviders>
          <ScrollReset />
          <DesktopNavbar />
          <MobileNavbar />
          {children}
          <LeadForm />
          <WhatsAppIcon />
          <ChatbotIcon />
          <Toaster />
        </ClientProviders>
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  );
}

