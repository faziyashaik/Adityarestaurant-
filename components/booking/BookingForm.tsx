'use client';

import React, { useState } from 'react';
import { Bed, Calendar, Clock, PartyPopper, Users, Utensils } from 'lucide-react';
import { BookingFormData, ServiceType } from '@/types';
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface BookingFormProps {
  initialService?: ServiceType;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialService = 'restaurant' }) => {
  const [service, setService] = useState<ServiceType>(initialService);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceRequired: initialService,
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '12:00 PM',
    guests: 2,
    checkOutDate: '',
    roomCategory: 'Standard AC Room (₹1100)',
    hallPreference: 'Main Function Hall (1–300 Guests)',
    cateringType: 'Both',
    specialRequirements: '',
  });

  const handleServiceChange = (newService: ServiceType) => {
    setService(newService);
    setFormData((prev) => ({ ...prev, serviceRequired: newService }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let serviceTitle = 'RESERVATION';
    let details = '';

    if (service === 'restaurant') {
      serviceTitle = 'RESTAURANT TABLE RESERVATION';
      details = `*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Guests:* ${formData.guests}`;
    } else if (service === 'hotel') {
      serviceTitle = 'HOTEL ROOM BOOKING';
      details = `*Check-In Date:* ${formData.date}\n*Check-Out Date:* ${formData.checkOutDate}\n*Room Category:* ${formData.roomCategory}`;
    } else if (service === 'function-hall') {
      serviceTitle = 'FUNCTION HALL BOOKING';
      details = `*Event Date:* ${formData.date}\n*Expected Guests:* ${formData.guests}\n*Hall Preference:* ${formData.hallPreference}`;
    } else if (service === 'catering') {
      serviceTitle = 'OUTDOOR CATERING QUOTE';
      details = `*Event Date:* ${formData.date}\n*Expected Guests:* ${formData.guests}\n*Catering Preference:* ${formData.cateringType}`;
    }

    const message = `*${serviceTitle} - ADITYA HOSPITALITY*

*Full Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
${formData.email ? `*Email Address:* ${formData.email}\n` : ''}${details}
${formData.specialRequirements ? `*Special Requirements / Message:* ${formData.specialRequirements}` : ''}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-4 sm:p-8 max-w-3xl mx-auto">
      {/* Service Selection Tabs */}
      <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#741B2A] mb-3">
          Select Service Required
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleServiceChange('restaurant')}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 border transition-all ${
              service === 'restaurant'
                ? 'bg-[#741B2A] text-white border-[#741B2A] shadow-md'
                : 'bg-[#F7F3ED] text-gray-700 border-gray-200 hover:border-[#C9A23A]'
            }`}
          >
            <Utensils className="w-4 h-4 flex-shrink-0" />
            <span>Restaurant</span>
          </button>

          <button
            type="button"
            onClick={() => handleServiceChange('hotel')}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 border transition-all ${
              service === 'hotel'
                ? 'bg-[#741B2A] text-white border-[#741B2A] shadow-md'
                : 'bg-[#F7F3ED] text-gray-700 border-gray-200 hover:border-[#C9A23A]'
            }`}
          >
            <Bed className="w-4 h-4 flex-shrink-0" />
            <span>Hotel Room</span>
          </button>

          <button
            type="button"
            onClick={() => handleServiceChange('function-hall')}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 border transition-all ${
              service === 'function-hall'
                ? 'bg-[#741B2A] text-white border-[#741B2A] shadow-md'
                : 'bg-[#F7F3ED] text-gray-700 border-gray-200 hover:border-[#C9A23A]'
            }`}
          >
            <PartyPopper className="w-4 h-4 flex-shrink-0" />
            <span>Function Hall</span>
          </button>

          <button
            type="button"
            onClick={() => handleServiceChange('catering')}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 border transition-all ${
              service === 'catering'
                ? 'bg-[#741B2A] text-white border-[#741B2A] shadow-md'
                : 'bg-[#F7F3ED] text-gray-700 border-gray-200 hover:border-[#C9A23A]'
            }`}
          >
            <Utensils className="w-4 h-4 flex-shrink-0" />
            <span>Catering</span>
          </button>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
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

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Dynamic Fields Based on Selected Service */}
        {service === 'restaurant' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#741B2A]" /> Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#741B2A]" /> Time <span className="text-red-500">*</span>
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              >
                <option value="11:30 AM">Lunch: 11:30 AM</option>
                <option value="01:00 PM">Lunch: 01:00 PM</option>
                <option value="02:30 PM">Lunch: 02:30 PM</option>
                <option value="07:30 PM">Dinner: 07:30 PM</option>
                <option value="09:00 PM">Dinner: 09:00 PM</option>
                <option value="10:00 PM">Dinner: 10:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#741B2A]" /> Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="guests"
                min="1"
                max="30"
                required
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>
          </div>
        )}

        {service === 'hotel' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Check-In Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
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

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Room Category <span className="text-red-500">*</span>
              </label>
              <select
                name="roomCategory"
                value={formData.roomCategory}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              >
                <option value="Standard AC Room (₹1100)">Standard AC Room (₹1100)</option>
                <option value="Deluxe AC Room (₹1800)">Deluxe AC Room (₹1800)</option>
                <option value="Suite Room (₹2800)">Suite Room (₹2800)</option>
              </select>
            </div>
          </div>
        )}

        {service === 'function-hall' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
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
                  placeholder="Expected Guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Hall Preference <span className="text-red-500">*</span>
                </label>
                <select
                  name="hallPreference"
                  value={formData.hallPreference}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                >
                  <option value="Mini Function Hall (1–30 Guests)">Mini Function Hall (1–30 Guests)</option>
                  <option value="Main Function Hall (1–300 Guests)">Main Function Hall (1–300 Guests)</option>
                </select>
              </div>
            </div>

            <div className="bg-[#FDF8EC] border-l-4 border-[#C9A23A] p-2.5 text-xs text-[#741B2A] rounded-r">
              <strong>Note:</strong> Food services are NOT included in Function Hall booking. You can request Catering separately below.
            </div>
          </div>
        )}

        {service === 'catering' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Guest Count <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="guests"
                min="20"
                max="1000"
                required
                placeholder="Expected Guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Catering Preference <span className="text-red-500">*</span>
              </label>
              <select
                name="cateringType"
                value={formData.cateringType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              >
                <option value="Veg">Pure Veg Catering</option>
                <option value="Non-Veg">Non-Veg Catering</option>
                <option value="Both Veg & Non-Veg">Both Veg &amp; Non-Veg</option>
              </select>
            </div>
          </div>
        )}

        {/* Special Requirements */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Additional Notes / Special Requirements
          </label>
          <textarea
            name="specialRequirements"
            rows={3}
            placeholder="Any specific requirements, dietary preferences, or event details..."
            value={formData.specialRequirements}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 placeholder-gray-400 bg-white"
          />
        </div>

        {/* Submit Button */}
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
