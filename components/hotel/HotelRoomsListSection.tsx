'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, RefreshCw } from 'lucide-react';
import { getRooms } from '@/services/roomsApi';
import { RoomType } from '@/lib/store';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const DEFAULT_AMENITIES: Record<string, string[]> = {
  'Standard AC Room': ['Air Conditioned', 'Free High-Speed Wi-Fi', '24/7 Hot Water', 'Dedicated Parking'],
  'Deluxe AC Room': ['Air Conditioned', 'Free High-Speed Wi-Fi', '24/7 Hot Water', 'Smart LED TV', 'Mini Fridge', 'Dedicated Parking'],
  'Suite Room': ['Air Conditioned', 'Free High-Speed Wi-Fi', '24/7 Hot Water', 'Living Lounge Area', 'Smart LED TV', 'Mini Fridge', 'Premium Toiletries'],
};

export const HotelRoomsListSection: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveRooms = async (showSpinner = false) => {
    if (showSpinner) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch {
      if (showSpinner) {
        setError('Unable to load rooms. Please refresh.');
      }
    } finally {
      if (showSpinner) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchLiveRooms(true);

    // 1. Periodic background auto-polling every 3 seconds for cross-device updates
    const intervalId = setInterval(() => {
      fetchLiveRooms(false);
    }, 3000);

    // 2. Tab focus / visibility revalidation
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLiveRooms(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 3. Same-browser cross-tab instant broadcast listener
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel('aditya_room_updates');
      channel.onmessage = (event) => {
        if (event.data === 'room_updated') {
          fetchLiveRooms(false);
        }
      };
    }

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (channel) {
        channel.close();
      }
    };
  }, []);

  const getWhatsAppRoomUrl = (title: string, price: number) => {
    const message = `*HOTEL ROOM BOOKING ENQUIRY - ADITYA HOSPITALITY*\n\n*Room Category:* ${title}\n*Tariff:* ₹${price} / night\n\nHello Aditya Hospitality, I would like to inquire about booking this room. Please confirm availability.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <span className="text-[#C9A23A] text-xs font-semibold uppercase tracking-[0.25em]">
          ACCOMMODATIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#741B2A]">
          Room Accommodations
        </h2>
        <div className="w-16 h-1 bg-[#C9A23A] mx-auto rounded-full" />
      </div>

      {error && (
        <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200 flex items-center justify-between max-w-md mx-auto">
          <span>{error}</span>
          <button onClick={() => fetchLiveRooms(true)} className="font-bold underline text-xs flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-gray-500 font-sans">
          Loading room accommodations from database...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room) => {
            const amenities = DEFAULT_AMENITIES[room.title] || [
              'Air Conditioned',
              'Free High-Speed Wi-Fi',
              '24/7 Hot Water',
              'Dedicated Parking',
            ];
            const imageSrc =
              room.photos[0] ||
              '/images/rooms/HotelRooms1.png';

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                {/* Top Image Container */}
                <div className="relative h-60 sm:h-64 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={room.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="w-8 h-1 bg-[#C9A23A] absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full shadow-xs" />
                </div>

                {/* Card Body Content */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-4">
                    {/* Header Row: Title & Price */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#741B2A] tracking-tight">
                          {room.title}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium block mt-0.5">
                          2 Guests Max
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-2xl text-[#C9A23A]">
                          ₹{room.basePricePerNight}
                        </span>
                        <span className="text-[10px] text-gray-500 font-normal block">
                          / night
                        </span>
                      </div>
                    </div>

                    {/* Room Description */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities Checklist */}
                    <div className="pt-1">
                      <h4 className="font-serif font-semibold text-xs text-gray-900 mb-2">
                        Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-gray-700">
                        {amenities.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <div className="pt-2">
                    <a
                      href={getWhatsAppRoomUrl(room.title, room.basePricePerNight)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#741B2A] hover:bg-[#5F1624] text-white font-semibold rounded-xl text-sm shadow-md transition-colors flex items-center justify-center border border-[#C9A23A]/30"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
