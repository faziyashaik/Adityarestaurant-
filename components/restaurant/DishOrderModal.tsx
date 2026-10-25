'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export interface OrderDishItem {
  id?: string;
  name: string;
  description?: string;
}

interface DishOrderModalProps {
  dish: OrderDishItem | null;
  onClose: () => void;
}

export const DishOrderModal: React.FC<DishOrderModalProps> = ({ dish, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!trimmedPhone) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }

    const safeQuantity = quantity > 0 ? quantity : 1;
    const specialNotesText = notes.trim() ? notes.trim() : 'None';

    setIsSubmitting(true);

    const message = `*ORDER ENQUIRY - ADITYA RESTAURANT*\n\n*Dish Name:* ${dish.name}\n*Customer Name:* ${trimmedName}\n*Mobile Number:* ${trimmedPhone}\n*Quantity:* ${safeQuantity} portion(s)\n*Special Notes:* ${specialNotesText}\n\nHello Aditya Restaurant, please confirm the availability and order details. Thank you!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    // Reset form & close modal after triggering WhatsApp launch
    setTimeout(() => {
      setName('');
      setPhone('');
      setQuantity(1);
      setNotes('');
      setIsSubmitting(false);
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#C9A23A]/40 shadow-2xl p-5 sm:p-8 max-h-[90dvh] overflow-y-auto my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close order modal"
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-[#741B2A] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-[#C9A23A] uppercase tracking-widest">
              DISH ORDER ENQUIRY
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#741B2A] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#741B2A]" />
              {dish.name}
            </h3>
            {dish.description && (
              <p className="text-xs text-gray-600 leading-relaxed">{dish.description}</p>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 99630 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Quantity (Portions)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Special Notes / Dietary Request
              </label>
              <textarea
                rows={2}
                placeholder="Spice level, extra sauce, timing..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#741B2A] hover:bg-[#5F1624] text-white font-semibold text-sm rounded-xl shadow-md transition-colors border border-[#C9A23A]/40 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>{isSubmitting ? 'Opening WhatsApp...' : 'Submit Order Enquiry'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
