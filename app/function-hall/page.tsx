import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { AlertCircle, Check } from 'lucide-react';
import { FunctionHallGallery } from '@/components/function-hall/FunctionHallGallery';
import { BookFunctionHallAndEventsSection } from '@/components/function-hall/BookFunctionHallAndEventsSection';

export const metadata: Metadata = {
  title: 'Grand Function Hall',
  description:
    'Host your events with us. Capacities from mini gatherings (1-30) up to main function hall (1-300 guests) in Kandukur.',
};

export default function FunctionHallPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F3ED] text-[#1E1E1E]">
      {/* Page Header Banner */}
      <div className="relative bg-[#5F1624] text-white py-16 px-4 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/function-hall/FunctionHall1.jpg"
            alt="Function Hall Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
            GRAND VENUES FOR EVERY CELEBRATION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Grand Function Hall
          </h1>
          <p className="font-serif italic text-lg text-gray-200 max-w-2xl mx-auto">
            &quot;Celebrate in Style — Capacities ranging from intimate gatherings to 300 guests.&quot;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Soft Integrated Notice Callout Pill */}
        <div className="bg-[#FDF8EC] border border-[#C9A23A]/50 text-[#741B2A] rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm shadow-xs -mt-4">
          <AlertCircle className="w-4 h-4 text-[#741B2A] flex-shrink-0" />
          <span>
            Food services are <strong className="font-bold underline">NOT</strong> included with function hall booking. Catering can be arranged separately.
          </span>
        </div>

        {/* SECTION 1: OUR VENUES */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
              OUR VENUES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
              Event Spaces &amp; Capacity
            </h2>
            <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
          </div>

          {/* 2 Venues Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Mini Function Hall */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-60 sm:h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                  src="/images/function-hall/FunctionHall3.png"
                  alt="Mini Function Hall"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">Mini Function Hall</h3>
                  <span className="bg-[#C9A23A] text-gray-900 text-xs font-semibold px-2.5 py-0.5 rounded-md inline-block">
                    1 to 30 Guests
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#741B2A] mb-1">
                      Perfect For:
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-sans">
                      Small gatherings, meetings, intimate celebrations
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#741B2A] mb-2">
                      Amenities Included:
                    </h4>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-gray-700">
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>AC</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Parking</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>WiFi</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Comfortable Seating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Main Function Hall */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-60 sm:h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                  src="/images/function-hall/FunctionHall1.jpg"
                  alt="Main Function Hall"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">Main Function Hall</h3>
                  <span className="bg-[#C9A23A] text-gray-900 text-xs font-semibold px-2.5 py-0.5 rounded-md inline-block">
                    1 to 300 Guests
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#741B2A] mb-1">
                      Perfect For:
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-sans">
                      Weddings, Engagements, Birthdays, Corporate Events
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#741B2A] mb-2">
                      Amenities Included:
                    </h4>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-gray-700">
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>AC</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Parking</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>WiFi</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Large Event Space</span>
                      </div>
                      <div className="flex items-center space-x-1.5 col-span-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Stage Area</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: FUNCTION HALL GALLERY (4 Images 2x2 Grid) */}
        <FunctionHallGallery />

        {/* SECTION 3: EVENTS WE HOST & BOOK A FUNCTION HALL (2-Column Unified Section) */}
        <BookFunctionHallAndEventsSection />
      </div>
    </div>
  );
}
