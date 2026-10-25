'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, ChevronDown, PartyPopper, Utensils } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/data';

export const Hero: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 6000); // 6 seconds auto crossfade

    return () => clearInterval(timer);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white pt-20 sm:pt-24 pb-6 sm:pb-8">
      {/* Background Carousel Images with Smooth Crossfade */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlideIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover object-center scale-105 transition-transform duration-[10000ms] ease-out"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark Translucent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/75 z-10" />

      {/* Main Hero Content - Centered */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center my-auto flex flex-col items-center justify-center space-y-4 sm:space-y-6 pt-6 sm:pt-12">
        {/* Small Gold Welcome Text */}
        <span className="text-[#C9A23A] text-[11px] sm:text-sm font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold">
          WELCOME TO
        </span>

        {/* Large White Serif Editorial Heading */}
        <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl drop-shadow-md">
          Aditya Restaurant &amp;
          <br className="hidden sm:inline" />
          <span className="block mt-0.5 sm:mt-0 font-normal italic text-gray-100">Hospitality</span>
        </h1>

        {/* Italic White Subtitle */}
        <p className="font-serif italic text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200 tracking-wide max-w-2xl font-light px-2">
          &quot;Where Every Moment Becomes a Memory&quot;
        </p>

        {/* Hero Service Cards Row - Responsive across iPhone, Samsung, iPad & Desktop */}
        <div className="w-full max-w-4xl pt-4 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          {/* Card 1: Restaurant */}
          <Link
            href="/restaurant"
            className="group relative bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#C9A23A] rounded-xl p-3.5 sm:p-5 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3.5 sm:gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:bg-black/65 shadow-xl active:scale-[0.98]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#741B2A]/80 border border-[#C9A23A]/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
              <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left sm:text-center">
              <h3 className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-[#C9A23A] transition-colors leading-snug">
                Restaurant
              </h3>
              <span className="text-[11px] sm:text-xs text-gray-300 font-sans tracking-wider uppercase font-light block">
                Fine Dining
              </span>
            </div>
          </Link>

          {/* Card 2: Hotel Rooms */}
          <Link
            href="/hotel-rooms"
            className="group relative bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#C9A23A] rounded-xl p-3.5 sm:p-5 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3.5 sm:gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:bg-black/65 shadow-xl active:scale-[0.98]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#741B2A]/80 border border-[#C9A23A]/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
              <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left sm:text-center">
              <h3 className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-[#C9A23A] transition-colors leading-snug">
                Hotel Rooms
              </h3>
              <span className="text-[11px] sm:text-xs text-gray-300 font-sans tracking-wider uppercase font-light block">
                Luxury Accommodation
              </span>
            </div>
          </Link>

          {/* Card 3: Function Hall */}
          <Link
            href="/function-hall"
            className="group relative bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#C9A23A] rounded-xl p-3.5 sm:p-5 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3.5 sm:gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:bg-black/65 shadow-xl active:scale-[0.98]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#741B2A]/80 border border-[#C9A23A]/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
              <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left sm:text-center">
              <h3 className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-[#C9A23A] transition-colors leading-snug">
                Function Hall
              </h3>
              <span className="text-[11px] sm:text-xs text-gray-300 font-sans tracking-wider uppercase font-light block">
                Event Spaces
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Hero Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center justify-center pb-2 cursor-pointer" onClick={scrollToServices}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A23A] font-semibold mb-1">
          SCROLL
        </span>
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#C9A23A] rounded-full animate-bounce-slow" />
        </div>
        <ChevronDown className="w-4 h-4 text-white/60 -mt-1 animate-bounce" />
      </div>
    </section>
  );
};
