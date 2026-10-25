export type ServiceType = 'restaurant' | 'hotel' | 'function-hall' | 'catering';

export interface NavigationLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  categoryTag: string;
  alt: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  iconName: string;
  image: string;
  route: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  rating: number;
}

export interface ContactInfo {
  address: string;
  phones: string[];
  email: string;
  restaurantWorkingHours: string[];
  plusCode: string;
  checkInTime: string;
  checkOutTime: string;
  whatsappNumber: string;
  googleMapsUrl?: string;
}

export interface RestaurantTable {
  tableNumber: number;
  capacityLabel: string;
  minGuests: number;
  maxGuests: number;
  category: 'small' | 'medium' | 'large';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Veg' | 'Non-Veg';
  spicyLevel?: 'Mild' | 'Medium' | 'Spicy';
  isPopular?: boolean;
}

export interface SignatureDish {
  id: string;
  name: string;
  description: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  guestsLabel: string;
  price: number;
  description: string;
  amenities: string[];
  image: string;
}

export interface FunctionHall {
  id: string;
  name: string;
  capacity: string;
  minGuests: number;
  maxGuests: number;
  description: string;
  suitableFor: string[];
  amenities: string[];
  image: string;
  foodPolicyNote: string;
}

export interface CateringService {
  id: string;
  title: string;
  type: 'Veg' | 'Non-Veg' | 'Veg & Non-Veg';
  description: string;
  availableFor: string[];
  highlights: string[];
  image: string;
}

export interface BookingFormData {
  serviceRequired: ServiceType;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time?: string;
  guests: number;
  checkOutDate?: string;
  roomCategory?: string;
  hallPreference?: string;
  cateringType?: 'Veg' | 'Non-Veg' | 'Both';
  specialRequirements?: string;
}
