import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Check } from 'lucide-react';
import { CateringQuoteSection } from '@/components/catering/CateringQuoteSection';

export const metadata: Metadata = {
  title: 'Outdoor Catering',
  description:
    'Exquisite Veg & Non-Veg outdoor catering for weddings, birthdays, corporate events, and family functions in Kandukur.',
};

export default function CateringPage() {
  const steps = [
    {
      num: 1,
      title: 'Contact Us',
      desc: 'Fill out the enquiry form or ping us on WhatsApp.',
    },
    {
      num: 2,
      title: 'Discuss Menu',
      desc: 'Our team will help you curate the perfect menu.',
    },
    {
      num: 3,
      title: 'Get Quote',
      desc: 'Receive a customized quote based on your requirements.',
    },
    {
      num: 4,
      title: 'Confirm Booking',
      desc: 'Finalize details and let us handle the rest.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F7F3ED] text-[#1E1E1E]">
      {/* Page Header Banner (Matching Screenshot 1) */}
      <div className="relative bg-[#5F1624] text-white py-20 px-4 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop"
            alt="Outdoor Catering Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Outdoor Catering
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-gray-200">
            &quot;Delivering culinary excellence to your doorstep.&quot;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* SECTION 1: HOW IT WORKS (Matching Screenshot 1) */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
              How It Works
            </h2>
            <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
          </div>

          {/* 4 Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#FDF8EC]/70 rounded-2xl p-6 border border-[#C9A23A]/30 shadow-md text-center space-y-3 relative hover:shadow-lg transition-all"
              >
                {/* Number Badge Pill */}
                <div className="w-8 h-8 rounded-full bg-[#741B2A] text-white flex items-center justify-center font-bold text-sm mx-auto shadow-md">
                  {step.num}
                </div>
                <h3 className="font-serif font-bold text-base text-[#741B2A]">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: 3 FEATURE CARDS (Matching Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Catering Includes */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg space-y-4 hover:shadow-xl transition-all">
            <h3 className="font-serif text-xl font-bold text-[#741B2A]">
              Catering Includes
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Veg Catering</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Non-Veg Catering</span>
              </div>
            </div>
          </div>

          {/* Card 2: Available For */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg space-y-4 hover:shadow-xl transition-all">
            <h3 className="font-serif text-xl font-bold text-[#741B2A]">
              Available For
            </h3>
            <div className="space-y-2 text-xs sm:text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Weddings &amp; Engagements</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Birthday Events</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Corporate Events</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Family Functions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>All types of events</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pricing Basis */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg space-y-4 hover:shadow-xl transition-all">
            <h3 className="font-serif text-xl font-bold text-[#741B2A]">
              Pricing Basis
            </h3>
            <div className="space-y-2 text-xs sm:text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Number of guests</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Menu selection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Event requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Custom needs</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: OUTDOOR CATERING & REQUEST A QUOTE (Matching Screenshot 3) */}
        <CateringQuoteSection />
      </div>
    </div>
  );
}
