import { Suspense } from "react";
import {
  fetchReviews,
  getRegionsForHome,
  getCuratedPackagesForHome,
  getGroupDeparturePackagesForHome,
  getThemePackagesForHome,
  getMarketingBanners,
} from "@/lib/server";
import Hero from "@/components/Landing/Hero";
import Holidays from "@/components/Landing/Holidays";
import ExploreDestinations from "@/components/Landing/Destinations/ExploreDestinations";
import TravelStyle from "@/components/Landing/TravelStyle";
import ThemeHighlights from "@/components/Landing/ThemeHighlights";
import DestinationSpotlight from "@/components/Landing/Destinations/DestinationSpotlight";
import GroupDeparture from "@/components/Landing/GroupDeparture";
import WhyBayard from "@/components/Landing/WhyBayard";
import InspirationSection from "@/components/Landing/InspirationSection";
import RegionTestimonials from "@/components/Packages/RegionTestimonials";
import MobileAdBanner from "@/components/Landing/MobileAdBanner";
import AdvertisementBanner from "@/components/Landing/AdvertisementBanner";

// Timeout wrapper to prevent indefinite hanging
const withTimeout = (promise, timeoutMs, fallbackValue, operationName) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${operationName} timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]).catch((error) => {
    console.error(`${operationName} failed or timed out:`, error);
    return fallbackValue;
  });
};

const TIMEOUT_MS = 10000; // 10 seconds timeout

// --- DATA WRAPPERS (SERVER COMPONENTS) ---

async function ExploreDestinationsSection() {
  const regions = await withTimeout(getRegionsForHome(), TIMEOUT_MS, [], "getRegionsForHome");
  return <ExploreDestinations initialRegions={regions} />;
}

async function HolidaysSection() {
  const [international, domestic] = await Promise.all([
    withTimeout(getCuratedPackagesForHome("international"), TIMEOUT_MS, [], "getCuratedPackagesForHome (intl)"),
    withTimeout(getCuratedPackagesForHome("domestic"), TIMEOUT_MS, [], "getCuratedPackagesForHome (dom)"),
  ]);
  return (
    <>
      <section className="bg-gradient-to-b from-white to-slate-50 section-padding blue-section scroll-optimize">
        <Holidays initialInternationalPackages={international} initialDomesticPackages={domestic} />
      </section>
      <section className="bg-white section-padding">
        <TravelStyle initialInternationalPackages={international} initialDomesticPackages={domestic} />
      </section>
    </>
  );
}

async function AdBannerSection() {
  const banner = await withTimeout(getMarketingBanners(), TIMEOUT_MS, null, "getMarketingBanners");
  return (
    <>
      <section className="section-padding px-4 sm:px-6 lg:px-8 hidden md:block">
        <AdvertisementBanner bannerData={banner} />
      </section>
      <section className="block md:hidden">
        <MobileAdBanner bannerData={banner} />
      </section>
    </>
  );
}

async function ThemeHighlightsSection() {
  const themePackages = await withTimeout(getThemePackagesForHome(), TIMEOUT_MS, {}, "getThemePackagesForHome");
  const regions = await withTimeout(getRegionsForHome(), TIMEOUT_MS, [], "getRegionsForHome");
  
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white blue-section scroll-optimize">
        <ThemeHighlights
          initialEliteEscapePackages={themePackages.eliteEscapePackages}
          initialSoloExpeditionPackages={themePackages.soloExpeditionPackages}
          initialFamilyFunventurePackages={themePackages.familyFunventurePackages}
          initialGroupAdventuresPackages={themePackages.groupAdventuresPackages}
          initialReligiousRetreatPackages={themePackages.religiousRetreatPackages}
          initialRelaxRejuvenatePackages={themePackages.relaxRejuvenatePackages}
          initialExplorationBundlePackages={themePackages.explorationBundlePackages}
          initialEducationalPackages={themePackages.educationalPackages}
          initialRomanticGetawaysPackages={themePackages.romanticGetawaysPackages}
        />
      </section>
      <section className="bg-white overflow-hidden relative py-4 md:py-6 pb-2 md:pb-3 px-4 sm:px-6 lg:px-8">
        <DestinationSpotlight initialRegions={regions} eliteEscapePackages={themePackages.eliteEscapePackages} />
      </section>
    </>
  );
}

async function GroupDepartureSection() {
  const packages = await withTimeout(getGroupDeparturePackagesForHome(), TIMEOUT_MS, [], "getGroupDeparturePackagesForHome");
  return (
    <section className="bg-white relative overflow-hidden section-padding">
      <GroupDeparture groupDeparturePackages={packages} />
    </section>
  );
}

async function TestimonialsSection() {
  const reviews = await withTimeout(fetchReviews(), TIMEOUT_MS, [], "fetchReviews");
  return (
    <section className="relative overflow-hidden">
      <RegionTestimonials regionName="Our Travelers" initialReviews={reviews} />
    </section>
  );
}

// --- MAIN PAGE ---

const HomePage = () => {
  return (
    <>
      <section>
        <Hero />
      </section>

      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <section className="bg-white section-padding blue-section scroll-optimize">
          <ExploreDestinationsSection />
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-slate-100 animate-pulse" />}>
        <HolidaysSection />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse m-8 rounded-3xl" />}>
        <AdBannerSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-slate-50 animate-pulse" />}>
        <ThemeHighlightsSection />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <GroupDepartureSection />
      </Suspense>
      
      <section className="bg-gradient-to-br from-[#0146b3] to-[#020617] section-padding text-white relative overflow-hidden">
        <WhyBayard />
      </section>
      
      <section>
        <InspirationSection />
      </section>

      <Suspense fallback={<div className="h-80 bg-slate-50 animate-pulse" />}>
        <TestimonialsSection />
      </Suspense>
    </>
  );
};

export default HomePage;
