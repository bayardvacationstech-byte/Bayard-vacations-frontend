import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-[85vh] min-h-[600px] md:min-h-[700px] flex items-center bg-slate-200 border-b border-slate-300">
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        
        <Container className="relative z-20 w-full">
          <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
            {/* Tag Skeleton */}
            <div className="h-8 w-32 bg-slate-300 rounded-full animate-pulse" />
            
            {/* Title Skeleton */}
            <div className="h-16 w-3/4 md:w-1/2 bg-slate-300 rounded-2xl animate-pulse" />
            
            {/* Description Skeleton */}
            <div className="h-4 w-full md:w-2/3 bg-slate-300 rounded animate-pulse" />
            <div className="h-4 w-5/6 md:w-1/2 bg-slate-300 rounded animate-pulse" />
            
            {/* Stats Skeleton */}
            <div className="w-full mt-20 flex justify-center gap-4 md:gap-12">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-20 w-32 bg-slate-300 rounded-xl animate-pulse" />
               ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Facts Strip Skeleton */}
      <section className="py-2 md:py-6 bg-slate-50 border-b border-slate-200">
        <Container>
           <div className="flex justify-between gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="h-12 w-40 bg-slate-200 rounded-lg animate-pulse" />
              ))}
           </div>
        </Container>
      </section>

      {/* Filters & Content Area */}
      <div className="bg-slate-50 pt-2 md:pt-6 pb-20">
         {/* Filter Bar Skeleton */}
         <div className="sticky top-20 z-50 mb-8 w-full max-w-4xl mx-auto px-4 hidden md:block">
            <div className="h-14 bg-white rounded-2xl shadow-sm border border-slate-200 animate-pulse" />
         </div>

         <Container>
            {/* Section Header */}
            <div className="pt-10 mb-8">
               <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse mb-2" />
            </div>

            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 animate-pulse">
                  <div className="aspect-[4/3] bg-slate-200 rounded-xl mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="flex justify-between pt-4">
                      <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                      <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </Container>
      </div>
    </div>
  );
}
