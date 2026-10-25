import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { FindUsSection } from '@/components/find-us/FindUsSection';
import { ContactFormSection } from '@/components/contact/ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Aditya Restaurant & Hospitality in Kandukur, Andhra Pradesh. Address, phone, email, map, and contact inquiries.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F3ED] text-[#1E1E1E]">
      {/* Page Header Banner */}
      <div className="relative bg-[#5F1624] text-white py-16 px-4 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/catering/catering_main.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
            WE WOULD LOVE TO HEAR FROM YOU
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Contact Us
          </h1>
          <p className="font-serif italic text-lg text-gray-200">
            &quot;Reach out to us for dining reservations, room stays, function halls, or catering inquiries.&quot;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Contact Form Section */}
        <ContactFormSection />

        {/* 2. Find Us Section (Contact Details & Google Maps) */}
        <FindUsSection />
      </div>
    </div>
  );
}
