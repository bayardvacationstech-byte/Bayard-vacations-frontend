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
      className="fixed bottom-20 md:bottom-6 right-4 z-50 group"
    >
      <div className="relative rounded-full bg-[#25D366] p-4 md:p-4 shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 animate-floatSlow">
        <Image src={WhatsAppIcon} alt="WhatsApp" width={26} height={26} className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] drop-shadow-sm" />
      </div>
    </Link>
  );
}
