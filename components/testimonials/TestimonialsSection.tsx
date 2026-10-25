'use client';

import React, { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section className="relative py-16 sm:py-24 bg-[#741B2A] text-white overflow-hidden">
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A23A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#C9A23A] tracking-tight">
            What Our Guests Say
          </h2>

          {/* Small Gold Divider Line */}
          <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
        </div>

        {/* Decorative Quote Icon */}
        <div className="flex justify-center text-[#C9A23A]/80 pt-2 sm:pt-4">
          <Quote className="w-10 h-10 sm:w-12 sm:h-12 rotate-180" />
        </div>

        {/* Active Testimonial Card */}
        <div className="min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center space-y-4 sm:space-y-6 transition-all duration-300">
          {/* Testimonial Quote */}
          <blockquote className="font-serif text-base sm:text-2xl md:text-3xl italic font-light leading-relaxed max-w-3xl text-gray-100 px-2">
            &quot;{activeTestimonial.text}&quot;
          </blockquote>

          {/* Star Rating */}
          <div className="flex justify-center space-x-1 text-[#C9A23A]">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C9A23A] text-[#C9A23A]" />
            ))}
          </div>

          {/* Author Name */}
          <div className="text-xs sm:text-sm font-sans tracking-[0.2em] font-semibold text-[#C9A23A] uppercase">
            — {activeTestimonial.author}
          </div>
        </div>

        {/* Testimonial Carousel Indicator Dots */}
        <div className="flex justify-center items-center space-x-3 pt-4 sm:pt-6">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer p-1 ${
                index === activeIndex
                  ? 'w-8 h-2.5 bg-[#C9A23A]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
