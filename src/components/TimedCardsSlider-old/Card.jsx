import React from "react";
import Image from "next/image";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Card = ({ packageItem, active }) => {
  return (
    <article className="relative size-full overflow-hidden">
      <div className="absolute size-full">
        <Image
          className="size-full object-cover"
          alt={packageItem.packageName}
          src={packageItem.img}
          width={1920}
          height={1080}
        />
      </div>
      {active === true && (
        <div className="relative z-10 flex size-full items-center text-white">
          <Container>
            <h2 className="mb-2 font-nord text-7xl font-black uppercase">
              {packageItem.packageName}
            </h2>
            <p className="mb-4 max-w-sm">{packageItem.description}</p>
            <Button
              variant="success"
              asChild
              className="rounded-full px-8 py-6"
            >
              <Link href="/">
                <span>Explore All</span>
                <span>
                  <ArrowUpRight className="!size-4" />
                </span>
              </Link>
            </Button>
          </Container>
        </div>
      )}
    </article>
  );
};

export default Card;
