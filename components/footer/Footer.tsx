'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_NAME, BUSINESS_TAGLINE, CONTACT_INFO, NAVIGATION_LINKS } from '@/lib/constants';
import { Logo } from '@/components/ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5F1624] text-white border-t-2 border-[#C9A23A] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Four Desktop Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C9A23A]/20">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Logo light={true} />

            <p className="text-gray-300 font-serif italic text-sm leading-relaxed">
              &quot;{BUSINESS_TAGLINE}&quot;
            </p>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Experience the finest dining, comfortable stay, and grand celebrations all in one place.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C9A23A] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#C9A23A] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C9A23A] tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/restaurant" className="hover:text-[#C9A23A] transition-colors">
                  Fine Dining Restaurant
                </Link>
              </li>
              <li>
                <Link href="/hotel-rooms" className="hover:text-[#C9A23A] transition-colors">
                  Luxury Hotel Rooms
                </Link>
              </li>
              <li>
                <Link href="/function-hall" className="hover:text-[#C9A23A] transition-colors">
                  Grand Function Hall
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-[#C9A23A] transition-colors">
                  Outdoor Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C9A23A] tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C9A23A] flex-shrink-0 mt-1" />
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A23A] transition-colors break-words"
                >
                  {CONTACT_INFO.address}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#C9A23A] flex-shrink-0 mt-1" />
                <div className="space-y-0.5">
                  {CONTACT_INFO.phones.map((phone, idx) => (
                    <p key={idx}>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#C9A23A] transition-colors">
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C9A23A] flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#C9A23A] transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 text-center text-xs text-gray-400 font-sans flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          <p className="text-gray-400">Kandukur, Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
};
