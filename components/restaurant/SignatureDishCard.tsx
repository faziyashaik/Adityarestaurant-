'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { SignatureDish } from '@/types';

interface SignatureDishCardProps {
  dish: SignatureDish;
  onOrderClick: (dish: SignatureDish) => void;
}

export const SignatureDishCard: React.FC<SignatureDishCardProps> = ({ dish, onOrderClick }) => {
  return (
    <div className="w-[205px] h-[128px] flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-3.5 flex flex-col justify-between group">
      {/* Name and Description */}
      <div className="space-y-1 overflow-hidden">
        <h4 className="font-serif text-sm font-bold text-[#741B2A] tracking-tight leading-snug truncate group-hover:text-[#5F1624]">
          {dish.name}
        </h4>
        <p className="font-sans text-[11px] text-gray-600 leading-tight line-clamp-2">
          {dish.description}
        </p>
      </div>

      {/* Order Now Button */}
      <button
        onClick={() => onOrderClick(dish)}
        className="w-full py-1.5 px-2 bg-[#741B2A] hover:bg-[#8C2234] text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.98] focus:outline-none"
      >
        <ShoppingBag className="w-3 h-3 text-white flex-shrink-0" />
        <span>Order Now</span>
      </button>
    </div>
  );
};
