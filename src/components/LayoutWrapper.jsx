'use client';

import { usePathname } from 'next/navigation';
import DesktopNavbar from '@/components/Navbars/DesktopNavbar';
import MobileNavbar from '@/components/Navbars/MobileNavbar';
import LeadForm from '@/components/Forms/EnquiryForm/LeadForm';
import LeadGenerationTrigger from '@/components/Forms/EnquiryForm/LeadGenerationTrigger';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import ChatbotIcon from '@/components/ChatbotIcon';
import FooterClient from '@/components/layouts/FooterClient';
import AuthModal from '@/components/Forms/LoginForm/AuthModal';

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
          <LeadGenerationTrigger />
          <WhatsAppIcon />
          <ChatbotIcon />
          <FooterClient {...footerData} />
          <AuthModal />
        </>
      )}
    </>
  );
}
