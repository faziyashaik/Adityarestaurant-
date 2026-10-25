'use client';

import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const CateringQuoteSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Weddings & Receptions',
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

    const message = `*OUTDOOR CATERING QUOTE REQUEST - ADITYA HOSPITALITY*

*Full Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
*Event Type:* ${formData.eventType}
*Event Date:* ${formData.eventDate}
*Expected Guests:* ${formData.guests}
${formData.specialRequirements ? `*Menu Requirements / Message:* ${formData.specialRequirements}` : ''}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="catering-quote-section" className="py-12 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Outdoor Catering Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Outdoor Catering
              </h2>
              <div className="w-16 h-1 bg-[#C9A23A] rounded-full mt-3 mb-4" />
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-sans">
              Make your special occasions memorable with our premium catering services. We offer both Veg and Non-Veg catering tailored to your specific requirements and budget.
            </p>

            {/* Bullet List Matching Screenshot 3 */}
            <div className="space-y-2.5 text-sm font-semibold text-gray-800 font-sans pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Weddings &amp; Receptions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Corporate Events</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Birthday Parties</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A23A] text-lg">•</span>
                <span>Family Functions</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Request a Quote Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-200 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#741B2A] tracking-tight">
                Request a Quote
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Mobile"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Row 2: Event Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Event Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    >
                      <option value="Weddings & Receptions">Weddings &amp; Receptions</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Birthday Parties">Birthday Parties</option>
                      <option value="Family Functions">Family Functions</option>
                      <option value="Other">Other Celebration</option>
                    </select>
                  </div>

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
                </div>

                {/* Row 3: Expected Guests */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Expected Guests <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    required
                    placeholder="Expected Guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                  />
                </div>

                {/* Row 4: Any specific menu requirements or message? */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Any specific menu requirements or message?
                  </label>
                  <textarea
                    name="specialRequirements"
                    rows={3}
                    placeholder="Any specific menu requirements or message?"
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
