// components/categories/CategoryCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CategoryCard({
  title,
  titleColor,
  subTitle,
  image,
  icon,
  href,
  priority = false,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full">
      <div className="group relative h-[388px] overflow-hidden rounded-2xl shadow-lg">
        <Link href={href} className="absolute inset-0 block" aria-label={title}>
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 311px"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
            loading={priority ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 transition-colors group-hover:bg-black/10" />
        </Link>

        {/* Card Content */}
        <Link
          href={href}
          className="absolute inset-x-2 bottom-[14px]"
          aria-label={title}
        >
          <div className="flex h-[78px] items-center rounded-lg bg-white p-4 ">
            <div className="flex-1">
              <h3 className="text-[16px]" style={{ color: titleColor }}>
                {title}
              </h3>
              <p className="text-[12px] text-muted-foreground/70">{subTitle}</p>
            </div>
            <div className="relative size-[50px]">
              <Image
                src={icon}
                alt=""
                fill
                className="transition-transform group-hover:translate-y-[-35px]"
                priority={priority}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
