import {
  fetchReviews,
  getAllPackagesByTheme,
  getGroupDeparturePackages,
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
import { getRegions, getCuratedPackages } from "@/utils/firebase";
import {
  EXCLUDED_INTERNATIONAL_REGIONS,
  EXCLUDED_DOMESTIC_REGIONS,
} from "@/config";

const HomePage = async () => {
  const reviews = await fetchReviews();
  const groupDeparturePackages = await getGroupDeparturePackages();

  const regions = await getRegions();

  const internationalPackages = (
    await getCuratedPackages("international", [], true)
  ).filter((item) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(item.region));

  const domesticPackages = (
    await getCuratedPackages("domestic", [], true)
  ).filter((item) => !EXCLUDED_DOMESTIC_REGIONS.includes(item.region));

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
  } = await getAllPackagesByTheme();

  return (
    <>
      <section>
        <Hero />
      </section>
      {/* <BrandIntro /> */}

      {/* <section className="bg-gradient-to-b from-[#0146b3] to-[#003488] sm:py-2 text-white relative overflow-hidden">
        <ThemePackages />
      </section> */}

      <section className="bg-white py-12 md:py-16 blue-section">
        <ExploreDestinations initialRegions={regions} />
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 section-padding blue-section">
        <Holidays
          initialInternationalPackages={internationalPackages}
          initialDomesticPackages={domesticPackages}
        />
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white section-padding blue-section">
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

      {/* Moved Destination Spotlight - Now Light and Airy */}
      <section className="bg-gradient-to-b from-[#003488] to-[#0146b3] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5"></div>
        <DestinationSpotlight />
      </section>

      <section className="bg-white relative overflow-hidden">
        <GroupDeparture groupDeparturePackages={groupDeparturePackages} />
      </section>
      <section className="bg-gradient-to-br from-[#0146b3] to-[#020617] section-padding text-white relative overflow-hidden">
        <WhyBayard />
      </section>

      <section className="blue-section">
        <StartJourney />
      </section>

      <section className="relative overflow-hidden">
        <Testimonials reviews={reviews} />
      </section>

      <section className="blue-section">
        <Newsletter />
      </section>
    </>
  );
};

export default HomePage;
