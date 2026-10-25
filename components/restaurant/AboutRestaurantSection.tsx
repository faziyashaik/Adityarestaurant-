'use client';

import React from 'react';
import Image from 'next/image';

export const AboutRestaurantSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#741B2A] tracking-tight">
            About Our Restaurant
          </h2>
          {/* Gold Horizontal Divider */}
          <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
        </div>

        {/* Real Interior Featured Image Banner */}
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden border border-[#E7E1D3] shadow-xl group">
          <Image
            src="/images/restaurant/restaurant_interior_main.jpg"
            alt="Aditya Restaurant Fine Dining Ambience"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white space-y-1">
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-widest block">
                AUTHENTIC AMBIENCE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Fully Air-Conditioned Dining Hall (16 Tables)
              </h3>
            </div>
          </div>
        </div>

        {/* Description Paragraph */}
        <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center">
          Welcome to Aditya Restaurant, where culinary passion meets exceptional service. Our fully air-conditioned dining area features 16 well-spaced tables to accommodate intimate dinners and family gatherings alike. From authentic local delicacies to popular multi-cuisine dishes, we offer a wide variety of both Vegetarian and Non-Vegetarian options prepared with the freshest ingredients.
        </p>

        {/* Three Table Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 max-w-4xl mx-auto">
          {/* Card 1: Intimate Dining */}
          <div className="bg-[#FAF6F0] rounded-xl p-5 border border-[#EBE3D7] shadow-xs text-center space-y-1">
            <h3 className="font-serif text-base font-bold text-[#741B2A]">
              Intimate Dining
            </h3>
            <p className="font-sans text-xs text-gray-600">
              10 Tables (2-4 persons)
            </p>
          </div>

          {/* Card 2: Family Gatherings */}
          <div className="bg-[#FAF6F0] rounded-xl p-5 border border-[#EBE3D7] shadow-xs text-center space-y-1">
            <h3 className="font-serif text-base font-bold text-[#741B2A]">
              Family Gatherings
            </h3>
            <p className="font-sans text-xs text-gray-600">
              Tables 6, 9 (5-6 persons)
            </p>
          </div>

          {/* Card 3: Large Groups */}
          <div className="bg-[#FAF6F0] rounded-xl p-5 border border-[#EBE3D7] shadow-xs text-center space-y-1">
            <h3 className="font-serif text-base font-bold text-[#741B2A]">
              Large Groups
            </h3>
            <p className="font-sans text-xs text-gray-600">
              Tables 13-16 (10-30 persons)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
