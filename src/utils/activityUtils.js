import { 
  Waves, 
  Mountain, 
  TreePine, 
  Bike,
  Compass,
  Sailboat,
  Tent,
  Utensils,
  Palette,
  Music,
  Building,
  Flame,
  Snowflake,
  Cable,
  Users
} from "lucide-react";

/**
 * Map icon name strings to Lucide React components
 */
const iconMap = {
  "Waves": Waves,
  "Mountain": Mountain,
  "Cable": Cable,
  "Building": Building,
  "Flame": Flame,
  "Snowflake": Snowflake,
  "TreePine": TreePine,
  "Bike": Bike,
  "Compass": Compass,
  "Sailboat": Sailboat,
  "Tent": Tent,
  "Utensils": Utensils,
  "Palette": Palette,
  "Music": Music,
  "Users": Users,
};

/**
 * Get Lucide icon component based on icon name or activity category
 */
export function getActivityIcon(iconName, category) {
  // First try to map by icon name if provided
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }

  // Fallback to category-based mapping
  const categoryLower = category?.toLowerCase() || "";
  
  if (categoryLower.includes("water") || categoryLower.includes("diving") || categoryLower.includes("snorkeling")) return Waves;
  if (categoryLower.includes("mountain") || categoryLower.includes("trek") || categoryLower.includes("hiking")) return Mountain;
  if (categoryLower.includes("nature") || categoryLower.includes("forest") || categoryLower.includes("safari") || categoryLower.includes("leisure")) return TreePine;
  if (categoryLower.includes("bike") || categoryLower.includes("cycling")) return Bike;
  if (categoryLower.includes("cultural") || categoryLower.includes("culture") || categoryLower.includes("heritage") || categoryLower.includes("archaeological") || categoryLower.includes("historical")) return Building;
  if (categoryLower.includes("music") || categoryLower.includes("dance") || categoryLower.includes("entertainment") || categoryLower.includes("family")) return Music;
  if (categoryLower.includes("food") || categoryLower.includes("cooking") || categoryLower.includes("culinary")) return Utensils;
  if (categoryLower.includes("camping") || categoryLower.includes("overnight")) return Tent;
  if (categoryLower.includes("sailing") || categoryLower.includes("boat")) return Sailboat;
  if (categoryLower.includes("cable") || categoryLower.includes("activities")) return Cable;
  if (categoryLower.includes("winter") || categoryLower.includes("ski") || categoryLower.includes("snow")) return Snowflake;
  if (categoryLower.includes("fire") || categoryLower.includes("temple")) return Flame;
  
  return Compass; // Default icon
}

/**
 * Transform API activity data to component format
 */
export function transformActivity(apiActivity) {
  if (!apiActivity) return null;

  return {
    id: apiActivity.id,
    slug: apiActivity.slug,
    title: apiActivity.card?.title || "Untitled Activity",
    category: apiActivity.activityCategory || "general",
    themeCategory: apiActivity.themeCategory || "",
    badge: apiActivity.card?.badge || "",
    description: apiActivity.card?.shortDescription || "",
    longDescription: apiActivity.details?.longDescription || "",
    duration: apiActivity.details?.duration || "Duration varies",
    priceRange: apiActivity.details?.priceRange || "Contact for pricing",
    groupSize: apiActivity.details?.groupSize || "Varies",
    difficulty: apiActivity.details?.difficulty || "Moderate",
    image: apiActivity.card?.image || "",
    bannerImage: apiActivity.details?.bannerImage || apiActivity.card?.image || "",
    gallery: apiActivity.details?.gallery || [],
    icon: getActivityIcon(apiActivity.card?.icon, apiActivity.activityCategory),
    isPopular: apiActivity.card?.isPopular || false,
    isInternational: apiActivity.isInternational || false,
    regionName: apiActivity.docRegionName || apiActivity.regionName || "",
    regionSlug: apiActivity.docRegionSlug || apiActivity.regionSlug || "",
    cityName: apiActivity.docCityName || apiActivity.cityName || "",
    citySlug: apiActivity.docCitySlug || apiActivity.citySlug || "",
    highlights: apiActivity.details?.highlights || [],
    included: apiActivity.details?.included || [],
    excluded: apiActivity.details?.excluded || [],
    itinerary: apiActivity.details?.itinerary || [],
    faqs: apiActivity.details?.faqs || [],
  };
}

/**
 * Get unique categories from activities array
 */
export function getUniqueCategories(activities) {
  if (!Array.isArray(activities)) return [];
  
  const categories = activities
    .map(activity => activity.category || activity.activityCategory)
    .filter(Boolean);
  
  return [...new Set(categories)];
}

/**
 * Get unique cities from activities array
 */
export function getUniqueCities(activities) {
  if (!Array.isArray(activities)) return [];
  
  const cities = activities
    .map(activity => ({
      name: activity.cityName,
      slug: activity.citySlug
    }))
    .filter(city => city.name && city.slug);
  
  // Deduplicate by slug
  const uniqueCities = Array.from(
    new Map(cities.map(city => [city.slug, city])).values()
  );
  
  return uniqueCities;
}

/**
 * Format category name for display
 */
export function formatCategoryName(category) {
  if (!category) return "";
  
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Filter activities by various criteria
 */
export function filterActivities(activities, filters = {}) {
  if (!Array.isArray(activities)) return [];
  
  const {
    category,
    locationType,
    region,
    city,
    searchTerm
  } = filters;

  return activities.filter(activity => {
    // Category filter
    if (category && category !== "all" && activity.category !== category) {
      return false;
    }

    // Location type filter (International/Domestic)
    if (locationType === "International" && !activity.isInternational) {
      return false;
    }
    if (locationType === "Domestic" && activity.isInternational) {
      return false;
    }

    // Region filter
    if (region && region !== "all" && activity.regionSlug !== region) {
      return false;
    }

    // City filter
    if (city && city !== "all" && activity.citySlug !== city) {
      return false;
    }

    // Enhanced Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const keywords = searchLower.split(/\s+/).filter(k => k.length > 1);
      
      if (keywords.length === 0) return true; // Ignore single character searches or just whitespace

      // Combine all searchable text
      const searchableFields = [
        activity.title,
        activity.description,
        activity.cityName,
        activity.regionName,
        activity.category,
        activity.themeCategory,
        ...(activity.highlights || []),
        formatCategoryName(activity.category)
      ].filter(Boolean).map(s => s.toLowerCase());

      const searchableText = searchableFields.join(" ");

      // Check if ALL keywords are present in the searchable text (OR logic can be applied if preferred, but AND is more precise)
      // Changing to SOME keywords for more "elastic" feel, or weights?
      // Let's go with "At least one word matches, but more matches is better" - actually, "Any match in these fields"
      
      const isMatch = keywords.some(keyword => searchableText.includes(keyword));
      
      if (!isMatch) {
        return false;
      }
    }

    return true;
  });
}
