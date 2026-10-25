'use client';

import React, { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getRooms } from '@/services/roomsApi';
import { RoomType } from '@/lib/store';

export const BookYourStaySection: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
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

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      if (data && data.length > 0) {
        setRooms(data);
      }
    } catch {
      // Fallback to initial
    }
  };

  useEffect(() => {
    loadRooms();
    const intervalId = setInterval(loadRooms, 3000);

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel('aditya_room_updates');
      channel.onmessage = (event) => {
        if (event.data === 'room_updated') {
          loadRooms();
        }
      };
    }

    return () => {
      clearInterval(intervalId);
      if (channel) channel.close();
    };
  }, []);

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
    <section id="book-your-stay-section" className="py-12 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-2xl mx-auto px-4">
        {/* Card Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Top Burgundy Banner */}
          <div className="bg-[#5F1624] text-white py-8 px-6 text-center space-y-1.5 border-b border-[#C9A23A]/30">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#C9A23A] tracking-tight">
              Book Your Stay
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 font-sans">
              Experience comfort and luxury.
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

            {/* Row 2: Email & Select Room Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                />
              </div>

              <div>
                <select
                  name="roomType"
                  required
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                >
                  {rooms.length > 0 ? (
                    rooms.map((r) => (
                      <option key={r.id} value={`${r.title} (₹${r.basePricePerNight})`}>
                        {r.title} (₹{r.basePricePerNight})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Standard AC Room (₹1100)">Standard AC Room (₹1100)</option>
                      <option value="Deluxe AC Room (₹1800)">Deluxe AC Room (₹1800)</option>
                      <option value="Suite Room (₹2800)">Suite Room (₹2800)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Row 3: Check-In Date & Check-Out Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Check-In Date *
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  required
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Check-Out Date *
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  required
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                />
              </div>
            </div>

            {/* Row 4: Number of Guests */}
            <div>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                required
                placeholder="Number of Guests *"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
              />
            </div>

            {/* Row 5: Any Special Requirements */}
            <div>
              <textarea
                name="specialRequirements"
                rows={3}
                placeholder="Any special requirements?"
                value={formData.specialRequirements}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
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
    </section>
  );
};
