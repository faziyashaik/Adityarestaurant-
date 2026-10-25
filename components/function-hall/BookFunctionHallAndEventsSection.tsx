'use client';

import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const BookFunctionHallAndEventsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hallType: 'Mini Function Hall (1-30 Guests)',
    eventType: 'Wedding / Reception',
    eventDate: '',
    guests: '',
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

    const message = `*FUNCTION HALL BOOKING ENQUIRY - ADITYA HOSPITALITY*

*Full Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
*Selected Hall:* ${formData.hallType}
*Event Type:* ${formData.eventType}
*Event Date:* ${formData.eventDate}
*Expected Guests:* ${formData.guests}
${formData.specialRequirements ? `*Additional Requirements:* ${formData.specialRequirements}` : ''}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const hostedEvents = [
    { title: 'Weddings & Receptions', icon: '👩‍❤️‍👨', desc: 'Grand celebrations & intimate rituals' },
    { title: 'Engagements', icon: '💍', desc: 'Ring ceremonies & family meets' },
    { title: 'Birthdays & Milestones', icon: '🎂', desc: 'Memorable birthday bashes' },
    { title: 'Corporate Events', icon: '💼', desc: 'Conferences, seminars & meetings' },
    { title: 'Family Functions', icon: '👨‍👩‍👧‍👦', desc: 'Anniversaries, baby showers & reunions' },
    { title: 'All Celebrations', icon: '🎉', desc: 'Custom party & gathering setups' },
  ];

  return (
    <section id="function-hall-booking-events" className="py-10 sm:py-16 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Events We Host & Hall Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
                CELEBRATE WITH US
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Events We Host
              </h2>
            </div>

            {/* Events We Host White Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-200 space-y-6">
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Our versatile air-conditioned event spaces are equipped to host a wide spectrum of grand and intimate occasions with complete comfort.
              </p>

              {/* Event Types List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hostedEvents.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#F7F3ED]/70 border border-[#C9A23A]/20">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#741B2A]">{item.title}</h4>
                      <p className="text-[11px] text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Venue Highlights */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#741B2A]">
                  Venue Amenities Included
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>100% AC Venues</span>
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
                    <span>Stage &amp; Lighting</span>
                  </div>
                </div>
              </div>

              {/* Catering Note */}
              <div className="p-3.5 rounded-xl bg-[#741B2A]/5 border border-[#741B2A]/20 text-xs text-[#741B2A] flex items-center justify-between gap-2">
                <span className="leading-snug">
                  Food services not included in venue booking. Need catering?
                </span>
                <Link
                  href="/catering"
                  className="px-3 py-1.5 bg-[#741B2A] text-white text-[11px] font-semibold rounded-lg hover:bg-[#5F1624] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Explore Catering
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Book a Function Hall Form */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
                RESERVE VENUE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Book a Function Hall
              </h2>
            </div>

            {/* White Form Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              {/* Top Burgundy Banner */}
              <div className="bg-[#5F1624] text-white py-6 px-6 text-center space-y-1 border-b border-[#C9A23A]/30">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#C9A23A] tracking-tight">
                  Book a Function Hall
                </h3>
                <p className="text-xs text-gray-200 font-sans">
                  Let&apos;s make your event grand and memorable.
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4">
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

                {/* Row 2: Select Hall Type & Select Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Select Hall Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="hallType"
                      required
                      value={formData.hallType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    >
                      <option value="Mini Function Hall (1-30 Guests)">Mini Function Hall (1-30 Guests)</option>
                      <option value="Main Function Hall (1-300 Guests)">Main Function Hall (1-300 Guests)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Select Event Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    >
                      <option value="Wedding / Reception">Wedding / Reception</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Family Function">Family Function</option>
                      <option value="Other">Other Celebration</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Event Date & Expected Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Expected Guests <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      max="300"
                      required
                      placeholder="e.g. 150"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Row 4: Additional Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    name="specialRequirements"
                    rows={3}
                    placeholder="Additional requirements (decorations, seating arrangement, etc.)"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                  />
                </div>

                {/* Row 5: Proceed to WhatsApp Button */}
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
