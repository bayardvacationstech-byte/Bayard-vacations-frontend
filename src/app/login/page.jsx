"use client";

import React, { useEffect } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import LoginForm from "@/components/Forms/LoginForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const { user, userInfo } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback") || "/account/profile"; // Default to homepage

  useEffect(() => {
    if (
      user &&
      userInfo.phoneNumber &&
      userInfo.displayName &&
      userInfo.displayName?.trim() !== "" &&
      userInfo.email
    ) {
      router.replace(callbackUrl);
    }
  }, [
    user,
    userInfo.phoneNumber,
    userInfo.displayName,
    userInfo.email,
    callbackUrl,
    router,
  ]);

  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-10 size-full bg-black">
        <Image
          src="/img/login-bg.jpg"
          alt="Login"
          fill={true}
          className="size-full object-cover opacity-50"
        />
      </div>

      <Container className="relative z-20 grid gap-16 pt-32 c-lg:grid-cols-2 c-lg:gap-32 c-lg:pt-64 c-xxl:px-32">
        {/* <LoginSlider /> */}
        <div className="text-white">
          <h4 className="mb-4 font-nord text-3xl font-bold uppercase">
            Travel to your dream location
          </h4>
          <p>Embark on a new journey with Bayard Vacations</p>
        </div>

        <div className="h-full rounded-t-3xl bg-white p-8">
          <span className="mb-2 inline-block text-xs font-semibold uppercase text-brand-blue">
            Welcome back
          </span>

          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
