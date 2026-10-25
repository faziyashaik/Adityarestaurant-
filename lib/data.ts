import {
  CateringService,
  FunctionHall,
  HeroSlide,
  HotelRoom,
  MenuItem,
  RestaurantTable,
  ServiceCard,
  SignatureDish,
  Testimonial,
} from '@/types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/images/hero/hero_restaurant.jpg',
    categoryTag: 'Fine Dining Restaurant',
    alt: 'Aditya Restaurant Fine Dining Ambience',
  },
  {
    id: 'slide-2',
    image: '/images/landing/HotelRooms1.png',
    categoryTag: 'Luxury Hotel Rooms',
    alt: 'Aditya Luxury Hotel Bedroom',
  },
  {
    id: 'slide-3',
    image: '/images/landing/FunctionHall1.jpg',
    categoryTag: 'Grand Function Hall',
    alt: 'Aditya Grand Function Hall Event Space',
  },
];

export const PREMIUM_SERVICES: ServiceCard[] = [
  {
    id: 'service-restaurant',
    title: 'Restaurant',
    subtitle: 'Dine In Excellence',
    description:
      'AC restaurant with 16 tables. Offering the finest Veg & Non-Veg delicacies in a premium ambience.',
    category: 'Restaurant',
    iconName: 'Utensils',
    image: '/images/restaurant/restaurant_main.jpg',
    route: '/restaurant',
  },
  {
    id: 'service-hotel',
    title: 'Hotel Rooms',
    subtitle: 'Rest in Comfort',
    description:
      'Well-appointed AC rooms with high-speed WiFi, parking, and 24/7 hot water for a relaxing stay.',
    category: 'Hotel Rooms',
    iconName: 'Bed',
    image: '/images/hotel/HotelRooms1.png',
    route: '/hotel-rooms',
  },
  {
    id: 'service-hall',
    title: 'Function Hall',
    subtitle: 'Celebrate in Style',
    description:
      'Host your events with us. Capacities ranging from intimate gatherings to 300 guests with complete amenities.',
    category: 'Function Hall',
    iconName: 'PartyPopper',
    image: '/images/function-hall/FunctionHall1.jpg',
    route: '/function-hall',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    text: 'Perfect place for family gatherings. Staff is very friendly.',
    author: 'PRIYA M.',
    rating: 5,
  },
  {
    id: 'test-2',
    text: 'Delicious authentic food, extremely clean AC rooms, and top-class hospitality in Kandukur. Highly recommended!',
    author: 'RAMESH REDDY',
    rating: 5,
  },
  {
    id: 'test-3',
    text: 'We hosted a family function at the Aditya Function Hall. The arrangement, lighting, and spacious venue were excellent.',
    author: 'VENKAT K.',
    rating: 5,
  },
  {
    id: 'test-4',
    text: 'The outdoor catering for our wedding was phenomenal! High quality Veg & Non-Veg dishes served hot to all 250 guests.',
    author: 'SNEHA & ANAND',
    rating: 5,
  },
  {
    id: 'test-5',
    text: 'Superb dining experience with prompt service and great ambience. Will definitely visit again when traveling through Pamuru Road.',
    author: 'K. SURYA PRAKASH',
    rating: 5,
  },
];

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: 'sig-1',
    name: 'Aditya Sp. Biryani',
    description: 'Our house special, bursting with signature flavors.',
  },
  {
    id: 'sig-2',
    name: 'Chicken Dum Biryani',
    description: 'Classic slow-cooked biryani with tender chicken pieces.',
  },
  {
    id: 'sig-3',
    name: 'Mogalay Biryani',
    description: 'Rich, aromatic, and royal Mughlai style preparation.',
  },
  {
    id: 'sig-4',
    name: 'Sp. Biryani',
    description: 'A uniquely spiced biryani crafted for perfection.',
  },
  {
    id: 'sig-5',
    name: 'Chilli Chicken',
    description: 'Spicy, tangy, and perfectly seasoned chicken bites.',
  },
  {
    id: 'sig-6',
    name: 'Pepper Chicken',
    description: 'Roasted chicken tossed with freshly ground black pepper.',
  },
  {
    id: 'sig-7',
    name: 'Chicken Egg Drop',
    description: 'A comforting, savory delight with rich flavors.',
  },
  {
    id: 'sig-8',
    name: 'Veg Bullet',
    description: 'Crispy, spicy vegetable bites perfect for snacking.',
  },
  {
    id: 'sig-9',
    name: 'Veg Cutlet',
    description: 'Golden-fried patties packed with fresh, seasoned vegetables.',
  },
  {
    id: 'sig-10',
    name: 'Veg Bhutan',
    description: 'A unique vegetarian specialty with a bold taste.',
  },
];

export const RESTAURANT_TABLES: RestaurantTable[] = [
  { tableNumber: 1, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 2, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 3, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 4, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 5, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 6, capacityLabel: '5 & 6 Persons', minGuests: 5, maxGuests: 6, category: 'medium' },
  { tableNumber: 7, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 8, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 9, capacityLabel: '5 & 6 Persons', minGuests: 5, maxGuests: 6, category: 'medium' },
  { tableNumber: 10, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 11, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 12, capacityLabel: '2, 3 & 4 Persons', minGuests: 2, maxGuests: 4, category: 'small' },
  { tableNumber: 13, capacityLabel: '10, 15, 20 & 30 Persons', minGuests: 10, maxGuests: 30, category: 'large' },
  { tableNumber: 14, capacityLabel: '10, 15, 20 & 30 Persons', minGuests: 10, maxGuests: 30, category: 'large' },
  { tableNumber: 15, capacityLabel: '10, 15, 20 & 30 Persons', minGuests: 10, maxGuests: 30, category: 'large' },
  { tableNumber: 16, capacityLabel: '10, 15, 20 & 30 Persons', minGuests: 10, maxGuests: 30, category: 'large' },
];

export const SAMPLE_MENU: MenuItem[] = [
  { id: 'm1', name: 'Paneer Butter Masala', description: 'Rich cottage cheese in tomato cashew gravy', price: '₹260', category: 'Veg', isPopular: true },
  { id: 'm2', name: 'Mushroom Multani', description: 'Spiced clay-oven grilled mushrooms', price: '₹280', category: 'Veg' },
  { id: 'm3', name: 'Veg Dum Biryani', description: 'Fragrant Basmati rice cooked with fresh spices and vegetables', price: '₹240', category: 'Veg', isPopular: true },
  { id: 'm4', name: 'Aditya Special Chicken Biryani', description: 'Signature spice-marinated tender chicken cooked with aromatic Basmati rice', price: '₹340', category: 'Non-Veg', spicyLevel: 'Medium', isPopular: true },
  { id: 'm5', name: 'Mutton Gongura Curry', description: 'Traditional Andhra style sorrel leaf tangy mutton curry', price: '₹420', category: 'Non-Veg', spicyLevel: 'Spicy', isPopular: true },
  { id: 'm6', name: 'Apollo Fish Fry', description: 'Crispy fried boneless fish in tangy spicy chili yogurt sauce', price: '₹380', category: 'Non-Veg', spicyLevel: 'Medium' },
  { id: 'm7', name: 'Butter Naan & Roti', description: 'Fresh tandoor baked breads served hot with butter', price: '₹60', category: 'Veg' },
  { id: 'm8', name: 'Gulab Jamun with Ice Cream', description: 'Hot golden jamun served with vanilla scoop', price: '₹140', category: 'Veg' },
];

export const HOTEL_ROOMS: HotelRoom[] = [
  {
    id: 'room-standard-ac',
    name: 'Standard AC Room',
    guestsLabel: 'Up to 2 Guests',
    price: 1100,
    description: 'Comfortable standard AC room perfect for a short stay. Features essential amenities for a pleasant experience.',
    amenities: ['WiFi', 'AC', 'Parking', '24/7 Hot Water'],
    image: '/images/rooms/HotelRooms1.png',
  },
  {
    id: 'room-deluxe-ac',
    name: 'Deluxe AC Room',
    guestsLabel: 'Up to 3 Guests',
    price: 1800,
    description: 'Spacious deluxe room with premium amenities. Ideal for families or those seeking extra comfort.',
    amenities: ['WiFi', 'AC', 'Parking', '24/7 Hot Water', 'TV', 'Mini Fridge', 'Room Service'],
    image: '/images/rooms/HotelRooms2.jpg',
  },
  {
    id: 'room-suite',
    name: 'Suite Room',
    guestsLabel: 'Up to 4 Guests',
    price: 2800,
    description: 'Experience ultimate luxury in our suite room, featuring a separate sitting area and premium amenities.',
    amenities: ['WiFi', 'AC', 'Parking', '24/7 Hot Water', 'TV', 'Mini Fridge', 'Room Service', 'Sitting Area', 'Premium Toiletries'],
    image: '/images/rooms/HotelRooms3.png',
  },
];

export const FUNCTION_HALLS: FunctionHall[] = [
  {
    id: 'hall-mini',
    name: 'Mini Function Hall',
    capacity: '1 – 30 Guests',
    minGuests: 1,
    maxGuests: 30,
    description: 'Intimate climate-controlled space perfect for small gatherings, birthday parties, corporate meetings, and family get-togethers.',
    suitableFor: ['Small Gatherings', 'Meetings', 'Small Celebrations', 'Birthday Parties'],
    amenities: ['Air Conditioning', 'High-Speed WiFi', 'Comfortable Seating', 'Ample Parking', 'Sound System Setup'],
    image: '/images/function-hall/FunctionHall3.png',
    foodPolicyNote: 'Food services are NOT included in Function Hall booking. Customers may separately request Catering.',
  },
  {
    id: 'hall-main',
    name: 'Main Function Hall',
    capacity: '1 – 300 Guests',
    minGuests: 1,
    maxGuests: 300,
    description: 'Grand event hall designed for grand weddings, receptions, major corporate events, and large celebrations with complete amenities.',
    suitableFor: ['Large Events', 'Weddings & Receptions', 'Big Celebrations', 'Grand Gatherings'],
    amenities: ['Air Conditioning', 'High-Speed WiFi', 'Comfortable Seating', 'Ample Parking', 'Stage & Decorative Lighting', 'Green Rooms'],
    image: '/images/function-hall/FunctionHall1.jpg',
    foodPolicyNote: 'Food services are NOT included in Function Hall booking. Customers may separately request Catering.',
  },
];

export const CATERING_SERVICES: CateringService[] = [
  {
    id: 'catering-veg',
    title: 'Veg Catering',
    type: 'Veg',
    description: 'Pure vegetarian feast tailored for weddings, pujas, and formal functions featuring rich traditional recipes.',
    availableFor: ['Weddings', 'Birthday Events', 'Corporate Events', 'Family Functions', 'Religious Ceremonies'],
    highlights: ['Authentic Andhra & North Indian Veg Dishes', 'Freshly Prepared Live Counters', 'Hygienic Buffet Setup & Service Staff'],
    image: '/images/catering/catering_main.jpg',
  },
  {
    id: 'catering-nonveg',
    title: 'Non-Veg & Mixed Catering',
    type: 'Veg & Non-Veg',
    description: 'Exquisite Veg & Non-Veg delicacies including signature Biryanis, succulent kebabs, and authentic gravy specialties.',
    availableFor: ['Weddings & Receptions', 'Anniversaries', 'Corporate Galas', 'Grand Celebrations'],
    highlights: ['Signature Biryani & Gravy Specialties', 'Customizable Multi-Course Menus', 'Professional Catering Service Team'],
    image: '/images/catering/catering_main.jpg',
  },
];
