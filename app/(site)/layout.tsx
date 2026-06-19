import { ViewTransition } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CookieConsent from '@/components/CookieConsent';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ViewTransition
        enter="page-enter"
        exit="page-exit"
        default="page-enter"
      >
        <main>{children}</main>
      </ViewTransition>
      <Footer />
      <WhatsAppFloat />
      <CookieConsent />
    </>
  );
}
