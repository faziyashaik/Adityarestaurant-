import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { HotelRoomsListSection } from '@/components/hotel/HotelRoomsListSection';
import { HotelRoomsGallery } from '@/components/hotel/HotelRoomsGallery';
import { HotelBookingAndPoliciesSection } from '@/components/hotel/HotelBookingAndPoliciesSection';

export const metadata: Metadata = {
  title: 'Luxury Hotel Rooms',
  description:
    'Well-appointed AC rooms with high-speed WiFi, parking, and 24/7 hot water for a relaxing stay in Kandukur.',
};

export default function HotelRoomsPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F3ED] text-[#1E1E1E]">
      {/* Page Header Banner */}
      <div className="relative bg-[#5F1624] text-white py-16 px-4 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hotel/HotelRooms1.png"
            alt="Hotel Rooms Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
            REST IN UNMATCHED COMFORT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Luxury Hotel Rooms
          </h1>
          <p className="font-serif italic text-lg text-gray-200 max-w-2xl mx-auto">
            &quot;Well-appointed AC rooms with high-speed WiFi, parking, and 24/7 hot water.&quot;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Live Room Accommodations Cards (Connected to MongoDB Backend API) */}
        <HotelRoomsListSection />

        {/* HOTEL ROOMS GALLERY (4 Images Grid) */}
        <HotelRoomsGallery />

        {/* HOTEL POLICIES & BOOK YOUR STAY SECTION (Unified 2-Column Layout) */}
        <HotelBookingAndPoliciesSection />
      </div>
    </div>
  );
}
