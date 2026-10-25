'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookingForm } from '@/components/booking/BookingForm';
import { ServiceType } from '@/types';

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') as ServiceType | null;
  const initialService: ServiceType = serviceParam || 'restaurant';

  return (
    <div className="pt-24 pb-20 bg-[#F7F3ED] text-[#1E1E1E]">
      {/* Header Banner */}
      <div className="bg-[#5F1624] text-white py-16 px-4 mb-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
            RESERVATIONS &amp; INQUIRIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Book Now
          </h1>
          <p className="font-serif italic text-lg text-gray-200">
            &quot;Select your service and submit your details. Our manager will get back to you promptly.&quot;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm initialService={initialService} />
      </div>
    </div>
  );
}

export default function BookNowPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F3ED] pt-32 text-center text-[#741B2A]">Loading reservation form...</div>}>
      <BookingContent />
    </Suspense>
  );
}
