// import { v4 as uuidv4 } from "uuid";
// import Container from "@/components/ui/Container";
// import Link from "next/link";
// import {
//   ChevronDown,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Twitter,
//   ChevronUp,
// } from "lucide-react";
// import categoryData from "@/data/categoryData";
// import quickLinksData from "@/data/quickLinksData";
// import Image from "next/image";
// import { fetchRegions } from "@/lib/server";

// const Footer = async () => {
//   const { domesticRegions, internationalRegions } = await fetchRegions();

//   return (
//     <footer className="section-padding bg-brand-blue">
//       <Container className="mt-6 sm:mt-12">
//         <div className="mb-8 flex flex-col justify-between gap-8 text-white c-lg:flex-row c-lg:items-end">
//           <Image
//             src="/img/logo.svg"
//             alt="Bayard vacations logo"
//             width={480}
//             height={96}
//             className="h-auto w-2/4 sm:max-w-[300px]"
//             priority
//           />
//           <div>
//             <h4 className="mb-2 font-bold">Follow us on</h4>
//             <div className="flex gap-8 text-lg text-white c-md:text-xl">
//               <a
//                 href="https://www.facebook.com/bayardvacation/"
//                 target="_blank"
//               >
//                 <Facebook className="opacity-80 transition-all duration-300 hover:opacity-100" />
//               </a>
//               <a
//                 href="https://www.instagram.com/bayardvacations"
//                 target="_blank"
//               >
//                 <Instagram className="opacity-80 transition-all duration-300 hover:opacity-100" />
//               </a>
//               <a href="https://x.com/bayardvacations" target="_blank">
//                 <Twitter className="opacity-80 transition-all duration-300 hover:opacity-100" />
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/bayard-vacations/"
//                 target="_blank"
//               >
//                 <Linkedin className="opacity-80 transition-all duration-300 hover:opacity-100" />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="grid gap-4 text-white">
//           <div>
//             <input
//               type="checkbox"
//               id="international-toggle"
//               className="hidden"
//             />
//             <div className="mb-2 flex items-center gap-1">
//               <h5 className="font-bold">International</h5>
//               <label
//                 htmlFor="international-toggle"
//                 className="cursor-pointer text-sm opacity-80 hover:opacity-100"
//               >
//                 <ChevronDown className="transition-transform duration-300" />
//               </label>
//             </div>
//             <ul className="flex flex-wrap items-center gap-2 text-sm max-h-0 overflow-hidden transition-all duration-300">
//               {internationalRegions.map((region, i, arr) => (
//                 <li key={uuidv4()} className="flex items-center gap-2">
//                   <Link
//                     href={`/packages/${region.slug}`}
//                     className="border-b border-solid border-transparent leading-[100%] transition-all duration-300 hover:border-white"
//                   >
//                     {region.name}
//                   </Link>
//                   {i !== arr.length - 1 && <span>|</span>}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <input type="checkbox" id="domestic-toggle" className="hidden" />
//             <div className="mb-2 flex items-center gap-1">
//               <h5 className="font-bold">Domestic</h5>
//               <label
//                 htmlFor="domestic-toggle"
//                 className="cursor-pointer text-sm opacity-80 hover:opacity-100"
//               >
//                 <ChevronDown className="transition-transform duration-300" />
//               </label>
//             </div>
//             <ul className="flex flex-wrap items-center gap-2 text-sm max-h-0 overflow-hidden transition-all duration-300">
//               {domesticRegions.map((region, i, arr) => (
//                 <li key={uuidv4()} className="flex items-center gap-2">
//                   <Link
//                     href={`/packages/${region.slug}`}
//                     className="border-b border-solid border-transparent leading-[100%] transition-all duration-300 hover:border-white"
//                   >
//                     {region.name}
//                   </Link>
//                   {i !== arr.length - 1 && <span>|</span>}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h5 className="mb-2 font-bold">Themes</h5>
//             <ul className="flex flex-wrap items-center gap-2 text-sm">
//               {categoryData.map((item, i, arr) => (
//                 <li key={item.id} className="flex items-center gap-2">
//                   <Link
//                     href={`/categories/${item.slug}`}
//                     className="border-b border-solid border-transparent transition-all duration-300 hover:border-white"
//                   >
//                     {item.title}
//                   </Link>
//                   {i !== arr.length - 1 && <span>|</span>}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="my-8 h-px bg-white c-md:my-12"></div>

//         <div className="flex flex-col justify-between gap-12 text-xs text-white c-xl:flex-row">
//           <ul className=" flex flex-wrap gap-6 text-xs">
//             {quickLinksData.map((item) => (
//               <li key={item.id}>
//                 <Link
//                   href={`${item.href}`}
//                   className="border-b border-solid border-transparent transition-all duration-300 hover:border-white"
//                 >
//                   {item.title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <p className=" ">
//             &copy; All copyrights reserved {new Date().getFullYear()} Bayard
//             Vacations
//           </p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;


import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";
import categoryData from "@/data/categoryData";
import quickLinksData from "@/data/quickLinksData";
import Image from "next/image";
import { fetchRegions } from "@/lib/server";

import Container from "@/components/ui/Container";

const Footer = async () => {
  const { domesticRegions, internationalRegions } = await fetchRegions();

  return (
    <footer className="relative bg-gradient-to-b from-brand-blue to-[#020617] text-white">
      {/* subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <Container className="py-12 sm:py-16">
        {/* TOP */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Image
            src="/img/logo.svg"
            alt="Bayard Vacations"
            width={420}
            height={90}
            className="w-48 sm:w-64"
            priority
          />

          <div className="text-right">
            <p className="mb-4 text-sm font-semibold text-white">Follow us</p>
            <div className="flex gap-3 justify-end">
              <a
                href="https://www.facebook.com/bayardvacation/"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/30 transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/bayardvacations"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@BayardVacations"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-[#FF0000] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/bayard-vacations/"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-[#0A66C2] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="mt-12 grid gap-8 md:grid-cols-3 text-sm">
          {/* International */}
          <div>
            <h5 className="mb-3 font-semibold tracking-wide">International</h5>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-white/80">
              {internationalRegions.map((region, i, arr) => (
                <li key={region.slug || i} className="flex items-center gap-2">
                  <Link
                    href={`/packages/${region.slug}`}
                    className="hover:text-white hover:underline underline-offset-4 transition"
                  >
                    {region.name}
                  </Link>
                  {i !== arr.length - 1 && (
                    <span className="opacity-30">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Domestic */}
          <div>
            <h5 className="mb-3 font-semibold tracking-wide">Domestic</h5>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-white/80">
              {domesticRegions.map((region, i, arr) => (
                <li key={region.slug || i} className="flex items-center gap-2">
                  <Link
                    href={`/packages/${region.slug}`}
                    className="hover:text-white hover:underline underline-offset-4 transition"
                  >
                    {region.name}
                  </Link>
                  {i !== arr.length - 1 && (
                    <span className="opacity-30">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Themes */}
          <div>
            <h5 className="mb-3 font-semibold tracking-wide">Themes</h5>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-white/80">
              {categoryData.map((item, i, arr) => (
                <li key={item.id} className="flex items-center gap-2">
                  <Link
                    href={`/categories/${item.slug}`}
                    className="hover:text-white hover:underline underline-offset-4 transition"
                  >
                    {item.title}
                  </Link>
                  {i !== arr.length - 1 && (
                    <span className="opacity-30">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info - Simple Row */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <h5 className="font-semibold mb-6 text-brand-green">Contact Information</h5>
          <div className="grid gap-6 md:grid-cols-4 text-sm">
            {/* Address */}
            <div>
              <h6 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Office
              </h6>
              <p className="text-white/70 leading-relaxed">
                123 Travel Hub, MG Road<br />
                Bangalore, Karnataka 560001
              </p>
            </div>

            {/* Phone */}
            <div>
              <h6 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </h6>
              <p className="text-white/70">
                <a href="tel:+918069668484" className="hover:text-white transition">+91 80696 68484</a>
              </p>
            </div>

            {/* Email */}
            <div>
              <h6 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </h6>
              <p className="text-white/70">
                <a href="mailto:info@bayardvacations.com" className="hover:text-white transition">info@bayardvacations.com</a>
              </p>
            </div>

            {/* Hours */}
            <div>
              <h6 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hours
              </h6>
              <p className="text-white/70 leading-relaxed">
                Mon-Sat: 9AM - 7PM<br />
                Sun: 10AM - 5PM
              </p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-white/20" />

        {/* BOTTOM */}
        <div className="flex flex-col gap-6 text-xs text-white/70 xl:flex-row xl:items-center xl:justify-between">
          <ul className="flex flex-wrap gap-6">
            {quickLinksData.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hover:text-white transition">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <p>
            © 2025 Bayard Vacations. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
