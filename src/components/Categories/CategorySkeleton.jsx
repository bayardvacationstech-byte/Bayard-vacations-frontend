// components/categories/CategorySkeleton.tsx
import { Skeleton, SkeletonContainer } from "@/components/Skeleton";

export function CategorySkeleton() {
  return (
    <section className="flex w-full justify-center bg-[#E5ECF7] py-12 md:py-16">
      <div className="flex w-full max-w-[1440px] flex-col items-center">
        <div className="w-full max-w-[1300px] px-4">
          {/* Header Skeleton */}
          <div className="mb-12 flex w-full items-center justify-between">
            <Skeleton className="h-12 w-48" /> {/* Categories text */}
            <Skeleton className="h-12 w-32 rounded-md" />{" "}
            {/* Explore All button */}
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 gap-[19px] sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full max-w-[311px]">
                <SkeletonContainer>
                  {/* Card Image */}
                  <Skeleton className="h-[388px] rounded-2xl" />

                  {/* Card Content */}
                  <div className="relative mx-2 mt-[-78px]">
                    <Skeleton className="h-[78px] rounded-lg" />
                  </div>
                </SkeletonContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
