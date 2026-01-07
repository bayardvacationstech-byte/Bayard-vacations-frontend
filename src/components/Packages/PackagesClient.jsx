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
import TabbedContent from "./TabbedContent";
import PackageNavigation from "./PackageNavigation";
import { Phone, X, ChevronUp, Star, Share2 } from "lucide-react";
import WhyBayardVacations from "./WhyBayardVacations";
import { convertAndSortHotels } from "@/lib/utils";
import useModal from "@/hooks/useModal";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const PackagesClient = () => {
  const params = useParams();
  const slug = params.slug;
  const [mounted, setMounted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "stay", label: "Stay" },
    { id: "inclusions", label: "Inclusions" },
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
      const { hotelDetails, baseCategory } = convertAndSortHotels(packageData.hotelDetails);
      setHotelTiers(hotelDetails);
      const initialHotel = hotelDetails.find(h => h.type === baseCategory) || hotelDetails[0];
      setSelectedHotel(initialHotel);
    }
  }, [packageData]);

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

  // Show sticky bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyBar(scrollY > 600);

      // Scroll spy logic
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      {/* 2. Sticky Navigation - Centered & Full Width */}
      <div id="package-navigation">
        <PackageNavigation 
          activeSection={activeSection} 
          onScrollToSection={scrollToSection} 
        />
      </div>
      
      {/* Two Column Layout: Main Content (80%) + Sticky Sidebar (20%) */}
      <div className="relative flex gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Content - 80% */}
        <div className="w-[80%]">
          {/* 3. Package Details Content */}
          <TabbedContent packageData={packageData} />
          
          {/* 3. Experiences Gallery - Visual Activities */}
          <PackageExperiences 
            packageData={packageData} 
          />
          
          {/* 4. Hotel Details - Where You'll Stay */}
          <PackageHotels packageData={packageData} />

          {/* 5. FAQ Section - Answer Questions */}
          <PremiumFaq 
            content={packageData?.faq} 
            regionName={packageData?.region} 
          />

          {/* Related Packages */}
          {filteredRelatedPackages && (
            <ItineraryFooter relatedPackages={filteredRelatedPackages} />
          )}
        </div>

        <div className="hidden lg:block w-[25%]" id="booking-sidebar">
          <div className="sticky top-[100px] transition-all duration-500">
            {/* Redesigned Blue Booking Card */}
            <div className="bg-[#0046b8] rounded-2xl shadow-2xl overflow-hidden p-6 text-white border border-blue-400/20">
              <h3 className="text-xl font-bold mb-6">Hotel Type</h3>

              {/* Hotel Tiers Selection */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                {hotelTiers.map((tier) => {
                  const isActive = selectedHotel?.type === tier.type;
                  
                  const starRatingMap = {
                    twostar: 2,
                    threestar: 3,
                    fourstar: 4,
                    fivestar: 5,
                  };

                  const stars = starRatingMap[tier.type] || 5;
                  
                  return (
                    <div key={tier.type} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => setSelectedHotel(tier)}
                        className={`w-full flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-300 ${
                          isActive 
                            ? "bg-[#4fb800] border-[#4fb800] shadow-lg scale-105" 
                            : "bg-transparent border-white/30 hover:border-white/60"
                        }`}
                      >
                        <div className="flex gap-0.5 items-center justify-center">
                          {[...Array(stars)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={10} 
                              className="fill-white text-white" 
                            />
                          ))}
                        </div>
                      </button>
                      {tier.additionalCharge > 0 && !isActive && (
                        <span className="text-[10px] text-white/70 font-medium">
                          +{formatPrice(tier.additionalCharge)} INR
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Price Details */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black">₹ {formatPrice(finalPrice)}</span>
                </div>
                <p className="text-white/70 text-sm font-medium">Price Per Person</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={openModal}
                  className="w-full px-6 py-3.5 bg-transparent hover:bg-white/5 border-2 border-white text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wider"
                >
                  Request a Call back
                </button>
                
                <button
                  onClick={() => {
                    const hotelParam = selectedHotel?.type ? `?hotel=${selectedHotel.type}` : "";
                    window.location.href = `/checkout/${packageData.packageSlug}${hotelParam}`;
                  }}
                  className="w-full px-6 py-4 bg-[#4fb800] hover:bg-[#5cd600] text-white font-black rounded-xl shadow-lg transition-all text-base uppercase tracking-widest"
                >
                  Book Now
                </button>
              </div>
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
      </div>






      {/* Compact Sticky Bottom Bar - Mobile Only */}
      <div 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
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
            {BookNowFormComponent}
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Price Info */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-slate-500 text-xs font-medium">Starting from</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-brand-green text-sm font-bold">₹</span>
                    <span className="text-slate-900 font-bold text-2xl">
                      {formatPrice(packageData?.price || packageData?.startingPrice || 32500)}
                    </span>
                    <span className="text-slate-400 text-xs">/person</span>
                  </div>
                </div>
                
                {/* Hotel Category Badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-brand-green/5 to-brand-blue/5 border border-brand-green/20 rounded-full">
                  <span className="text-brand-green text-xs">⭐⭐⭐⭐</span>
                  <span className="text-slate-700 text-xs font-semibold">
                    {packageData?.hotelCategory || "Deluxe"} Hotels
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* View Details / Expand */}
                <button
                  onClick={() => setShowFullForm(!showFullForm)}
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl transition-all text-sm font-semibold"
                >
                  <ChevronUp className={`w-4 h-4 transition-transform ${showFullForm ? 'rotate-180' : ''}`} />
                  View Options
                </button>
                
                {/* Call Button */}
                <a 
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-semibold">Call Us</span>
                </a>
                
                {/* Book Now Button */}
                <button
                  onClick={() => {
                    setShowFullForm(true);
                  }}
                  className="px-6 py-2.5 gradient-btn text-white font-bold rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider"
                >
                  Book Now
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


