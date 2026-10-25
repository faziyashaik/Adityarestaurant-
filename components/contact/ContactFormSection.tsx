'use client';

import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `*CONTACT INQUIRY - ADITYA HOSPITALITY*

*Full Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
${formData.email ? `*Email Address:* ${formData.email}\n` : ''}*Inquiry Type:* ${formData.inquiryType}
*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl font-bold text-[#741B2A]">
          Send Us a Message
        </h2>
        <p className="text-xs text-gray-500 font-sans">
          Have a question or feedback? Reach out to our management directly on WhatsApp.
        </p>
        <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Full Name & Mobile */}
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

        {/* Row 2: Email & Inquiry Type */}
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
              Inquiry Type <span className="text-red-500">*</span>
            </label>
            <select
              name="inquiryType"
              required
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Restaurant Reservation">Restaurant Reservation</option>
              <option value="Hotel Room Stay">Hotel Room Stay</option>
              <option value="Function Hall Booking">Function Hall Booking</option>
              <option value="Outdoor Catering">Outdoor Catering</option>
            </select>
          </div>
        </div>

        {/* Row 3: Message */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Type your message or inquiry here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
          />
        </div>

        {/* Row 4: Submit Button */}
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
  );
};
