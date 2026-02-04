/**
 * Maps the saved itinerary data from Firestore (formData structure)
 * to the format expected by the ShareableItinerary components.
 */
export const mapSavedItineraryToShareable = (savedData) => {
  if (!savedData || !savedData.formData) return null;

  const { formData, id } = savedData;
  const { 
    coverPageData = {}, 
    welcomePageData = {}, 
    itineraryPageData = {}, 
    summaryPageData = {}, 
    pricingPageData = {}, 
    hotelDetailsData = {},
    backCoverPageData = {},
    tripHighlightsData = {}
  } = formData;

  // 1. Map itineraries
  const itineraries = (itineraryPageData.days || []).map((day, index) => {
    // Determine the source for activities (points, highlights, activities)
    const rawPoints = day.points || day.highlights || day.activities || day.dayItinerary || [];
    
    // Process activities - handle both string arrays and object arrays
    const activities = (Array.isArray(rawPoints) ? rawPoints : []).map(point => {
      if (typeof point === 'string') return { activity: point, description: '' };
      return {
        activity: point.title || point.activity || point.content || point.name || 'Activity',
        description: point.description || point.text || ''
      };
    });

    // Determine the source for images (images, imageRefs, gallery)
    const rawImages = day.images || day.imageRefs || day.gallery || day.photos || [];

    // Process images - handle both string arrays and object arrays
    const images = (Array.isArray(rawImages) ? rawImages : []).map(img => {
      if (typeof img === 'string') return { url: img, title: '' };
      return {
        url: img.url || img.src || img.link || '',
        title: img.title || img.name || img.alt || ''
      };
    }).filter(img => img.url);

    return {
      day: day.day || index + 1,
      title: day.title || `Day ${day.day || index + 1}`,
      activities,
      overnight: day.overnight || '',
      meals: day.meals || [],
      imageRefs: images
    };
  });

  // 2. Map hotel details
  const baseCategory = hotelDetailsData.baseCategory || 'fourstar';
  const selectedHotelData = hotelDetailsData[baseCategory] || {};
  const hotelDetails = (selectedHotelData.hotels || []).map(hotel => ({
    name: hotel.name || 'Premium Hotel',
    category: `${baseCategory.replace('star', ' Star').toUpperCase()}`,
    location: hotel.city || '',
    rating: parseInt(baseCategory.charAt(0)) || 4,
    roomType: hotel.roomType || 'Standard Room',
    amenities: hotel.amenities || ['Free WiFi', 'Breakfast', 'AC'],
    checkIn: hotel.checkIn || '',
    checkOut: hotel.checkOut || '',
    images: hotel.images || []
  }));

  // 3. Map pricing
  const basePrice = pricingPageData.basePrice || 0;
  const adultsRate = pricingPageData.hotelCharges?.[baseCategory] || 0;
  const childrenRate = pricingPageData.kidsPricing?.childWithBed || pricingPageData.kidsPricing?.childWithoutBed || 0;
  const toddlersRate = pricingPageData.kidsPricing?.infant || 0;
  
  const gstRate = pricingPageData.taxes?.gst || 5;
  const tcsRate = pricingPageData.taxes?.tcs || 5;
  
  const gstAmount = Math.round(basePrice * (gstRate / 100));
  // TCS is usually calculated on (Base + GST) for international trips
  const tcsAmount = Math.round((basePrice + gstAmount) * (tcsRate / 100));
  const totalPrice = basePrice + gstAmount + tcsAmount;

  const pricing = {
    basePrice,
    totalPrice,
    currency: 'INR',
    hotelCategory: baseCategory.replace('star', ' Star').toUpperCase(),
    adultsRate,
    childrenRate,
    toddlersRate,
    gstRate,
    gstAmount,
    tcsRate,
    tcsAmount,
    perPerson: true
  };

  // 4. Map contact info
  const contactInfo = {
    companyName: "Bayard Vacations",
    phone: backCoverPageData.phoneNum || "+91 8069668484",
    email: backCoverPageData.email || "info@bayardvacations.com",
    website: "bayardvacations.com",
    destinationExpert: {
      name: backCoverPageData.name || "Travel Expert",
      designation: backCoverPageData.designation || "Destination Expert",
      email: backCoverPageData.email,
      phone: backCoverPageData.phoneNum
    }
  };

  return {
    id,
    bookingRef: `BV-${id.substring(0, 8).toUpperCase()}`,
    customerName: welcomePageData.customerName || "Our Valued Guest",
    packageName: coverPageData.title || "Your Custom Trip",
    destination: coverPageData.title || "Custom Destination",
    duration: `${coverPageData.nights || 0} Nights / ${coverPageData.days || 0} Days`,
    heroImage: coverPageData.previewImage || coverPageData.backgroundImage,
    travelDates: null, // Not explicitly found in the top level log
    travelers: {
        adults: pricingPageData.numTravelers?.adults || 2,
        children: pricingPageData.numTravelers?.children || 0,
        toddlers: pricingPageData.numTravelers?.infants || 0
    },
    pricing,
    highlights: tripHighlightsData.images?.map(h => h.title).filter(Boolean) || [],
    itineraries,
    hotelDetails,
    inclusions: (summaryPageData.includes || []).map(item => typeof item === 'object' ? (item.title || item.description || '') : item),
    exclusions: (summaryPageData.excludes || []).map(item => typeof item === 'object' ? (item.title || item.description || '') : item),
    importantNotes: (summaryPageData.notes || []).map(item => typeof item === 'object' ? (item.content || item.title || item.description || '') : item),
    contactInfo,
    faqs: [], // Not found in this structure
    testimonials: [] // Not found in this structure
  };
};
