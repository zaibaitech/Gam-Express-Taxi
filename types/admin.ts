export type RideStatus =
  | "new-request"
  | "pending-confirmation"
  | "assigned"
  | "in-progress"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "unpaid"
  | "pending-mobile-money"
  | "paid"
  | "failed";

export type PaymentMethod = "mobile-money" | "cash";

export type DriverAvailability = "available" | "assigned" | "on-trip" | "offline";

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  estimatedFare: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  rideStatus: RideStatus;
  assignedDriverId?: string;
  notes?: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleName: string;
  vehiclePlate: string;
  availabilityStatus: DriverAvailability;
  activeBookingId?: string;
  tripsToday: number;
  reportedEarnings: number;
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: "available" | "on-trip" | "maintenance";
}

export interface Payment {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "dispatcher";
}

export interface BookingFilters {
  status: RideStatus | "all";
  paymentStatus: PaymentStatus | "all";
  driverId: string | "all";
  date: string;
}

export interface AdminActivityItem {
  id: string;
  type: "new-booking" | "booking-updated" | "payment-updated" | "driver-assigned";
  title: string;
  message: string;
  createdAt: string;
  bookingId?: string;
  isNew?: boolean;
}
