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

const trackPerformance = async (name, operation, fallbackValue) => {
  const start = Date.now();
  try {
    const result = await operation();
    return result;
  } catch (error) {
    console.error(`Performance tracking failed for ${name}:`, error);
    return fallbackValue;
  }
};


const HomePage = async () => {
  const TIMEOUT_MS = 15000; // 15 seconds timeout per operation
  
  const [
    regionData,
    internationalPackages,
    domesticPackages,
    themePackages,
    groupDeparturePackages,
    reviews,
    marketingBanner
  ] = await Promise.all([
    trackPerformance(
      "getRegionsForHome",
      () => withTimeout(getRegionsForHome(), TIMEOUT_MS, [], "getRegionsForHome"),
      []
    ),
    trackPerformance(
      "getCuratedPackagesForHome (international)",
      () => withTimeout(getCuratedPackagesForHome("international"), TIMEOUT_MS, [], "getCuratedPackagesForHome (international)"),
      []
    ),
    trackPerformance(
      "getCuratedPackagesForHome (domestic)",
      () => withTimeout(getCuratedPackagesForHome("domestic"), TIMEOUT_MS, [], "getCuratedPackagesForHome (domestic)"),
      []
    ),
    trackPerformance(
      "getThemePackagesForHome",
      () => withTimeout(getThemePackagesForHome(), TIMEOUT_MS, {}, "getThemePackagesForHome"),
      {}
    ),
    trackPerformance(
      "getGroupDeparturePackagesForHome",
      () => withTimeout(getGroupDeparturePackagesForHome(), TIMEOUT_MS, [], "getGroupDeparturePackagesForHome"),
      []
    ),
    trackPerformance(
      "fetchReviews",
      () => withTimeout(fetchReviews(), TIMEOUT_MS, [], "fetchReviews"),
      []
    ),
    trackPerformance(
      "getMarketingBanners",
      () => withTimeout(getMarketingBanners(), TIMEOUT_MS, null, "getMarketingBanners"),
      null
    ),
  ]);

  const regions = regionData || [];

  const {
    eliteEscapePackages,
    soloExpeditionPackages,
    familyFunventurePackages,
    groupAdventuresPackages,
    religiousRetreatPackages,
    relaxRejuvenatePackages,
    explorationBundlePackages,
    educationalPackages,
    romanticGetawaysPackages,
  } = themePackages || {};

  return (
    <>
      <section>
        <Hero />
      </section>

      <section className="bg-white section-padding blue-section scroll-optimize">
        <ExploreDestinations initialRegions={regions} />
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 section-padding blue-section scroll-optimize">
        <Holidays
          initialInternationalPackages={internationalPackages}
          initialDomesticPackages={domesticPackages}
        />
      </section>

      <section className="bg-white section-padding">
        <TravelStyle
          initialInternationalPackages={internationalPackages}
          initialDomesticPackages={domesticPackages}
        />
      </section>

      {/* Advertisement Banner - Desktop */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 hidden md:block">
        <AdvertisementBanner bannerData={marketingBanner} />
      </section>

      {/* Advertisement Banner - Mobile */}
      <section className="block md:hidden">
        <MobileAdBanner bannerData={marketingBanner} />
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white blue-section scroll-optimize">
        <ThemeHighlights
          initialEliteEscapePackages={eliteEscapePackages}
          initialSoloExpeditionPackages={soloExpeditionPackages}
          initialFamilyFunventurePackages={familyFunventurePackages}
          initialGroupAdventuresPackages={groupAdventuresPackages}
          initialReligiousRetreatPackages={religiousRetreatPackages}
          initialRelaxRejuvenatePackages={relaxRejuvenatePackages}
          initialExplorationBundlePackages={explorationBundlePackages}
          initialEducationalPackages={educationalPackages}
          initialRomanticGetawaysPackages={romanticGetawaysPackages}
        />
      </section>

      {/* Moved Destination Spotlight */}
      <section className="bg-white overflow-hidden relative py-4 md:py-6 pb-2 md:pb-3 px-4 sm:px-6 lg:px-8">
        <DestinationSpotlight initialRegions={regions} eliteEscapePackages={eliteEscapePackages} />
      </section>

      <section className="bg-white relative overflow-hidden section-padding">
        <GroupDeparture groupDeparturePackages={groupDeparturePackages} />
      </section>
      
      <section className="bg-gradient-to-br from-[#0146b3] to-[#020617] section-padding text-white relative overflow-hidden">
        <WhyBayard />
      </section>
      
      <section>
        <InspirationSection />
      </section>

      <section className="relative overflow-hidden">
        <RegionTestimonials 
          regionName="Our Travelers" 
          initialReviews={reviews}
        />
      </section>
    </>
  );
};

export default HomePage;
