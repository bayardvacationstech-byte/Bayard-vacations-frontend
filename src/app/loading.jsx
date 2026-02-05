import GlobalTravelLoader from "@/components/ui/GlobalTravelLoader";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <GlobalTravelLoader />
    </div>
  );
}
