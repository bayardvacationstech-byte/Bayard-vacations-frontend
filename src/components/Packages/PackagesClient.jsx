"use client";
import React, { useState, useEffect } from "react";
import BookNowForm from "@/components/Forms/BookNowForm/BookNowForm";
import { useParams } from "next/navigation";
import RelatedPackages from "@/components/Itinerary/RelatedPackages";
import PackageHero from "./PackageHero";
import PackageExperiences from "./PackageExperiences";
import PackageHotels from "./PackageHotels";
import { usePackages, usePackage } from "@/hooks/packages";
import WebsiteLoader from "@/components/ui/WebsiteLoader";
import PremiumFaq from "./PremiumFaq";
import PremiumBookNowForm from "@/components/Forms/BookNowForm/PremiumBookNowForm";
import OverviewSection from "./Sections/OverviewSection";
import ItinerarySection from "./Sections/ItinerarySection";
import InclusionsSection from "./Sections/InclusionsSection";
import ImportantNotesSection from "./Sections/ImportantNotesSection";
import HighlightsSection from "./Sections/HighlightsSection";
import DesktopPackageNavigation from "./DesktopPackageNavigation";
import MobilePackageNavigation from "./MobilePackageNavigation";
import { Info, Calendar, Bed, CheckCircle, HelpCircle, FileText, ShieldAlert } from "lucide-react";
import WhyBayardVacations from "./WhyBayardVacations";
import RegionTestimonials from "./RegionTestimonials";
import { cn, convertAndSortHotels } from "@/lib/utils";
import useModal from "@/hooks/useModal";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import EnquiryFormFields from "@/components/Forms/EnquiryForm/EnquiryFormFields";
import { toast } from "sonner";

import TermsSection from "./Sections/TermsSection";
import PolicySection from "./Sections/PolicySection";
import BookingSidebar from "./BookingSidebar";
import StickyBottomBar from "./StickyBottomBar";
import BlogsCarousel from "./Sections/BlogsCarousel";
import { useBlogs } from "@/hooks";

const PackagesClient = () => {
  const params = useParams();
  const slug = params.slug;
  const [mounted, setMounted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isNavAtTop, setIsNavAtTop] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const activeSectionRef = React.useRef("overview");

  // Sync ref with state
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const sections = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "itinerary", label: "Itinerary", icon: Calendar },
    { id: "hotels-section", label: "Stay", icon: Bed },
    { id: "inclusions", label: "Inclusions", icon: CheckCircle },
    { id: "terms-section", label: "T&C", icon: FileText },
    { id: "policy-section", label: "Cancellation Policy", icon: ShieldAlert },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];


  const { openModal } = useModal();
  const pathname = usePathname();

  // Use the new hook to fetch package data
  const {
    packageData,
    isLoading,
    error: packageError,
  } = usePackage(slug);

  useEffect(() => {
    if (packageData && packageData.packageSlug === "hong-kong-5n6d") {
      console.log("Package Data loaded:", packageData);
    }
  }, [packageData]);

  // Hotel Selection State
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelTiers, setHotelTiers] = useState([]);

  useEffect(() => {
    if (packageData?.hotelDetails) {
      if (typeof packageData.hotelDetails === 'string') {
        // Handle legacy/string hotel details
        const standardTier = { type: 'standard', additionalCharge: 0, rating: 'Standard' };
        setHotelTiers([standardTier]);
        setSelectedHotel(standardTier);
      } else if (Array.isArray(packageData.hotelDetails)) {
         // If hotelDetails is an array, we treat it as a single "Standard" tier
         const standardTier = { type: 'standard', additionalCharge: 0, rating: 'Standard' };
         setHotelTiers([standardTier]);
         setSelectedHotel(standardTier);
      } else {
        // Handle proper object structure { twostar: ..., threestar: ... }
        const { hotelDetails, baseCategory } = convertAndSortHotels(packageData.hotelDetails);
        setHotelTiers(hotelDetails);
        const initialHotel = hotelDetails.find(h => h.type === baseCategory) || hotelDetails[0];
        setSelectedHotel(initialHotel);
      }
    }
  }, [packageData?.id, packageData?.hotelDetails]);

  // Fetch related packages from the same region
  const { packages: relatedPackages = [] } = usePackages(packageData?.region);

  // Filter out current package from related packages
  const filteredRelatedPackages = relatedPackages.filter(
    (item) => item.packageSlug !== packageData?.packageSlug
  );

  // Fetch blogs related to this package's region
  const { blogs: regionBlogs, fetchBlogs } = useBlogs();

  useEffect(() => {
    // Fetch blogs - if region is null, useBlogs hook handles the fallback to recent blogs
    fetchBlogs({ region: packageData?.region || null, limitCount: 6 });
  }, [packageData?.region, fetchBlogs]);



  useEffect(() => {
    setMounted(true);
    
    // Hide main header on mobile mount
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.dispatchEvent(new CustomEvent('hideMainHeader', { detail: true }));
    }

    // Clean up any hash from the URL when component mounts
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    // Reset header on unmount if needed, though usually navigation handles it
    return () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hideMainHeader', { detail: false }));
      }
    };
  }, []);

  // Optimize scroll handling with requestAnimationFrame and caching
  useEffect(() => {
    let ticking = false;
    const sectionElements = {};

    // Cache section elements once
    sections.forEach(section => {
      sectionElements[section.id] = document.getElementById(section.id);
    });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // 1. Handle Sticky Bar Visibility (Throttled)
          if (Math.abs(scrollY - (window.lastScrollY || 0)) > 10) { // Only update if significant scroll
             const shouldBeAtTop = scrollY > 500; // Trigger point for moving to top
             const isMobile = window.innerWidth < 1024;

             setIsNavAtTop(shouldBeAtTop);
             setShowStickyBar(scrollY > 400); // Show pricing bar when scrolled past 400px
             
             // Dispatch event to hide/show main header
             // On mobile we keep it hidden ("dont show header")
             window.dispatchEvent(new CustomEvent('hideMainHeader', { detail: isMobile || shouldBeAtTop }));
             
             window.lastScrollY = scrollY;
          }

          // 2. Scroll Spy Logic
          const scrollPosition = scrollY + 200; // Aligned with scroll-mt-48 (192px)
          
          let foundSection = activeSectionRef.current;
          
          // Iterate through sections to find the current one
          for (const section of sections) {
             const element = sectionElements[section.id] || document.getElementById(section.id);
             if (element) {
               // Use getBoundingClientRect for absolute trigger point
               const rect = element.getBoundingClientRect();
               const top = rect.top + scrollY;
               const height = rect.height;
               
               if (scrollPosition >= top && scrollPosition < top + height) {
                 foundSection = section.id;
                 break;
               }
             }
          }
          
          // Only update state if it changed
          if (foundSection !== activeSectionRef.current) {
            setActiveSection(foundSection);
          }

          ticking = false;
        });

        ticking = true;
      }
    };
    
    // Update cache on resize
    const handleResize = () => {
       sections.forEach(section => {
          sectionElements[section.id] = document.getElementById(section.id);
       });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Show loader only after component has mounted to prevent hydration mismatch
  if (!mounted || isLoading || !packageData) {
    return <WebsiteLoader />;
  }

  if (packageError && slug !== "azerbaijan-5n-6d-1") {
    return <div>Error loading package: {packageError.message}</div>;
  }

  const BookNowFormComponent =
    typeof packageData?.hotelDetails === "string" ? (
      <BookNowForm packageData={packageData} offerData={packageData.offer} />
    ) : (
      <PremiumBookNowForm packageData={packageData} offerData={packageData.offer} />
    );

  const EnquiryFormComponent = (
    <div className="bg-white rounded-3xl">
      <h3 className="text-xl font-bold text-slate-900 mb-4 px-0">Quick Enquiry</h3>
      <EnquiryFormFields 
        variant="inline" 
        formType="potential"
        hideFields={["destination"]}
        initialData={{ destination: packageData?.region }}
        onSuccess={() => setShowFullForm(false)}
        buttonText="Send Enquiry"
        whiteLabels={false}
        brandYellow={true}
      />
    </div>
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const finalPrice = packageData && selectedHotel
    ? (packageData.offer?.offerPrice || packageData.basePrice || packageData.price || 0) + (selectedHotel.additionalCharge || 0)
    : 0;

  const copyCurrentUrl = async () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link Copied to Clipboard");
    } catch (err) {
    }
  };

  return (
    <>
      {/* 1. Hero Section - First Impression */}
      <PackageHero 
        packageData={packageData} 
      />
      <Container className="relative flex flex-col c-lg:flex-row gap-[30px] c-lg:gap-8 pt-8 md:pt-4">
        {/* Main Content Column (75%) */}
        <div className="w-full c-lg:w-[75%] space-y-[30px] md:space-y-8">
          {/* 2. Highlights Section */}
          <HighlightsSection packageData={packageData} />

          {/* Mobile Package Navigation - Sticky in between sections */}
          <MobilePackageNavigation 
            activeSection={activeSection} 
            onScrollToSection={scrollToSection} 
            sections={sections}
            isBottomBarVisible={showStickyBar}
            isHeaderHidden={isNavAtTop}
          />

          {/* Main Content Sections */}
          <div className="space-y-[30px] md:space-y-8">
            {/* Desktop Sticky Navigation - Between Journey Overview and Package Highlights */}
            <DesktopPackageNavigation 
                activeSection={activeSection} 
                onScrollToSection={scrollToSection} 
                sections={sections}
            />

            {/* Overview Section */}
            <div id="overview" className="scroll-mt-48 space-y-[30px] md:space-y-8">
              <div className="relative pb-4 w-full overflow-x-hidden">
                <OverviewSection packageData={packageData} />
              </div>
            </div>
            
            <div id="itinerary" className="scroll-mt-48">
              <ItinerarySection packageData={packageData} />
            </div>

            <div id="hotels-section" className="scroll-mt-48">
              <PackageHotels packageData={packageData} />
            </div>

            <div id="inclusions" className="scroll-mt-48">
              <InclusionsSection packageData={packageData} />
            </div>

            <ImportantNotesSection packageData={packageData} />

            <TermsSection />

            <PolicySection />

          </div>
        </div>


        {/* Sidebar Column (25%) - Now starts from the top */}
        <BookingSidebar 
          packageData={packageData}
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
          hotelTiers={hotelTiers}
          finalPrice={finalPrice}
          formatPrice={formatPrice}
          copyCurrentUrl={copyCurrentUrl}
        />
      </Container>

      {/* FAQ Section - Full Width */}
      <div id="faq" className="scroll-mt-48">
        <PremiumFaq 
          faqs={packageData?.faqs} 
          content={packageData?.faq} 
          regionName={packageData?.region || packageData?.packageName} 
        />
      </div>
    
      {relatedPackages && relatedPackages.length > 0 && (
        <RelatedPackages relatedPackages={filteredRelatedPackages} />
      )}

  

      {/* Reviews/Testimonials Section - Social Proof */}
      <section className="relative overflow-hidden">
        <RegionTestimonials regionName={packageData?.packageName || packageData?.region} />
      </section>

          {regionBlogs && regionBlogs.length > 0 && (
        <BlogsCarousel 
          blogs={regionBlogs} 
          regionName={packageData?.region} 
        />
      )}

    {/* Why Bayard Vacations - Company Trust */}
      <WhyBayardVacations />


      <StickyBottomBar 
        packageData={packageData}
        showStickyBar={showStickyBar}
        showFullForm={showFullForm}
        setShowFullForm={setShowFullForm}
        isNavAtTop={isNavAtTop}
        formatPrice={formatPrice}
        EnquiryFormComponent={EnquiryFormComponent}
      />

    </>
  );
};

export default PackagesClient;


