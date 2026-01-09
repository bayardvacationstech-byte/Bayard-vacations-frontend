import {
  fetchReviews,
  getRegionsForHome,
  getCuratedPackagesForHome,
  getGroupDeparturePackagesForHome,
  getThemePackagesForHome,
} from "@/lib/server";
import Hero from "@/components/Landing/Hero";
import BrandIntro from "@/components/Landing/BrandIntro";
import Holidays from "@/components/Landing/Holidays";
import ThemeHighlights from "@/components/Landing/ThemeHighlights";
import WhyBayard from "@/components/Landing/WhyBayard";
import Testimonials from "@/components/Landing/Testimonials";
import ExploreDestinations from "@/components/Landing/Destinations/ExploreDestinations";
import ThemePackages from "@/components/Landing/Destinations/ThemePackages";
import GroupDeparture from "@/components/Landing/GroupDeparture";
import DestinationSpotlight from "@/components/Landing/Destinations/DestinationSpotlight";
import StartJourney from "@/components/Landing/StartJourney";
import Newsletter from "@/components/Landing/Newsletter";
import TravelStyle from "@/components/Landing/TravelStyle";
import AdvertisementBanner from "@/components/Landing/AdvertisementBanner";


const HomePage = async () => {
  const [
    reviews,
    groupDeparturePackages,
    regionData,
    internationalPackages,
    domesticPackages,
    themePackages
  ] = await Promise.all([
    fetchReviews(),
    getGroupDeparturePackagesForHome(),
    getRegionsForHome(),
    getCuratedPackagesForHome("international"),
    getCuratedPackagesForHome("domestic"),
    getThemePackagesForHome(),
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
      {/* <BrandIntro /> */}

      {/* <section className="bg-gradient-to-b from-[#0146b3] to-[#003488] sm:py-2 text-white relative overflow-hidden">
        <ThemePackages />
      </section> */}

      <section className="bg-white section-padding blue-section">
        <ExploreDestinations initialRegions={regions} />
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 section-padding blue-section">
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

      {/* Advertisement Banner */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <AdvertisementBanner />
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white blue-section">
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
        <DestinationSpotlight initialRegions={regions} />
      </section>

      <section className="bg-white relative overflow-hidden section-padding">
        <GroupDeparture groupDeparturePackages={groupDeparturePackages} />
      </section>
      <section className="bg-gradient-to-br from-[#0146b3] to-[#020617] section-padding text-white relative overflow-hidden">
        <WhyBayard />
      </section>
         <section>
        <Newsletter />
      </section>

      {/* <section>
        <StartJourney />
      </section> */}

      <section className="relative overflow-hidden">
        <Testimonials reviews={reviews} />
      </section>



   
    </>
  );
};

export default HomePage;
