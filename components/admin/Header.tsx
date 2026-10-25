'use client';

import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  return (
    <header className="h-14 sm:h-16 bg-white border-b border-[#E7E1D3] shadow-xs px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Hamburger Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden text-gray-700 hover:text-[#7A1F2B] p-1.5 rounded-lg border border-gray-200"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block">
          ADITYA RESTAURANT &amp; HOSPITALITY MANAGEMENT
        </span>
      </div>

      {/* Right: Circular Burgundy Avatar "A" + Admin Label */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden xs:block">
          <span className="block text-xs font-bold text-gray-900 leading-tight">Admin User</span>
          <span className="block text-[10px] text-[#7A1F2B] font-semibold">Super Administrator</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#7A1F2B] text-white font-bold font-serif text-base flex items-center justify-center shadow-md border-2 border-[#C9A227]">
          A
        </div>
      </div>
    </header>
  );
};
