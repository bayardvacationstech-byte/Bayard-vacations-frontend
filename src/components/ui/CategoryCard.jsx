import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ item }) => {
  return (
    <Link href={`/categories/${item.slug}`}>
      <article className="sm:hoverable-card overflow-hidden rounded-2xl bg-[#E5ECF7]">
        <div className="h-[390px] w-full overflow-hidden rounded-2xl">
          <Image
            alt={item.title}
            src={item.img}
            width={320}
            height={390}
            className="size-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-8 p-6">
          <h4 className="text-lg font-bold text-brand-blue">{item.title}</h4>
          <Image
            src={item.icon}
            alt={`${item.title} icon`}
            width={40}
            height={40}
            className="shrink-0"
          />
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
