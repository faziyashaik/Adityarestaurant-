'use client';

import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface TableData {
  number: number;
  label: string;
  capacity: string;
  type: 'small' | 'medium' | 'large';
}

const TABLES: TableData[] = [
  { number: 1, label: 'T1', capacity: '2-4', type: 'small' },
  { number: 2, label: 'T2', capacity: '2-4', type: 'small' },
  { number: 3, label: 'T3', capacity: '2-4', type: 'small' },
  { number: 4, label: 'T4', capacity: '2-4', type: 'small' },
  { number: 5, label: 'T5', capacity: '2-4', type: 'small' },
  { number: 6, label: 'T6', capacity: '5-6', type: 'medium' },
  { number: 7, label: 'T7', capacity: '2-4', type: 'small' },
  { number: 8, label: 'T8', capacity: '2-4', type: 'small' },
  { number: 9, label: 'T9', capacity: '5-6', type: 'medium' },
  { number: 10, label: 'T10', capacity: '2-4', type: 'small' },
  { number: 11, label: 'T11', capacity: '2-4', type: 'small' },
  { number: 12, label: 'T12', capacity: '2-4', type: 'small' },
  { number: 13, label: 'T13', capacity: '10-30', type: 'large' },
  { number: 14, label: 'T14', capacity: '10-30', type: 'large' },
  { number: 15, label: 'T15', capacity: '10-30', type: 'large' },
  { number: 16, label: 'T16', capacity: '10-30', type: 'large' },
];

export const TablesAndBookingSection: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    time: '01:00 PM',
    date: '',
    guests: '4',
    specialRequests: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableClick = (tableNumber: number) => {
    if (selectedTable === tableNumber) {
      setSelectedTable(null);
    } else {
      setSelectedTable(tableNumber);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedTableObj = TABLES.find((t) => t.number === selectedTable);
    const tableText = selectedTableObj
      ? `\n*Table Preferred:* ${selectedTableObj.label} (${selectedTableObj.capacity} guests)`
      : '';

    const message = `*TABLE RESERVATION REQUEST - ADITYA RESTAURANT*

*Full Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
${formData.email ? `*Email:* ${formData.email}\n` : ''}*Reservation Date:* ${formData.date}
*Time:* ${formData.time}
*Number of Guests:* ${formData.guests}${tableText}
${formData.specialRequests ? `*Special Requests:* ${formData.specialRequests}` : ''}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getTableStyle = (table: TableData) => {
    const isSelected = selectedTable === table.number;
    let baseColor = '';

    if (table.type === 'small') {
      baseColor = isSelected
        ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-400'
        : 'bg-emerald-100/70 text-emerald-800 border-emerald-300 hover:bg-emerald-200';
    } else if (table.type === 'medium') {
      baseColor = isSelected
        ? 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-400'
        : 'bg-blue-100/70 text-blue-800 border-blue-300 hover:bg-blue-200';
    } else {
      baseColor = isSelected
        ? 'bg-purple-500 text-white border-purple-600 ring-2 ring-purple-400'
        : 'bg-purple-100/70 text-purple-800 border-purple-300 hover:bg-purple-200';
    }

    return baseColor;
  };

  return (
    <section id="our-tables-section" className="py-16 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Our Tables */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
                SEATING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Our Tables
              </h2>
            </div>

            {/* Category Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-700 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Small (2-4)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span>Medium (5-6)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                <span>Large (10-30)</span>
              </div>
            </div>

            {/* 16 Table Layout Grid (Responsive 4 columns on mobile, 8 on tablet/desktop) */}
            <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-5 border border-[#EBE3D7] shadow-xs space-y-4">
              {/* Row 1: T1 to T8 */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2 text-center">
                {TABLES.slice(0, 8).map((table) => (
                  <button
                    key={table.number}
                    type="button"
                    onClick={() => handleTableClick(table.number)}
                    title={`Table ${table.number} (${table.capacity} guests)`}
                    className={`py-2 px-1 rounded-full border transition-all flex flex-col items-center justify-center cursor-pointer ${getTableStyle(
                      table
                    )}`}
                  >
                    <span className="font-bold text-xs sm:text-sm">{table.label}</span>
                    <span className="text-[9px] sm:text-[10px] opacity-80">{table.capacity}</span>
                  </button>
                ))}
              </div>

              {/* Row 2: T9 to T16 */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2 text-center">
                {TABLES.slice(8, 16).map((table) => (
                  <button
                    key={table.number}
                    type="button"
                    onClick={() => handleTableClick(table.number)}
                    title={`Table ${table.number} (${table.capacity} guests)`}
                    className={`py-2 px-1 rounded-full border transition-all flex flex-col items-center justify-center cursor-pointer ${getTableStyle(
                      table
                    )}`}
                  >
                    <span className="font-bold text-xs sm:text-sm">{table.label}</span>
                    <span className="text-[9px] sm:text-[10px] opacity-80">{table.capacity}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              16 tables available. Reserve yours using the booking form.
              {selectedTable && (
                <span className="block mt-1 font-semibold text-[#741B2A]">
                  Selected: Table T{selectedTable} ({TABLES.find((t) => t.number === selectedTable)?.capacity} guests)
                </span>
              )}
            </p>
          </div>

          {/* RIGHT COLUMN: Book a Table Form */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
                RESERVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A] tracking-tight">
                Book a Table
              </h2>
            </div>

            {/* White Form Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200">
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
                      placeholder="Your name"
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

                {/* Row 2: Email & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email (optional)
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
                      Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
                    >
                      <option value="11:30 AM">11:30 AM (Lunch)</option>
                      <option value="12:30 PM">12:30 PM (Lunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="02:30 PM">02:30 PM (Lunch)</option>
                      <option value="07:30 PM">07:30 PM (Dinner)</option>
                      <option value="08:30 PM">08:30 PM (Dinner)</option>
                      <option value="09:30 PM">09:30 PM (Dinner)</option>
                      <option value="10:00 PM">10:00 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Reservation Date & Number of Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Reservation Date <span className="text-red-500">*</span>
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
                      Number of Guests <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      max="30"
                      required
                      placeholder="e.g. 4"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Row 4: Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    rows={3}
                    placeholder="Tell us more..."
                    value={formData.specialRequests}
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
