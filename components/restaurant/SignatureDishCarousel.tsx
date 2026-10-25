'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SignatureDish } from '@/types';
import { SignatureDishCard } from './SignatureDishCard';

interface SignatureDishCarouselProps {
  dishes: SignatureDish[];
  onOrderClick: (dish: SignatureDish) => void;
}

export const SignatureDishCarousel: React.FC<SignatureDishCarouselProps> = ({ dishes, onOrderClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -240,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 240,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
      {/* Left Navigation Button */}
      <button
        onClick={handleScrollLeft}
        aria-label="Previous dishes"
        className="absolute left-0 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#741B2A] border border-gray-300 shadow-xl flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#741B2A] cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={handleScrollRight}
        aria-label="Next dishes"
        className="absolute right-0 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#741B2A] border border-gray-300 shadow-xl flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#741B2A] cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Carousel Track Container with Responsive Padding */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-none py-4 px-10 sm:px-16 md:px-20 flex space-x-3 sm:space-x-4 flex-nowrap"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {dishes.map((dish) => (
          <SignatureDishCard key={dish.id} dish={dish} onOrderClick={onOrderClick} />
        ))}
      </div>
    </div>
  );
};
