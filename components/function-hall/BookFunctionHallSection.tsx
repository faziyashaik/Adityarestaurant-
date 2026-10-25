'use client';

import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const BookFunctionHallSection: React.FC = () => {
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

  return (
    <section id="book-function-hall-section" className="py-12 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-2xl mx-auto px-4">
        {/* Card Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Top Burgundy Banner */}
          <div className="bg-[#5F1624] text-white py-8 px-6 text-center space-y-1.5 border-b border-[#C9A23A]/30">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#C9A23A] tracking-tight">
              Book a Function Hall
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 font-sans">
              Let&apos;s make your event grand and memorable.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {/* Row 1: Full Name & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Mobile Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 2: Select Hall Type & Select Event Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <select
                  name="hallType"
                  required
                  value={formData.hallType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                >
                  <option value="Mini Function Hall (1-30 Guests)">Mini Function Hall (1-30 Guests)</option>
                  <option value="Main Function Hall (1-300 Guests)">Main Function Hall (1-300 Guests)</option>
                </select>
              </div>

              <div>
                <select
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
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
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Expected Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max="300"
                  required
                  placeholder="Guests Count"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 4: Additional Requirements */}
            <div>
              <textarea
                name="specialRequirements"
                rows={3}
                placeholder="Additional requirements (decorations, seating arrangement, etc.)"
                value={formData.specialRequirements}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
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
    </section>
  );
};
