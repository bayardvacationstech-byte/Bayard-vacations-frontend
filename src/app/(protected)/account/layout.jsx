"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const AccountLayout = ({ children }) => {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  const navLinks = [
    { href: "/account/profile", label: "My Account" },
    { href: "/account/bookings", label: "Booking History" },
    { href: "/account/docs", label: "Documents Upload" },
  ];

  return (
    <>
      <section className="relative pt-32 lg:pt-48">
        <div className="absolute inset-0 z-10 overflow-hidden rounded-b-[60px]">
          <Image
            width={1920}
            height={500}
            src="/img/user-page-bg.svg"
            alt="background pattern"
            className="size-full object-cover"
          />
        </div>
        <div className="relative z-20">
          <Container>
            <h1 className="mb-12 text-center text-5xl font-bold text-brand-blue">
              Hi, {userInfo.displayName}
            </h1>
            <nav>
              <ul className="mx-auto flex max-w-screen-c-sm justify-between rounded-t-3xl bg-brand-blue px-8 py-4 text-white c-md:px-12 c-lg:px-16">
                {navLinks.map((link, index) => (
                  <React.Fragment key={link.href}>
                    <li>
                      <Link
                        className={`transition-all hover:border-b hover:border-solid hover:border-white ${
                          pathname === link.href
                            ? "border-b border-solid border-white"
                            : ""
                        }`}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                    {index < navLinks.length - 1 && (
                      <li>
                        <span className="inline-block h-full w-px rounded-full bg-white"></span>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      </section>
      <div>{children}</div>
    </>
  );
};

export default AccountLayout;
