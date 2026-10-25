import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { AboutRestaurantSection } from '@/components/restaurant/AboutRestaurantSection';
import { SignatureDishes } from '@/components/restaurant/SignatureDishes';
import { OurMenuSection } from '@/components/restaurant/OurMenuSection';
import { RestaurantInteriorGallery } from '@/components/restaurant/RestaurantInteriorGallery';
import { TablesAndBookingSection } from '@/components/restaurant/TablesAndBookingSection';

export const metadata: Metadata = {
  title: 'Fine Dining Restaurant',
  description:
    'AC restaurant with 16 tables offering authentic Veg & Non-Veg delicacies in a premium luxury ambience in Kandukur.',
};

export default function RestaurantPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F3ED] text-[#1E1E1E]">
      {/* Page Header Banner */}
      <div className="relative bg-[#5F1624] text-white py-16 px-4 mb-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/restaurant/restaurant_main.jpg"
            alt="Restaurant Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
            EXQUISITE CULINARY EXPERIENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Fine Dining Restaurant
          </h1>
          <p className="font-serif italic text-lg text-gray-200 max-w-2xl mx-auto">
            &quot;Dine In Excellence — Offering the finest Veg &amp; Non-Veg delicacies in a premium AC ambience.&quot;
          </p>
        </div>
      </div>

      {/* ABOUT OUR RESTAURANT SECTION */}
      <AboutRestaurantSection />

      {/* OUR SIGNATURE DISHES SECTION */}
      <SignatureDishes />

      {/* OUR MENU SECTION (Complete 500+ Items Categorized Menu) */}
      <OurMenuSection />

      {/* RESTAURANT INTERIOR GALLERY SECTION (Placed after Our Menu & before Table Reserve) */}
      <RestaurantInteriorGallery />

      {/* OUR TABLES & BOOK A TABLE SECTION (WhatsApp Integration) */}
      <TablesAndBookingSection />
    </div>
  );
}
