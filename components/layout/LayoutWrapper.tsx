'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { FloatingButtons } from '@/components/ui/FloatingButtons';
import { PublicOfferModal } from '@/components/public/PublicOfferModal';

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingButtons />
      <PublicOfferModal />
    </>
  );
};
