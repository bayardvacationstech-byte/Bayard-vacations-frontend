import WhyChooseRegionClient from "@/components/WhyChoose/WhyChooseRegionClient";
import { getWhyChooseRegionData } from "@/lib/server";
import { getRegionDocumentBySlug } from "@/utils/firebase";
import { SITE_DATA } from "@/config";

/**
 * Ensures the URL uses the correct region slug
 */
function syncUrlWithRegion(url, region) {
  if (!url || typeof url !== "string") return url;
  try {
    const urlObj = new URL(url);
    // Assuming URLs are in the format /destinations/[region] or similar
    // We want to replace the last part of the path if it looks like a region slug
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      pathParts[pathParts.length - 1] = region;
      urlObj.pathname = "/" + pathParts.join("/");
    }
    return urlObj.toString();
  } catch (e) {
    // If it's not a full URL, try to handle it as a path
    if (url.startsWith("/")) {
      const pathParts = url.split("/").filter(Boolean);
      if (pathParts.length > 0) {
        pathParts[pathParts.length - 1] = region;
        return "/" + pathParts.join("/");
      }
    }
    return url;
  }
}

/**
 * Recursively sync URLs in the schema object
 */
function syncSchemaUrls(obj, region) {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => syncSchemaUrls(item, region));
  }

  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && (value.startsWith("http") || (key === "url" && value.startsWith("/")))) {
      newObj[key] = syncUrlWithRegion(value, region);
    } else if (typeof value === "object" && value !== null) {
      newObj[key] = syncSchemaUrls(value, region);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

export async function generateMetadata({ params }) {
  const { region } = await params;
  
  try {
    // 1. Get region data to get the region ID
    const regionDoc = await getRegionDocumentBySlug(region);
    
    if (!regionDoc) {
      return { title: "Region Not Found" };
    }

    // 2. Fetch why choose data using the region ID
    const whyChooseData = await getWhyChooseRegionData(regionDoc.id);

    if (whyChooseData?.metaData) {
      const { metaData } = whyChooseData;
      
      return {
        title: metaData.title,
        description: metaData.description,
        keywords: metaData.keywords?.join(", "),
        alternates: {
          canonical: syncUrlWithRegion(metaData.canonical, region),
        },
        openGraph: {
          title: metaData.openGraph?.title,
          description: metaData.openGraph?.Description,
          url: syncUrlWithRegion(metaData.openGraph?.url, region),
          siteName: SITE_DATA.name,
          images: [
            {
              url: metaData.openGraph?.image,
              width: 1200,
              height: 630,
            },
          ],
          locale: metaData.openGraph?.locale,
          type: metaData.openGraph?.type,
        },
        twitter: {
          card: metaData.twitter?.card,
          site: metaData.twitter?.site,
          title: metaData.twitter?.title,
          description: metaData.twitter?.Description,
          images: [metaData.twitter?.image],
        },
        robots: metaData.robots,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  // Fallback metadata
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Why Choose ${regionName} | ${SITE_DATA.name}`,
    description: `Discover why ${regionName} should be your next travel destination. Explore highlights, attractions, and travel tips for an unforgettable experience.`,
  };
}

export default async function WhyChooseRegionPage({ params }) {
  const { region } = await params;

  // Fetch data to get schema
  let schema = null;
  try {
    const regionDoc = await getRegionDocumentBySlug(region);
    if (regionDoc) {
      const whyChooseData = await getWhyChooseRegionData(regionDoc.id);
      if (whyChooseData?.metaData?.schema) {
        schema = syncSchemaUrls(whyChooseData.metaData.schema, region);
      }
    }
  } catch (error) {
    console.error("Error fetching schema:", error);
  }

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <WhyChooseRegionClient regionSlug={region} />
    </>
  );
}
