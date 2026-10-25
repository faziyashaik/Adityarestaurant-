'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Bed, PartyPopper, Utensils } from 'lucide-react';
import { PREMIUM_SERVICES } from '@/lib/data';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-[#C9A23A]" />;
      case 'Bed':
        return <Bed className="w-4 h-4 text-[#C9A23A]" />;
      case 'PartyPopper':
        return <PartyPopper className="w-4 h-4 text-[#C9A23A]" />;
      default:
        return <Utensils className="w-4 h-4 text-[#C9A23A]" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#741B2A] tracking-tight">
            Our Premium Services
          </h2>

          {/* Short Gold Horizontal Line */}
          <div className="w-20 h-1 bg-[#C9A23A] mx-auto rounded-full" />

          {/* Description */}
          <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed">
            Experience the perfect blend of luxury, comfort, and culinary excellence under one roof.
          </p>
        </div>

        {/* 3 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PREMIUM_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#C9A23A]/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay gradient for badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge over lower portion of image */}
                <div className="absolute bottom-4 left-4 bg-[#5F1624]/90 backdrop-blur-sm border border-[#C9A23A]/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  {getIcon(service.iconName)}
                  <span>{service.category}</span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category Title */}
                  <h3 className="font-serif text-2xl font-bold text-[#741B2A]">
                    {service.title}
                  </h3>

                  {/* Gold Subtitle */}
                  <p className="text-[#C9A23A] font-serif italic text-base font-semibold">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed pt-2">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Explore Link */}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href={service.route}
                    className="inline-flex items-center text-[#741B2A] font-semibold text-sm hover:text-[#C9A23A] transition-colors group/link"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
