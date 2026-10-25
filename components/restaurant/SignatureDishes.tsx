'use client';

import React, { useState, useEffect } from 'react';
import { SIGNATURE_DISHES } from '@/lib/data';
import { SignatureDish } from '@/types';
import { SignatureDishCarousel } from './SignatureDishCarousel';
import { DishOrderModal } from './DishOrderModal';
import { getMenuItems } from '@/services/menuApi';

export const SignatureDishes: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<SignatureDish | null>(null);
  const [dishes, setDishes] = useState<SignatureDish[]>(SIGNATURE_DISHES);

  useEffect(() => {
    const syncLivePrices = async () => {
      try {
        const liveItems = await getMenuItems();
        if (liveItems && liveItems.length > 0) {
          // Update prices of signature dishes from live MongoDB / API menu store
          setDishes((prev) =>
            prev.map((sig) => {
              const matched = liveItems.find(
                (item) => item.name.toLowerCase().trim() === sig.name.toLowerCase().trim()
              );
              if (matched) {
                return { ...sig, price: matched.price };
              }
              return sig;
            })
          );
        }
      } catch {
        // Fallback to initial signature dishes array
      }
    };

    syncLivePrices();

    // Background polling every 3 seconds for signature dish price updates
    const intervalId = setInterval(syncLivePrices, 3000);

    // BroadcastChannel listener for same-browser instant sync
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel('aditya_menu_updates');
      channel.onmessage = (event) => {
        if (event.data === 'menu_updated') {
          syncLivePrices();
        }
      };
    }

    return () => {
      clearInterval(intervalId);
      if (channel) {
        channel.close();
      }
    };
  }, []);

  return (
    <section className="py-16 bg-[#F7F3ED] text-[#1E1E1E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-10">
        {/* MUST TRY Small Gold Label */}
        <span className="text-[#C9A23A] text-xs font-sans font-bold uppercase tracking-[0.3em] block">
          MUST TRY
        </span>

        {/* Large Burgundy Serif Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#741B2A] tracking-tight">
          Our Signature Dishes
        </h2>

        {/* Short Gold Horizontal Divider */}
        <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full my-2" />

        {/* Centered Description */}
        <p className="text-gray-700 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Experience our chef&apos;s finest creations, hand-picked and highly recommended by our guests.
        </p>
      </div>

      {/* Horizontal Carousel with Live Synced Prices */}
      <SignatureDishCarousel dishes={dishes} onOrderClick={setSelectedDish} />

      {/* Order Modal */}
      {selectedDish && (
        <DishOrderModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
};
