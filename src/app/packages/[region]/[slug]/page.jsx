import PackagesClient from "@/components/Packages/PackagesClient";
import {
  getDocumentBySlug,
  getPackageWithAllReferences,
  getAllDocuments,
} from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

// Enable static export by disabling dynamic params
export const dynamicParams = false;

// Generate static params for all packages
export async function generateStaticParams() {
  try {
    const packages = await getAllDocuments(COLLECTIONS.PACKAGES);
    return packages.map((pkg) => ({
      region: pkg.region,
      slug: pkg.packageSlug,
    }));
  } catch (error) {
    console.error("Error generating static params for packages:", error);
    return [];
  }
}

const fallbackMetadata = {
  title: "Packages | Bayard Vacations",
  description:
    "Explore our range of packages and find the perfect one for you.",
  keywords: "vacation packages, travel deals, holiday tours",
};

export const generateMetadata = async ({ params }) => {
  const slug = (await params).slug;
  const packageData = await getDocumentBySlug(slug);

  if (!packageData) {
    return {
      title: fallbackMetadata.title,
      description: fallbackMetadata.description,
      keywords: fallbackMetadata.keywords,
    };
  }

  const metadata = {
    title: packageData.meta?.title || packageData.packageName,
    description:
      packageData.meta?.description || packageData.footer_description,
    keywords: packageData.meta?.keywords || fallbackMetadata.keywords,
    openGraph: {
      title: packageData.meta?.title || packageData.packageName,
      description:
        packageData.meta?.description || packageData.footer_description,
      type: "website",
    },
  };

  // Add custom meta tags if they exist
  if (packageData.meta?.custom && Array.isArray(packageData.meta.custom)) {
    const customMetaTags = {};
    packageData.meta.custom.forEach(({ key, value }) => {
      customMetaTags[key] = value;
    });

    if (Object.keys(customMetaTags).length > 0) {
      metadata.other = customMetaTags;
    }
  }

  return metadata;
};

export default function Page() {
  return <PackagesClient />;
}
