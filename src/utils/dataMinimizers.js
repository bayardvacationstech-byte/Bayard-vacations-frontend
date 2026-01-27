export const minimizePackageData = (pkg) => {
  if (!pkg) return null;
  return {
    id: pkg.id,
    packageTitle: pkg.packageTitle || "",
    packageSlug: pkg.packageSlug || "",
    region: pkg.region || "",
    basePrice: pkg.basePrice || 0,
    offerPrice: pkg.offerPrice || 0,
    savingsAmount: pkg.savingsAmount || 0,
    days: pkg.days || 1,
    nights: pkg.nights || 0,
    // Robust image scavenging in minimizer
    cardImages: (pkg.cardImages || []).map(img => {
      const url = typeof img === "string" ? img : img?.url;
      return url ? { url, title: img?.title || "" } : null;
    }).filter(Boolean).slice(0, 5),
    bannerImages: (pkg.bannerImages || []).map(img => {
      const url = typeof img === "string" ? img : img?.url;
      return url ? { url, title: img?.title || "" } : null;
    }).filter(Boolean).slice(0, 5),
    image: pkg.image || "",
    imageUrl: pkg.imageUrl || "",
    imageRefs: pkg.imageRefs || [],
    cardImageRef: pkg.cardImageRef || null,
    packageTags: pkg.packageTags || [],
    trending: !!pkg.trending,
    curated: !!pkg.curated,
    bestseller: !!pkg.bestseller,
    underrated: !!pkg.underrated,
    // Add any others absolutely needed for cards
  };
};

export const minimizeRegionData = (region) => {
  if (!region) return null;
  return {
    id: region.id,
    name: region.name || "",
    slug: region.slug || "",
    featuredImage: region.featuredImage ? { url: region.featuredImage.url } : null,
    isDomestic: !!region.isDomestic,
    visible: region.visible !== false,
    startingPrice: region.startingPrice || 0,
    defaultDays: region.defaultDays || 0,
  };
};

export const minimizeReviewData = (review) => {
  if (!review) return null;
  return {
    author: review.author || review.author_name || "Guest",
    text: review.text || "",
    rating: review.rating || 5,
    profile_photo_url: review.profile_photo_url || "",
    relative_time_description: review.relative_time_description || "",
  };
};
