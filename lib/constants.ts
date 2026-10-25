import { ContactInfo, NavigationLink } from '@/types';

export const BUSINESS_NAME = 'Aditya Restaurant & Hospitality';
export const BUSINESS_TAGLINE = 'Where Every Moment Becomes a Memory';

export const WHATSAPP_NUMBER = '919963012567';

export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/1vz48kZMpeT4MrjH7?g_st=aw';

export const CONTACT_INFO: ContactInfo = {
  address: 'Hotel Aditya Grand, Pamuru Rd, Kota Reddy Nagar, Kandukur, Andhra Pradesh 523105, India',
  phones: ['+91 99630 12567', '+91 94414 15511'],
  email: 'info@adityahospitality.com',
  restaurantWorkingHours: ['11:00 AM - 3:00 PM', '7:00 PM - 11:00 PM'],
  plusCode: '6W83+QC Kandukur, Andhra Pradesh',
  checkInTime: '2:00 PM',
  checkOutTime: '12:00 PM',
  whatsappNumber: WHATSAPP_NUMBER,
  googleMapsUrl: GOOGLE_MAPS_URL,
};

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Restaurant', href: '/restaurant' },
  { label: 'Hotel Rooms', href: '/hotel-rooms' },
  { label: 'Function Hall', href: '/function-hall' },
  { label: 'Catering', href: '/catering' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Now', href: '/book-now' },
];

export const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Hotel+Aditya+Grand,+Pamuru+Rd,+Kota+Reddy+Nagar,+Kandukur,+Andhra+Pradesh+523105&t=&z=16&ie=UTF8&iwloc=&output=embed';
