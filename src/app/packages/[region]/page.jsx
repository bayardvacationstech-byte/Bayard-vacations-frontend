import PackagesRegionClient from "@/components/Packages/PackagesRegionClient";
import { getAllDocuments } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

// Enable dynamic params
export const dynamicParams = true;

// Generate static params for all regions
export async function generateStaticParams() {
  try {
    const regions = await getAllDocuments(COLLECTIONS.REGIONS);
    return regions.map((region) => ({
      region: region.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for regions:", error);
    return [];
  }
}

export default function PackagesRegionPage() {
  return <PackagesRegionClient />;
}