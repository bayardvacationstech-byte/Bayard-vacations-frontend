import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import categoryData from "@/data/categoryData";

const ThemeGridItem = ({ item }) => {
  // Normalize slug for internal linking (strip query params if any)
  const baseSlug = item.slug.split("?")[0];
  
  return (
    <Link href={`/themes/${baseSlug}`} className="group block focus:outline-none">
      <div className="flex items-center gap-4 lg:gap-6 p-4 rounded-3xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10">
        {/* Icon Container */}
        <div className="relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl lg:rounded-3xl flex items-center justify-center p-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <Image
            src={item.icon}
            alt={item.title}
            width={48}
            height={48}
            className="size-full object-contain"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-brand-green transition-colors">
            {item.title}
          </h3>
          <p className="text-sm lg:text-base text-slate-400 font-medium">
            {item.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ThemeGrid = () => {
  return (
    <section className="bg-black py-20 lg:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categoryData.map((item) => (
            <ThemeGridItem key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ThemeGrid;
