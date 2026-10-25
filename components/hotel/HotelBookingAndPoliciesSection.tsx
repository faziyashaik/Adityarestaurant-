'use client';

import React, { useState } from 'react';
import { Clock, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CONTACT_INFO, WHATSAPP_NUMBER } from '@/lib/constants';

export const HotelBookingAndPoliciesSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roomType: 'Standard AC Room',
    checkInDate: '',
    checkOutDate: '',
    guests: '2',
    specialRequirements: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*HOTEL ROOM BOOKING REQUEST - ADITYA HOSPITALITY*

*Full Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
${formData.email ? `*Email Address:* ${formData.email}\n` : ''}*Room Type:* ${formData.roomType}
*Check-In Date:* ${formData.checkInDate}
*Check-Out Date:* ${formData.checkOutDate}
*Number of Guests:* ${formData.guests}
${formData.specialRequirements ? `*Special Requirements:* ${formData.specialRequirements}` : ''}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="hotel-booking-policies" className="py-10 sm:py-16 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Hotel Policies & Stay Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
                POLICIES &amp; TIMINGS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Stay Information
              </h2>
            </div>

            {/* Policies White Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-200 space-y-6">
              {/* Check-in / Check-out Times */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#F7F3ED] text-[#741B2A] flex items-center justify-center flex-shrink-0 border border-[#C9A23A]/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#741B2A]">
                      Check-in &amp; Check-out Timings
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-1.5 text-xs text-gray-700">
                      <div>
                        <span className="text-gray-500 block text-[11px]">Check-in</span>
                        <span className="font-semibold text-gray-900">{CONTACT_INFO.checkInTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[11px]">Check-out</span>
                        <span className="font-semibold text-gray-900">{CONTACT_INFO.checkOutTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ID Requirement */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#F7F3ED] text-[#741B2A] flex items-center justify-center flex-shrink-0 border border-[#C9A23A]/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#741B2A]">
                      Guest Identification Policy
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Valid government ID (Aadhaar, Passport, Driving License) is mandatory for all adult guests at check-in.
                    </p>
                  </div>
                </div>

                {/* Included Hospitality Highlights */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F7F3ED] text-[#741B2A] flex items-center justify-center flex-shrink-0 border border-[#C9A23A]/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#741B2A]">
                      Hospitality Amenities Included
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>100% AC Rooms</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Free High-Speed WiFi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Ample Parking</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>24/7 Hot Water</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Book Your Stay Form */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
                RESERVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Book Your Stay
              </h2>
            </div>

            {/* White Form Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Full Name & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Select Room Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Select Room Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="roomType"
                      required
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    >
                      <option value="Standard AC Room">Standard AC Room (₹1100)</option>
                      <option value="Deluxe AC Room">Deluxe AC Room (₹1800)</option>
                      <option value="Suite Room">Suite Room (₹2800)</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Check-In Date & Check-Out Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Check-In Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="checkInDate"
                      required
                      value={formData.checkInDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Check-Out Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="checkOutDate"
                      required
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    />
                  </div>
                </div>

                {/* Row 4: Number of Guests */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Number of Guests <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    max="10"
                    required
                    placeholder="e.g. 2"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                  />
                </div>

                {/* Row 5: Any Special Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Any Special Requirements?
                  </label>
                  <textarea
                    name="specialRequirements"
                    rows={3}
                    placeholder="Tell us more..."
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                  />
                </div>

                {/* Row 6: Proceed to WhatsApp Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#741B2A] hover:bg-[#5F1624] text-white font-semibold rounded-xl text-base shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] border border-[#C9A23A]/30"
                  >
                    Proceed to WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
