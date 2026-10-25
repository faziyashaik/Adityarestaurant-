'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const FloatingButtons: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Aditya Hospitality, I would like to inquire about your services.'
  )}`;

  return (
    <>
      {/* Bottom-Left Small Dark Circular Button - Scroll to Top */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Scroll to top"
          aria-label="Scroll to top"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1E1E] text-[#C9A23A] border border-[#C9A23A]/30 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span className="font-serif font-bold text-xs sm:text-sm">↑</span>
        </button>
      </div>

      {/* Bottom-Right Fixed Circular WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none ring-4 ring-white/20"
        >
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 fill-current stroke-none text-white" />
          <span className="hidden sm:block absolute right-16 bg-black/80 text-white text-xs font-sans py-1 px-3 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </>
  );
};
