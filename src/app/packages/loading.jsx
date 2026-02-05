import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 border-b border-slate-800 animate-pulse">
        <Container className="h-full flex flex-col justify-center items-center gap-6">
          <div className="h-16 w-3/4 md:w-1/2 bg-slate-800 rounded-2xl" />
          <div className="h-4 w-full md:w-1/3 bg-slate-800 rounded" />
        </Container>
      </div>

      {/* Content Skeleton */}
      <div className="bg-slate-50 py-12 md:py-20">
         {/* Filter Bar Skeleton */}
         <div className="w-full max-w-4xl mx-auto px-4 mb-12">
            <div className="h-14 bg-white rounded-2xl shadow-sm border border-slate-200 animate-pulse" />
         </div>

         <Container>
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
