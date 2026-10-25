'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/components/admin/ToastContext';
import { getRooms, updateRoomPrice } from '@/services/roomsApi';
import { RoomType } from '@/lib/store';
import { Edit3, X } from 'lucide-react';

export default function RoomsManagerPage() {
  const { showToast } = useToast();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit Price State
  const [editingPriceRoom, setEditingPriceRoom] = useState<RoomType | null>(null);
  const [newPrice, setNewPrice] = useState('');
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);

  const fetchRooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch {
      setError('Unable to load rooms data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle Edit Price
  const openEditPriceModal = (room: RoomType) => {
    setEditingPriceRoom(room);
    setNewPrice(room.basePricePerNight.toString());
  };

  const handlePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPriceRoom) return;

    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      showToast('Price must be a positive number', 'error');
      return;
    }

    setIsUpdatingPrice(true);
    try {
      const updated = await updateRoomPrice(editingPriceRoom.id, priceNum);
      setRooms((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));

      // Notify open customer tabs instantly via BroadcastChannel
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('aditya_room_updates');
        bc.postMessage('room_updated');
        bc.close();
      }

      showToast('Room price updated successfully.');
      setEditingPriceRoom(null);
    } catch {
      showToast('Failed to update room price.', 'error');
    } finally {
      setIsUpdatingPrice(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16] tracking-tight">
            Rooms Manager
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchRooms} className="font-bold underline text-xs">
              Retry
            </button>
          </div>
        )}

        {/* 2-Column Desktop Grid for Room Cards */}
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 font-sans">
            Loading room configurations...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-[#E7E1D3] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                {/* Room Image Banner */}
                <div className="relative h-64 w-full bg-gray-100">
                  <Image
                    src={
                      room.photos[0] ||
                      '/images/rooms/HotelRooms1.png'
                    }
                    alt={room.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-[#7A1F2B]">
                      {room.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {room.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        BASE PRICE (PER NIGHT)
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#C9A227]">
                        ₹{room.basePricePerNight}
                      </span>
                    </div>

                    <button
                      onClick={() => openEditPriceModal(room)}
                      className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#661923] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Price</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Price Modal */}
        {editingPriceRoom && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif font-bold text-xl text-[#7A1F2B]">
                  Edit Room Base Price
                </h3>
                <button
                  onClick={() => setEditingPriceRoom(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-600 font-sans">
                Update base price per night for <strong className="text-gray-900">{editingPriceRoom.title}</strong>.
              </p>

              <form onSubmit={handlePriceSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Base Price (Per Night in ₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-base font-bold text-gray-900 bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingPriceRoom(null)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingPrice}
                    className="px-5 py-2 bg-[#7A1F2B] hover:bg-[#661923] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                  >
                    {isUpdatingPrice ? 'Updating...' : 'Save Price'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
