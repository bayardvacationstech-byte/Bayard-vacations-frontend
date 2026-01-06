"use client";
import Container from "@/components/ui/Container";
import NamePanel from "@/components/Profile/NamePanel";
import GenderPanel from "@/components/Profile/GenderPanel";
import PhonePanel from "@/components/Profile/PhonePanel";
import EmailPanel from "@/components/Profile/EmailPanel";
import AddressPanel from "@/components/Profile/AddressPanel";
import LogoutButton from "@/components/LogoutButton";

const ProfilePage = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-10">
          <NamePanel />
          <div className="grid gap-10 c-lg:grid-cols-2">
            <GenderPanel />
            <PhonePanel />
          </div>
          <EmailPanel />
          <AddressPanel />
          <div className="relative rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
            <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-nord font-bold uppercase text-brand-blue">
              Account
            </h5>
            <LogoutButton />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
