import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useModal from "@/hooks/useModal";
import { Share2, Star, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { formatPrice } from "@/utils/offerUtils";
import { convertAndSortHotels } from "@/lib/utils";
import { motion } from "framer-motion";

const ratingMap = {
  threestar: 3,
  fourstar: 4,
  fivestar: 5,
};

const hotelTypeLabels = {
  threestar: "Premium",
  fourstar: "Deluxe",
  fivestar: "Luxury",
};

const PremiumBookNowForm = ({ packageData, offerData }) => {
  const { openModal } = useModal();
  const pathname = usePathname();

  const _hotels = convertAndSortHotels(packageData.hotelDetails);
  const hotels = _hotels.hotelDetails;
  const baseCategory = packageData.hotelDetails.baseCategory;
  const initialHotel = hotels.find((hotel) => hotel.type === baseCategory);

  const [selectedHotel, setSelectedHotel] = useState(initialHotel);

  useEffect(() => {
    localStorage.setItem(
      "selectedPackage",
      `/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`
    );
  }, [packageData.packageSlug, selectedHotel?.type]);

  const handleValueChange = (value) => {
    setSelectedHotel(hotels.filter((hotel) => hotel.type === value)[0]);
  };

  const copyCurrentUrl = async () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      toast("Success", {
        description: "Link Copied to Clipboard",
      });
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const finalPrice = offerData
    ? offerData.offerPrice + selectedHotel.additionalCharge
    : packageData.basePrice + selectedHotel.additionalCharge;

  return (
    <>
      {/* Premium Dark Form */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
        
        <div className="relative bg-gradient-to-br from-[#0a1f44] to-[#0d2b5c] p-6 sm:p-8">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            {/* Hotel Type Selection */}
            {finalPrice > 0 && (
              <div className="mb-6">
                <h3 className="text-white text-xl font-bold mb-4">Hotel Type</h3>
                
                <RadioGroup
                  onValueChange={handleValueChange}
                  defaultValue={baseCategory}
                  className="space-y-3"
                >
                  {hotels.map(
                    (hotel) =>
                      hotel.isAvailable && (
                        <div key={uuidv4()} className="relative">
                          <RadioGroupItem
                            className="hidden"
                            value={hotel.type}
                            id={hotel.type}
                          />
                          <Label
                            htmlFor={hotel.type}
                            className={`group relative cursor-pointer block transition-all duration-300 ${
                              selectedHotel?.type === hotel.type ? "scale-100" : "scale-95 opacity-70"
                            }`}
                          >
                            <div className={`relative rounded-xl border-2 p-4 transition-all duration-300 ${
                              selectedHotel?.type === hotel.type
                                ? "border-cyan-400 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 shadow-lg shadow-cyan-500/20"
                                : "border-white/20 bg-white/5 hover:border-white/40"
                            }`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {/* Star Rating */}
                                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                                    selectedHotel?.type === hotel.type
                                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                      : "bg-white/10 border border-white/20"
                                  }`}>
                                    {[...Array(ratingMap[hotel.type])].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={16}
                                        className={selectedHotel?.type === hotel.type ? "fill-white text-white" : "fill-yellow-400 text-yellow-400"}
                                      />
                                    ))}
                                  </div>
                                  
                                  <div>
                                    <div className={`font-bold ${
                                      selectedHotel?.type === hotel.type ? "text-white" : "text-gray-300"
                                    }`}>
                                      {hotelTypeLabels[hotel.type]}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {ratingMap[hotel.type]}-Star Hotels
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Additional Charge */}
                                {hotel.additionalCharge > 0 && (
                                  <div className="text-right">
                                    <div className="text-cyan-400 font-bold text-sm">
                                      +₹{formatPrice(hotel.additionalCharge)}
                                    </div>
                                    <div className="text-xs text-gray-400">per person</div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Selected Indicator */}
                              {selectedHotel?.type === hotel.type && (
                                <motion.div
                                  layoutId="selectedIndicator"
                                  className="absolute -right-2 -top-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </motion.div>
                              )}
                            </div>
                          </Label>
                        </div>
                      )
                  )}
                </RadioGroup>
              </div>
            )}

            {/* Price Display */}
            <div className="mb-6 mt-8">
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                {finalPrice === 0 ? (
                  <div className="text-center">
                    <h3 className="text-xl text-white font-bold">
                      Contact an Expert for Prices
                    </h3>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-white/60 text-2xl">₹</span>
                      <motion.span
                        key={finalPrice}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-white"
                      >
                        {formatPrice(finalPrice)}
                      </motion.span>
                    </div>
                    <p className="text-cyan-300 text-sm font-medium mb-3">
                      Price Per Person
                    </p>
                    
                    {/* Offer Badge */}
                    {offerData && (
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-lg text-white/60 line-through">
                          ₹{formatPrice(packageData.basePrice + selectedHotel.additionalCharge)}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          <span>🎉</span>
                          SAVE ₹{formatPrice(offerData.savingsAmount)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={openModal}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-white py-6 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                size="lg"
              >
                <Phone size={18} className="mr-2" />
                Request a Call back
              </Button>
              
              {finalPrice > 0 && (
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-7 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  size="lg"
                  asChild
                >
                  <Link
                    href={`/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`}
                  >
                    Book Now
                  </Link>
                </Button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-cyan-400 text-2xl mb-1">✓</div>
                  <div className="text-white text-xs font-medium">Instant</div>
                  <div className="text-white/60 text-xs">Confirmation</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-cyan-400 text-2xl mb-1">🔒</div>
                  <div className="text-white text-xs font-medium">Secure</div>
                  <div className="text-white/60 text-xs">Payment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Link */}
      <div className="relative z-20 text-center mt-4">
        <Button
          type="button"
          onClick={copyCurrentUrl}
          className="bg-transparent !p-0 text-xs text-gray-400 shadow-none transition-all duration-300 hover:bg-transparent hover:text-cyan-400 flex items-center gap-2 mx-auto"
        >
          <span>Share or copy package link</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
            <Share2 size={14} />
          </span>
        </Button>
      </div>
    </>
  );
};

export default PremiumBookNowForm;
