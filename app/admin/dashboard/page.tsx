'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { getOffers } from '@/services/offersApi';
import { getRooms } from '@/services/roomsApi';
import { OfferType, RoomType } from '@/lib/store';
import { Tag, Bed, MessageSquareCode, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [offersData, roomsData] = await Promise.all([getOffers(), getRooms()]);
      setOffers(offersData);
      setRooms(roomsData);
    } catch {
      setError('Unable to load dashboard metrics. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const activeOffersCount = offers.filter((o) => o.isActive).length;
  const totalRoomsCount = rooms.length;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header Title */}
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16] tracking-tight">
            Dashboard
          </h1>
          <button
            onClick={loadDashboardData}
            className="p-2 text-gray-500 hover:text-[#7A1F2B] rounded-lg border border-gray-300 hover:bg-white transition-colors"
            title="Refresh metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={loadDashboardData} className="font-bold underline text-xs">
              Retry
            </button>
          </div>
        )}

        {/* 2 Equal Stat Cards (Section 14) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Stat Card 1: Active Offers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E1D3] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                ACTIVE OFFERS
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#7A1F2B]">
                {isLoading ? '...' : activeOffersCount}
              </div>
              <p className="text-xs text-gray-500 font-sans">
                {activeOffersCount} active promotional deals live
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#F3E5E2] text-[#7A1F2B] flex items-center justify-center shadow-xs">
              <Tag className="w-7 h-7" />
            </div>
          </div>

          {/* Stat Card 2: Total Rooms */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E1D3] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                TOTAL ROOMS
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#7A1F2B]">
                {isLoading ? '...' : totalRoomsCount}
              </div>
              <p className="text-xs text-gray-500 font-sans">
                {totalRoomsCount} configured room categories
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#F3E5E2] text-[#7A1F2B] flex items-center justify-center shadow-xs">
              <Bed className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Blue WhatsApp Integration Active Info Banner (Section 14) */}
        <div className="bg-[#E9F1FE] border border-[#93C5FD] rounded-2xl p-6 sm:p-8 shadow-xs flex items-start gap-4 text-[#1D4ED8]">
          <div className="w-10 h-10 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <MessageSquareCode className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#1D4ED8]">
              WhatsApp Integration Active
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-sans">
              All customer enquiries and bookings are now routed directly to your WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
