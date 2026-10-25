'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag } from 'lucide-react';
import { getActiveOffers } from '@/services/offersApi';
import { OfferType } from '@/lib/store';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const PublicOfferModal: React.FC = () => {
  const [activeOffers, setActiveOffers] = useState<OfferType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Session dismissal check
    const isDismissed =
      typeof window !== 'undefined' && sessionStorage.getItem('aditya_offer_dismissed');
    if (isDismissed) return;

    const fetchOffers = async () => {
      try {
        const offers = await getActiveOffers();
        if (offers && offers.length > 0) {
          setActiveOffers(offers);
          // Open automatically shortly after website load
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 1200);
          return () => clearTimeout(timer);
        }
      } catch {
        // Handle fetch error silently
      }
    };

    fetchOffers();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aditya_offer_dismissed', 'true');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || activeOffers.length === 0) return null;

  const isMultiple = activeOffers.length > 1;

  const getWhatsAppUrl = (title: string, price: number) => {
    const message = `*OFFER ENQUIRY - ADITYA HOSPITALITY*\n\nHello, I am interested in the offer: *${title}* (Offer Price: ₹${price}). Please confirm availability!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="public-offer-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          isMultiple
            ? activeOffers.length === 2
              ? 'max-w-4xl'
              : 'max-w-6xl'
            : 'max-w-[380px]'
        } flex flex-col my-auto`}
      >
        {/* Top Header Bar when multiple offers exist */}
        {isMultiple && (
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/20 text-white">
            <div className="space-y-0.5">
              <span className="text-[#C9A23A] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] block">
                SPECIAL PROMOTIONS
              </span>
              <h2
                id="public-offer-title"
                className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight"
              >
                Exclusive Offers For You
              </h2>
            </div>

            {/* Prominent Modal Close Button */}
            <button
              onClick={handleClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#741B2A] transition-all flex items-center justify-center border border-white/30 shadow-lg cursor-pointer flex-shrink-0"
              aria-label="Close offers popup"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* Side-by-Side Offers Grid */}
        <div
          className={`grid ${
            isMultiple
              ? activeOffers.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          } gap-4 sm:gap-6 max-h-[82dvh] overflow-y-auto p-1`}
        >
          {activeOffers.map((offer) => {
            const whatsappUrl = getWhatsAppUrl(offer.title, offer.discountPrice);

            return (
              <div
                key={offer.id}
                className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A23A]/40 flex flex-col justify-between text-center transition-all duration-300 hover:shadow-[#C9A23A]/20 hover:scale-[1.01]"
              >
                {/* Single Offer Close Button (only displayed when there is just 1 offer) */}
                {!isMultiple && (
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 text-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                    aria-label="Close offer"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}

                {/* Offer Image Header */}
                <div className="relative h-48 sm:h-52 w-full bg-gray-100">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Gold Badge */}
                    <div className="inline-block bg-[#E8B923] text-[#3A2A00] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      LIMITED TIME OFFER
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1B16] tracking-tight">
                      {offer.title}
                    </h3>

                    {/* Price Row */}
                    <div className="flex items-baseline justify-center gap-3 pt-1">
                      {offer.originalPrice > offer.discountPrice && (
                        <span className="line-through text-gray-400 font-serif text-lg">
                          ₹{offer.originalPrice}
                        </span>
                      )}
                      <span className="font-serif text-3xl font-bold text-[#1E7D34]">
                        ₹{offer.discountPrice}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed font-sans px-1">
                      {offer.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#741B2A] hover:bg-[#5F1624] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-[#C9A23A]/40 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order Now via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
