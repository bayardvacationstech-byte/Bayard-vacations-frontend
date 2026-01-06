// import WhatsAppIcon from "@/assets/whatsapp_icon.svg";
// import Link from "next/link";
// import Image from "next/image";

// export default function FloatingIcon() {
//   return (
//     <Link
//       href="https://wa.me/+916363117421"
//       className="fixed bottom-16 right-0 p-3 m-5 mb-7 bg-green-500 z-50 rounded-full"
//       target="_blank"
//     >
//       <Image src={WhatsAppIcon} alt="WhatsApp" width={32} height={32} />
//     </Link>
//   );
// }

import WhatsAppIcon from "@/assets/whatsapp_icon.svg";
import Link from "next/link";
import Image from "next/image";

export default function FloatingIcon() {
  return (
    <Link
      href="https://wa.me/+916363117421"
      target="_blank"
      className="fixed bottom-24 right-4 z-50   "
    >
      <div className="relative rounded-full float-base float-delay-1  p-4 shadow-lg hover:scale-105 transition-transform">
        <Image src={WhatsAppIcon} alt="WhatsApp" width={28} height={28} />
      </div>
    </Link>
  );
}
