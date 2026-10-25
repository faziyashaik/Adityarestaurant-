'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ light = true, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Circular Badge Logo - clicking pops up the full logo on the same page */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title="Click to view logo"
          aria-label="View full Aditya logo popup"
          className="relative block w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#C9A23A] via-[#E8D59E] to-[#C9A23A] p-[2px] shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#C9A23A]/30 focus:outline-none focus:ring-2 focus:ring-[#C9A23A] cursor-pointer group/badge flex-shrink-0"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center border border-[#C9A23A]/40 overflow-hidden relative p-1 shadow-inner">
            <Image
              src="/images/logo/logo-circle.png"
              alt="Hotel Aditya Grand logo"
              fill
              className="object-contain p-0.5 transition-transform duration-300 group-hover/badge:scale-110"
              sizes="(max-width: 640px) 44px, 48px"
              priority
            />
          </div>
        </button>

        {/* Brand Text - clicking navigates to Home */}
        <Link
          href="/"
          className="flex flex-col group/text focus:outline-none"
          title="Aditya Hospitality - Home"
        >
          <span
            className={`font-serif text-lg sm:text-xl leading-tight font-semibold tracking-wide transition-colors duration-200 ${
              light ? 'text-white group-hover/text:text-[#C9A23A]' : 'text-[#741B2A] group-hover/text-[#922637]'
            }`}
          >
            ADITYA
          </span>
          <span
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 ${
              light ? 'text-[#C9A23A] group-hover/text:text-white' : 'text-[#741B2A] group-hover/text:text-[#5F1624]'
            }`}
          >
            Hospitality
          </span>
        </Link>
      </div>

      {/* Same-Page Logo Popup Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Aditya Grand Logo Preview"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl border-2 border-[#C9A23A] flex flex-col items-center space-y-4 animate-scale-in"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-[#741B2A] text-gray-600 hover:text-white flex items-center justify-center transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-[#C9A23A] cursor-pointer"
              aria-label="Close logo popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo Image in Modal */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
              <Image
                src="/images/logo/logo.png"
                alt="Hotel Aditya Grand Full Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Brand Title in Modal */}
            <div className="text-center pt-2">
              <h3 className="font-serif text-2xl font-bold text-[#741B2A] tracking-tight">
                Hotel Aditya Grand
              </h3>
              <p className="font-serif italic text-sm text-[#C9A23A] font-semibold">
                &quot;Where Every Moment Becomes a Memory&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
