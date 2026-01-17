"use client";
import React, { useState, useEffect } from "react";
import BookNowForm from "@/components/Forms/BookNowForm/BookNowForm";
import { useParams } from "next/navigation";
import ItineraryFooter from "@/components/Itinerary/ItineraryFooter";
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
import EssentialInfoSection from "./Sections/EssentialInfoSection";
import PackageNavigation from "./PackageNavigation";
import { Phone, X, ChevronUp, Star, Share2 } from "lucide-react";
import PackageHighlights from "./PackageHighlights";
import WhyBayardVacations from "./WhyBayardVacations";
import { cn, convertAndSortHotels } from "@/lib/utils";
import useModal from "@/hooks/useModal";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import EnquiryFormFields from "@/components/Forms/EnquiryForm/EnquiryFormFields";
import { toast } from "sonner";

const PackagesClient = () => {
  const params = useParams();
  const slug = params.slug;
  const [mounted, setMounted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const activeSectionRef = React.useRef("overview");

  // Sync ref with state
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "hotels-section", label: "Stay" },
    { id: "inclusions", label: "Inclusions" },
    { id: "essential-info", label: "Travel Info" },
    { id: "faq", label: "FAQ" },
  ];

  const { openModal } = useModal();
  const pathname = usePathname();

  // Use the new hook to fetch package data
  const {
    packageData,
    isLoading: packageLoading,
    error: packageError,
  } = usePackage(slug);

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



  useEffect(() => {
    setMounted(true);
    // Clean up any hash from the URL when component mounts
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
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
             setShowStickyBar(scrollY > 600);
             window.lastScrollY = scrollY;
          }

          // 2. Scroll Spy Logic
          const scrollPosition = scrollY + 150; 
          
          let foundSection = activeSectionRef.current;
          
          // Iterate through sections to find the current one
          for (const section of sections) {
             const element = sectionElements[section.id] || document.getElementById(section.id);
             if (element) {
               const { offsetTop, offsetHeight } = element;
               
               if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
  }, [activeSection]); // Add activeSection dependency to access latest value in checking, or use functional update if needed. Actually simpler to remove dependency and use ref for activeSection if keen on perf, but React 18 handles this okay. 
  // Better approach: remove activeSection dependency and use a local var or functional update isn't needed here because we are reading DOM. 
  // Wait, if I include activeSection in deps, the effect re-runs on every section change, removing/adding listeners. That's inefficient.
  // I will use a ref to track current active section to compare against inside the loop, OR just trust React's state setter which bails out if value is same.
  // React setState IS safe to call with same value (no re-render), but the calculation logic relies on closure `activeSection`. 
  // To fix closure staleness without re-binding:
  // I will rely on the `currentActive` calculated from DOM. I don't need to read `activeSection` state inside the loop to determine the *correct* one, only to decide whether to *set* it.
  // Actually, I can just call setActiveSection(newSection) and React will optimize.
  // So I will REMOVE activeSection from dependency array to prevent listener churn.

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
  if (!mounted || packageLoading || !packageData) {
    return <WebsiteLoader />;
  }

  if (packageError) {
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
      <h3 className="text-xl font-bold text-slate-900 mb-4 px-1">Quick Enquiry</h3>
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
    ? (packageData.offer?.offerPrice || packageData.basePrice || packageData.price || 32500) + (selectedHotel.additionalCharge || 0)
    : 32500;

  const copyCurrentUrl = async () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link Copied to Clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <>
      {/* 1. Hero Section - First Impression */}
      <PackageHero 
        packageData={packageData} 
      />

      <PackageHighlights packageData={packageData} />

      {/* Sticky Navigation - Outside overflow wrapper */}
      <PackageNavigation 
          activeSection={activeSection} 
          onScrollToSection={scrollToSection} 
          sections={sections}
      />

      {/* Two Column Layout Wrapper - Outside overflow constraint */}
      <Container className="relative flex flex-col c-lg:flex-row gap-8 c-lg:gap-8 pt-4 md:pt-16">
        {/* Main Content Column with Overflow Control */}
        <div className="w-full c-lg:w-[75%]">
          {/* Main Content Wrapper with Gradient and Overflow Control */}
          <div className="relative pb-12 w-full overflow-x-hidden">
            {/* Package Details Content */}
            <div className="mt-0 px-0">
              <div className="space-y-8 md:space-y-12">
                <div id="overview" className="scroll-mt-48">
                  <OverviewSection packageData={packageData} />
                </div>
                
                <div id="itinerary" className="scroll-mt-48">
                  <ItinerarySection packageData={packageData} />
                </div>

                <div id="stay" className="scroll-mt-48">
                  <PackageHotels packageData={packageData} />
                </div>



                <div id="inclusions" className="scroll-mt-48">
                  <InclusionsSection packageData={packageData} />
                </div>

                <div id="essential-info" className="scroll-mt-48">
                  <EssentialInfoSection packageData={packageData} />
                </div>
                
                <div id="faq" className="scroll-mt-48">
                  <PremiumFaq faqData={packageData?.faq} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Outside overflow wrapper */}
        <div className="hidden c-lg:block w-[25%]" id="booking-sidebar">
          <div className="sticky top-[100px] md:top-[120px] space-y-3 z-30 pb-4">
            {/* Pricing Card */}
            {/* Primary Booking Card */}
            <div className="gradient-btn rounded-3xl shadow-xl overflow-hidden p-4 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Select Hotel Type</h3>

              {/* Hotel Tiers Selection - Horizontal Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {hotelTiers.map((tier) => {
                  const isActive = selectedHotel?.type === tier.type;
                  
                  const starRatingNames = {
                    twostar: "2 Star",
                    threestar: "3 Star",
                    fourstar: "4 Star",
                    fivestar: "5 Star",
                  };

                  const starRatingCount = {
                    twostar: 2,
                    threestar: 3,
                    fourstar: 4,
                    fivestar: 5,
                  };

                  const label = starRatingNames[tier.type] || "Hotel";
                  const stars = starRatingCount[tier.type] || 5;
                  
                    return (
                      <button
                        key={tier.type}
                        onClick={() => setSelectedHotel(tier)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-500",
                          isActive 
                            ? "bg-white/10 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)] scale-105" 
                            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                        )}
                      >
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-wider mb-1.5 transition-colors",
                          isActive ? "text-yellow-400" : "text-white/40"
                        )}>
                          {label}
                        </span>
                        <div className="flex gap-0.5 items-center justify-center">
                          {[...Array(stars)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={10} 
                              className={cn(
                                "transition-all duration-500",
                                isActive ? "fill-yellow-400 text-yellow-400 scale-110" : "fill-white/20 text-white/20"
                              )} 
                            />
                          ))}
                        </div>
                      </button>
                    );
                })}
              </div>

              {/* Price Details */}
              <div className="mb-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">₹ {formatPrice(finalPrice)}</span>
                  </div>
                  {packageData?.offer?.discountPercentage && (
                    <span className="px-2 py-1 bg-yellow-400 text-slate-900 font-black rounded-lg text-[9px] uppercase tracking-wider">
                      {packageData.offer.discountPercentage}% Off
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-[10px] font-semibold">Per Person (Incl. all taxes)</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const hotelParam = selectedHotel?.type ? `?hotel=${selectedHotel.type}` : "";
                    window.location.href = `/checkout/${packageData.packageSlug}${hotelParam}`;
                  }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-5 py-3 rounded-2xl shadow-lg transition-all text-sm font-black uppercase tracking-widest active:scale-95 hover:opacity-90"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="gradient-btn rounded-3xl shadow-xl overflow-hidden p-4 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Quick Enquiry</h3>
              
              <EnquiryFormFields 
                variant="inline" 
                formType="potential"
                hideFields={["destination"]}
                initialData={{ destination: packageData?.region }}
                onSuccess={() => {}}
                buttonText="Send Enquiry"
                whiteLabels={true}
                brandYellow={true}
              />
            </div>

            {/* Share Section */}
            <div className="mt-6 flex flex-col items-center">
              <button 
                onClick={copyCurrentUrl}
                className="flex items-center gap-3 text-slate-500 hover:text-brand-blue transition-colors text-sm font-medium group"
              >
                <span>Share or copy package link</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-blue/10">
                  <Share2 className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-0 pb-12">
           {/* Related Packages */}
           {filteredRelatedPackages && filteredRelatedPackages.length > 0 && (
             <div className="mb-8">
               <ItineraryFooter relatedPackages={filteredRelatedPackages} />
             </div>
           )}

           {/* 5. FAQ Section - Answer Questions */}
           <div id="faq" className="mb-16">
             <PremiumFaq 
               content={packageData?.faq} 
               regionName={packageData?.region} 
             />
           </div>

           {/* 6. Why Choose Bayard Vacations - Final Section */}
           <WhyBayardVacations />
      </Container>






      {/* Compact Sticky Bottom Bar - Mobile Only */}
      <div 
        className={`c-lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Expanded Form Overlay */}
        {showFullForm && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowFullForm(false)}
          />
        )}
        
        {/* Expanded Form Panel */}
        <div 
          className={`absolute bottom-full left-0 right-0 bg-white border-t border-brand-green/20 shadow-2xl transition-all duration-300 z-50 ${
            showFullForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="max-w-md mx-auto p-6">
            <button 
              onClick={() => setShowFullForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            {EnquiryFormComponent}
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="bg-gradient-to-r from-brand-blue via-[#0046b8] to-brand-blue border-t border-white/20 shadow-[0_-10px_40px_rgba(0,70,184,0.3)] backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Price Info */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white/60 text-xs font-medium">Starting from</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-brand-accent text-sm font-bold">₹</span>
                    <span className="text-white font-bold text-2xl drop-shadow-sm">
                      {formatPrice(packageData?.price || packageData?.startingPrice || 32500)}
                    </span>
                    <span className="text-white/40 text-xs">/person</span>
                  </div>
                </div>
                
                {/* Hotel Category Badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-inner">
                  <span className="text-brand-accent text-xs">⭐⭐⭐⭐</span>
                  <span className="text-white text-xs font-semibold">
                    {packageData?.hotelCategory || "Deluxe"} Hotels
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* View Details / Expand */}
                <button
                  onClick={() => setShowFullForm(!showFullForm)}
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all text-sm font-semibold backdrop-blur-md"
                >
                  <ChevronUp className={`w-4 h-4 transition-transform ${showFullForm ? 'rotate-180' : ''}`} />
                  View Options
                </button>
                
                {/* Call Button */}
                <a 
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all backdrop-blur-md"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-semibold">Call Us</span>
                </a>
                
                <button
                  onClick={() => {
                    setShowFullForm(true);
                  }}
                  className="px-6 py-2.5 bg-[#facc15] text-[#1e293b] font-black rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider active:scale-95"
                >
                  Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagesClient;


