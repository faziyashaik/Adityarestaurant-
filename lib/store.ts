import { connectToDatabase } from './db';
import { MenuItemModel } from './models/MenuItem';
import { RoomModel } from './models/Room';
import { OfferModel } from './models/Offer';
import { GalleryImageModel } from './models/GalleryImage';
import { SettingsModel } from './models/Settings';
import { FULL_MENU_ITEMS } from './menuData';

export interface MenuItemType {
  id: string;
  name: string;
  category: string;
  type: 'veg' | 'non-veg';
  price: number;
}

export interface RoomType {
  id: string;
  title: string;
  description: string;
  basePricePerNight: number;
  photos: string[];
}

export interface OfferType {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  validUntil: string;
  imageUrl: string;
  isActive: boolean;
}

export interface GalleryImageType {
  id: string;
  imageUrl: string;
  title?: string;
  category?: string;
}

export interface SettingsType {
  whatsappNumber: string;
  restaurantName: string;
  address: string;
  email: string;
  phone: string;
}

// Map FULL_MENU_ITEMS into MenuItemType seed array (150+ authentic dishes)
const SEED_MENU_ITEMS: MenuItemType[] = FULL_MENU_ITEMS.map((item) => ({
  id: item.id.toString(),
  name: item.name,
  category: item.category.toUpperCase(),
  type: item.isVeg ? 'veg' : 'non-veg',
  price: item.price,
}));

const SEED_ROOMS: RoomType[] = [
  {
    id: 'room-standard',
    title: 'Standard AC Room',
    description: 'Comfortable standard AC room perfect for short stays, featuring high-speed WiFi, parking, and 24/7 hot water.',
    basePricePerNight: 1100,
    photos: [
      '/images/rooms/HotelRooms1.png',
      '/images/rooms/HotelRooms4.png',
    ],
  },
  {
    id: 'room-deluxe',
    title: 'Deluxe AC Room',
    description: 'Spacious deluxe room with premium amenities, smart TV, mini fridge, and room service for ultimate relaxation.',
    basePricePerNight: 1800,
    photos: [
      '/images/rooms/HotelRooms2.jpg',
      '/images/rooms/HotelRooms3.png',
    ],
  },
  {
    id: 'room-suite',
    title: 'Suite Room',
    description: 'Luxurious suite featuring a separate living area, plush bedding, premium toiletries, and personalized hospitality.',
    basePricePerNight: 2800,
    photos: [
      '/images/rooms/HotelRooms3.png',
      '/images/rooms/HotelRooms2.jpg',
    ],
  },
];

const SEED_OFFERS: OfferType[] = [
  {
    id: 'offer-grand-opening',
    title: 'Grand Opening Special',
    description: 'Get 20% discount on all room bookings and luxury dining at Aditya Hospitality.',
    originalPrice: 500,
    discountPrice: 399,
    validUntil: '2026-09-30',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    isActive: true,
  },
  {
    id: 'offer-veg-biryani',
    title: 'Veg Biryani Special',
    description: 'Enjoy authentic Veg Biryani with complimentary Raitha & Salan at a special offer price.',
    originalPrice: 220,
    discountPrice: 169,
    validUntil: '2026-09-25',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    isActive: true,
  },
];

const SEED_GALLERY: GalleryImageType[] = [
  {
    id: 'gal-1',
    imageUrl: '/images/restaurant/restaurant_main.jpg',
    title: 'Aditya Main AC Dining Hall',
    category: 'Restaurant',
  },
  {
    id: 'gal-2',
    imageUrl: '/images/hotel/HotelRooms1.png',
    title: 'Aditya AC Room Interior',
    category: 'Rooms',
  },
  {
    id: 'gal-3',
    imageUrl: '/images/function-hall/FunctionHall1.jpg',
    title: 'Grand Function Hall Event Stage',
    category: 'Function Hall',
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
    title: 'Outdoor Catering Spread',
    category: 'Catering',
  },
];

const SEED_SETTINGS: SettingsType = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919963012567',
  restaurantName: 'Aditya Restaurant & Hospitality',
  address: 'Kandukur, Andhra Pradesh',
  email: 'contact@adityahospitality.com',
  phone: '+91 99630 12567',
};

// In-Memory Fallback Cache Store initialized with ALL dishes
let memoryMenuItems: MenuItemType[] = [...SEED_MENU_ITEMS];
let memoryRooms: RoomType[] = [...SEED_ROOMS];
let memoryOffers: OfferType[] = [...SEED_OFFERS];
let memoryGallery: GalleryImageType[] = [...SEED_GALLERY];
let memorySettings: SettingsType = { ...SEED_SETTINGS };

export async function seedDatabase() {
  const db = await connectToDatabase();
  if (db) {
    try {
      const menuCount = await MenuItemModel.countDocuments();
      // Ensure MongoDB has the full list of dishes
      if (menuCount < 20) {
        await MenuItemModel.deleteMany({});
        await MenuItemModel.insertMany(SEED_MENU_ITEMS);
        console.log('Seeded full menu items into MongoDB:', SEED_MENU_ITEMS.length);
      }
      const roomCount = await RoomModel.countDocuments();
      if (roomCount === 0) {
        await RoomModel.insertMany(SEED_ROOMS);
      }
      const offerCount = await OfferModel.countDocuments();
      if (offerCount === 0) {
        await OfferModel.insertMany(SEED_OFFERS);
      }
      const galleryCount = await GalleryImageModel.countDocuments();
      if (galleryCount === 0) {
        await GalleryImageModel.insertMany(SEED_GALLERY);
      }
      const settingsCount = await SettingsModel.countDocuments();
      if (settingsCount === 0) {
        await SettingsModel.create(SEED_SETTINGS);
      }
    } catch (e) {
      console.warn('Seed fallback to memory store:', e);
    }
  }
}

// ---------------- MENU STORE APIS ----------------
export async function getMenuItemsDB(): Promise<MenuItemType[]> {
  await seedDatabase();
  const db = await connectToDatabase();
  if (db) {
    try {
      const items = await MenuItemModel.find().lean();
      if (items && items.length > 0) {
        return items.map((i: any) => ({
          id: String(i.id || i._id),
          name: i.name,
          category: i.category,
          type: i.type,
          price: i.price,
        }));
      }
    } catch (e) {
      console.warn('MongoDB read error, using fallback:', e);
    }
  }
  return memoryMenuItems;
}

export async function createMenuItemDB(itemData: Omit<MenuItemType, 'id'>): Promise<MenuItemType> {
  await seedDatabase();
  const nextId = (
    Math.max(100, ...memoryMenuItems.map((i) => parseInt(i.id) || 100)) + 1
  ).toString();
  const newItem: MenuItemType = { id: nextId, ...itemData };

  const db = await connectToDatabase();
  if (db) {
    try {
      await MenuItemModel.create(newItem);
    } catch (e) {
      console.warn('MongoDB write error:', e);
    }
  }
  memoryMenuItems.unshift(newItem);
  return newItem;
}

import mongoose from 'mongoose';

function buildIdQuery(targetId: string) {
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    return { $or: [{ id: targetId }, { _id: targetId }] };
  }
  return { id: targetId };
}

export async function updateMenuItemDB(id: string, itemData: Partial<MenuItemType>): Promise<MenuItemType | null> {
  const targetId = String(id);
  const db = await connectToDatabase();
  let updatedDoc: MenuItemType | null = null;

  if (db) {
    try {
      const doc = await MenuItemModel.findOneAndUpdate(
        buildIdQuery(targetId),
        itemData,
        { new: true }
      ).lean();
      if (doc) {
        const d = doc as unknown as Record<string, unknown>;
        updatedDoc = {
          id: String(d.id || d._id),
          name: String(d.name || ''),
          category: String(d.category || ''),
          type: (d.type as 'veg' | 'non-veg') || 'non-veg',
          price: Number(d.price || 0),
        };
      }
    } catch (e) {
      console.warn('MongoDB update error:', e);
    }
  }

  const idx = memoryMenuItems.findIndex((i) => String(i.id) === targetId);
  if (idx !== -1) {
    memoryMenuItems[idx] = { ...memoryMenuItems[idx], ...itemData };
    return updatedDoc || memoryMenuItems[idx];
  }

  if (updatedDoc) {
    memoryMenuItems.unshift(updatedDoc);
    return updatedDoc;
  }

  const fallbackUpdated: MenuItemType = {
    id: targetId,
    name: itemData.name || 'Updated Item',
    category: itemData.category || 'GENERAL',
    type: itemData.type || 'non-veg',
    price: itemData.price || 100,
  };
  memoryMenuItems.unshift(fallbackUpdated);
  return fallbackUpdated;
}

export async function deleteMenuItemDB(id: string): Promise<boolean> {
  const targetId = String(id);
  const db = await connectToDatabase();
  if (db) {
    try {
      await MenuItemModel.findOneAndDelete(buildIdQuery(targetId));
    } catch (e) {
      console.warn('MongoDB delete error:', e);
    }
  }
  memoryMenuItems = memoryMenuItems.filter((i) => String(i.id) !== targetId);
  return true;
}

// ---------------- ROOMS STORE APIS ----------------
export async function getRoomsDB(): Promise<RoomType[]> {
  await seedDatabase();
  const db = await connectToDatabase();
  if (db) {
    try {
      const rooms = await RoomModel.find().lean();
      if (rooms && rooms.length > 0) {
        return rooms.map((r: any) => ({
          id: String(r.id || r._id),
          title: r.title,
          description: r.description,
          basePricePerNight: r.basePricePerNight,
          photos: r.photos || [],
        }));
      }
    } catch (e) {
      console.warn('MongoDB rooms read error:', e);
    }
  }
  return memoryRooms;
}

export async function updateRoomPriceDB(id: string, basePricePerNight: number): Promise<RoomType | null> {
  const targetId = String(id);
  const db = await connectToDatabase();
  if (db) {
    try {
      await RoomModel.findOneAndUpdate(buildIdQuery(targetId), { basePricePerNight }, { new: true });
    } catch (e) {
      console.warn('MongoDB room price update error:', e);
    }
  }
  const idx = memoryRooms.findIndex((r) => String(r.id) === targetId);
  if (idx !== -1) {
    memoryRooms[idx].basePricePerNight = basePricePerNight;
    return memoryRooms[idx];
  }
  return null;
}

export async function updateRoomPhotosDB(id: string, photos: string[]): Promise<RoomType | null> {
  const targetId = String(id);
  const db = await connectToDatabase();
  if (db) {
    try {
      await RoomModel.findOneAndUpdate(buildIdQuery(targetId), { photos }, { new: true });
    } catch (e) {
      console.warn('MongoDB room photos update error:', e);
    }
  }
  const idx = memoryRooms.findIndex((r) => String(r.id) === targetId);
  if (idx !== -1) {
    memoryRooms[idx].photos = photos;
    return memoryRooms[idx];
  }
  return null;
}

// ---------------- OFFERS STORE APIS ----------------
export async function getOffersDB(): Promise<OfferType[]> {
  await seedDatabase();
  const db = await connectToDatabase();
  if (db) {
    try {
      const offers = await OfferModel.find().lean();
      if (offers && offers.length > 0) {
        return offers.map((o: any) => ({
          id: String(o.id || o._id),
          title: o.title,
          description: o.description,
          originalPrice: o.originalPrice,
          discountPrice: o.discountPrice,
          validUntil: o.validUntil,
          imageUrl: o.imageUrl,
          isActive: o.isActive,
        }));
      }
    } catch (e) {
      console.warn('MongoDB offers read error:', e);
    }
  }
  return memoryOffers;
}

export async function getActiveOffersDB(): Promise<OfferType[]> {
  const allOffers = await getOffersDB();
  return allOffers.filter((o) => o.isActive);
}

export async function createOfferDB(offerData: Omit<OfferType, 'id'>): Promise<OfferType> {
  await seedDatabase();
  const nextId = 'offer-' + Date.now();
  const newOffer: OfferType = { id: nextId, ...offerData };

  const db = await connectToDatabase();
  if (db) {
    try {
      await OfferModel.create(newOffer);
    } catch (e) {
      console.warn('MongoDB offer create error:', e);
    }
  }
  memoryOffers.unshift(newOffer);
  return newOffer;
}

export async function updateOfferDB(id: string, offerData: Partial<OfferType>): Promise<OfferType | null> {
  const targetId = String(id);
  const db = await connectToDatabase();
  if (db) {
    try {
      await OfferModel.findOneAndUpdate(buildIdQuery(targetId), offerData, { new: true });
    } catch (e) {
      console.warn('MongoDB offer update error:', e);
    }
  }
  const idx = memoryOffers.findIndex((o) => String(o.id) === targetId);
  if (idx !== -1) {
    memoryOffers[idx] = { ...memoryOffers[idx], ...offerData };
    return memoryOffers[idx];
  }
  return null;
}

export async function toggleOfferActiveDB(id: string, isActive: boolean): Promise<OfferType | null> {
  return updateOfferDB(id, { isActive });
}

export async function deleteOfferDB(id: string): Promise<boolean> {
  const targetId = String(id);
  const db = await connectToDatabase();
  if (db) {
    try {
      await OfferModel.findOneAndDelete(buildIdQuery(targetId));
    } catch (e) {
      console.warn('MongoDB offer delete error:', e);
    }
  }
  memoryOffers = memoryOffers.filter((o) => String(o.id) !== targetId);
  return true;
}

// ---------------- GALLERY STORE APIS ----------------
export async function getGalleryImagesDB(): Promise<GalleryImageType[]> {
  await seedDatabase();
  const db = await connectToDatabase();
  if (db) {
    try {
      const images = await GalleryImageModel.find().lean();
      if (images && images.length > 0) {
        return images.map((img: any) => ({
          id: String(img.id || img._id),
          imageUrl: img.imageUrl,
          title: img.title,
          category: img.category,
        }));
      }
    } catch (e) {
      console.warn('MongoDB gallery read error:', e);
    }
  }
  return memoryGallery;
}

export async function createGalleryImageDB(imgData: Omit<GalleryImageType, 'id'>): Promise<GalleryImageType> {
  await seedDatabase();
  const nextId = 'gal-' + Date.now();
  const newImg: GalleryImageType = { id: nextId, ...imgData };

  const db = await connectToDatabase();
  if (db) {
    try {
      await GalleryImageModel.create(newImg);
    } catch (e) {
      console.warn('MongoDB gallery create error:', e);
    }
  }
  memoryGallery.unshift(newImg);
  return newImg;
}

export async function deleteGalleryImageDB(id: string): Promise<boolean> {
  const targetId = String(id);
  const db = await connectToDatabase();
  if (db) {
    try {
      await GalleryImageModel.findOneAndDelete(buildIdQuery(targetId));
    } catch (e) {
      console.warn('MongoDB gallery delete error:', e);
    }
  }
  memoryGallery = memoryGallery.filter((g) => String(g.id) !== targetId);
  return true;
}

// ---------------- SETTINGS STORE APIS ----------------
export async function getSettingsDB(): Promise<SettingsType> {
  await seedDatabase();
  const db = await connectToDatabase();
  if (db) {
    try {
      const s = await SettingsModel.findOne().lean();
      if (s) {
        return {
          whatsappNumber: s.whatsappNumber,
          restaurantName: s.restaurantName,
          address: s.address,
          email: s.email,
          phone: s.phone,
        };
      }
    } catch (e) {
      console.warn('MongoDB settings read error:', e);
    }
  }
  return memorySettings;
}

export async function updateSettingsDB(settingsData: Partial<SettingsType>): Promise<SettingsType> {
  const db = await connectToDatabase();
  if (db) {
    try {
      await SettingsModel.findOneAndUpdate({}, settingsData, { upsert: true, new: true });
    } catch (e) {
      console.warn('MongoDB settings update error:', e);
    }
  }
  memorySettings = { ...memorySettings, ...settingsData };
  return memorySettings;
}
