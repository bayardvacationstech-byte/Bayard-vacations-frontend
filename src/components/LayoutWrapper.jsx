'use client';

import { usePathname } from 'next/navigation';
import DesktopNavbar from '@/components/Navbars/DesktopNavbar';
import MobileNavbar from '@/components/Navbars/MobileNavbar';
import LeadForm from '@/components/Forms/EnquiryForm/LeadForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import ChatbotIcon from '@/components/ChatbotIcon';
import FooterClient from '@/components/layouts/FooterClient';

export default function LayoutWrapper({ children, footerData }) {
  const pathname = usePathname();
  const isShareRoute = pathname?.startsWith('/share');

  return (
    <>
      {/* Only show main navigation if NOT on share route */}
      {!isShareRoute && (
        <>
          <DesktopNavbar />
          <MobileNavbar />
        </>
      )}
      
      {children}
      
       {/* Only show main site components if NOT on share route */}
      {!isShareRoute && (
        <>
          <LeadForm />
          <WhatsAppIcon />
          <ChatbotIcon />
          <FooterClient {...footerData} />
        </>
      )}
    </>
  );
}
