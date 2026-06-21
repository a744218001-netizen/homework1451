export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isPopular?: boolean;
}

export interface Reservation {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "11:30" | "13:30" | "17:30" | "19:30"
  guests: number;
  notes?: string;
  userId?: string; // Opt association for logged in users
  createdAt?: any;
}

// Data format for the user test message in Firestore
export interface TestMessage {
  id?: string;
  message: string;
  createdAt: any;
}

export type MenuCategory = "appetizers" | "mains" | "desserts" | "drinks";

// Booking limits per day
export const MAX_RESERVATIONS_PER_SLOT = 5; // e.g. Max 5 parties per available timeslot
export const TIME_SLOTS = ["11:30", "13:30", "18:00", "20:00"];
