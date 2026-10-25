'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Utensils,
  Bed,
  Tag,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Menu Manager', href: '/admin/menu', icon: Utensils },
    { label: 'Rooms', href: '/admin/rooms', icon: Bed },
    { label: 'Offers', href: '/admin/offers', icon: Tag },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-52 sm:w-56 bg-[#17140F] text-[#E7E2D8] flex flex-col justify-between border-r border-[#2A241C] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1">
          {/* Sidebar Top Logo Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-[#2A241C]">
            <Link
              href="/admin/dashboard"
              className="font-serif text-lg font-bold text-[#C9A227] tracking-wider flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A1F2B] inline-block" />
              <span>ADITYA ADMIN</span>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden text-[#A8A196] hover:text-white p-1"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#7A1F2B] text-white shadow-md'
                      : 'text-[#E7E2D8] hover:bg-[#2A241C] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pinned Bottom Logout */}
        <div className="p-3 border-t border-[#2A241C]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-[#A8A196] hover:bg-[#2A241C] hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Public Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
