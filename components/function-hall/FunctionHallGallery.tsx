'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

export interface HallGalleryItem {
  id: number;
  src: string;
  alt: string;
}

// 4 Function Hall Gallery Images
export const HALL_GALLERY_IMAGES: HallGalleryItem[] = [
  {
    id: 1,
    src: '/images/function-hall/FunctionHall1.jpg',
    alt: 'Grand Function Hall Event Stage & Floral Backdrop',
  },
  {
    id: 2,
    src: '/images/function-hall/FunctionHall2.png',
    alt: 'Royal Wedding & Reception Stage Setup',
  },
  {
    id: 3,
    src: '/images/function-hall/FunctionHall3.png',
    alt: 'Air-Conditioned Banquet Seating Arrangement',
  },
  {
    id: 4,
    src: '/images/function-hall/FunctionHall4.png',
    alt: 'Grand Celebration Hall with Seating & Lighting',
  },
];

export const FunctionHallGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<HallGalleryItem | null>(null);

  return (
    <section id="function-hall-gallery" className="py-12 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
            GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
            Function Hall Gallery
          </h2>
          <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
        </div>

        {/* 4 Image 2x2 Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {HALL_GALLERY_IMAGES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 cursor-pointer bg-gray-100"
            >
              {/* Pure Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Minimalist Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-[#741B2A] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pure Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-all"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full h-[85vh] flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-11 h-11 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#741B2A] transition-colors border border-white/20 shadow-xl cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Pure Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
