'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { Logo } from '@/components/ui/Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#741B2A] shadow-lg py-3 border-b border-[#C9A23A]/20'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Circular Logo */}
        <Logo light={true} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {NAVIGATION_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const isBookNow = link.label === 'Book Now';

            if (isBookNow) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2 rounded text-sm font-medium text-white border border-[#C9A23A] hover:bg-[#C9A23A] hover:text-[#5F1624] transition-all duration-200 shadow-sm"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                  isActive ? 'text-white font-semibold' : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.label}
                {/* Active Gold Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A23A] rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-lg text-white hover:text-[#C9A23A] focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#5F1624] border-b border-[#C9A23A]/30 px-4 pt-3 pb-6 space-y-2 max-h-[calc(100dvh-5rem)] overflow-y-auto shadow-2xl animate-fade-in">
          {NAVIGATION_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const isBookNow = link.label === 'Book Now';

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isBookNow
                    ? 'text-center border border-[#C9A23A] bg-[#C9A23A] text-[#5F1624] font-semibold mt-3 shadow-md'
                    : isActive
                    ? 'text-[#C9A23A] font-semibold bg-black/25 pl-4 border-l-4 border-[#C9A23A]'
                    : 'text-gray-200 hover:text-white hover:bg-black/15'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
