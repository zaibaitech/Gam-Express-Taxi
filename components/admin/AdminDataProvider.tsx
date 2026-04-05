'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AdminActivityItem,
  Booking,
  Driver,
  Payment,
  PaymentStatus,
  RideStatus,
} from "@/types/admin";
import {
  initialActivity,
  initialBookings,
  initialDrivers,
  initialPayments,
} from "@/lib/admin/mockData";

interface AdminDataContextType {
  bookings: Booking[];
  drivers: Driver[];
  payments: Payment[];
  activity: AdminActivityItem[];
  assignDriver: (bookingId: string, driverId: string) => void;
  updateRideStatus: (bookingId: string, status: RideStatus) => void;
  updatePaymentStatus: (bookingId: string, status: PaymentStatus) => void;
  markActivitySeen: () => void;
  addDriver: (driver: Omit<Driver, "id" | "tripsToday" | "reportedEarnings" | "availabilityStatus">) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createIncomingBooking(): Booking {
  const pickupOptions = ["Westfield", "Brikama", "Kololi", "Serrekunda", "Bakau"];
  const dropoffOptions = ["Banjul", "Airport", "Kotu", "Fajara", "Lamin"];
  const names = ["Isatou", "Modou", "Binta", "Ebrima", "Aja", "Lamin"];

  const pickup = `${randomFrom(pickupOptions)} ${randomFrom(["Market", "Junction", "Highway"])}`;
  const dropoff = `${randomFrom(dropoffOptions)} ${randomFrom(["Road", "Area", "Terminal"])}`;

  return {
    id: `BK-${Math.floor(3000 + Math.random() * 1000)}`,
    customerName: `${randomFrom(names)} ${randomFrom(["Jallow", "Ceesay", "Sowe", "Jammeh"])}`,
    customerPhone: `+220 ${Math.floor(200 + Math.random() * 700)} ${Math.floor(1000 + Math.random() * 9000)}`,
    pickupLocation: pickup,
    dropoffLocation: dropoff,
    pickupTime: "Now",
    estimatedFare: Math.floor(100 + Math.random() * 260),
    paymentMethod: Math.random() > 0.35 ? "mobile-money" : "cash",
    paymentStatus: "unpaid",
    rideStatus: "new-request",
    createdAt: new Date().toISOString(),
  };
}

export default function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [activity, setActivity] = useState<AdminActivityItem[]>(initialActivity);

  useEffect(() => {
    // Simulate a lightweight incoming bookings stream.
    const interval = setInterval(() => {
      const incoming = createIncomingBooking();
      setBookings((prev) => [incoming, ...prev]);
      setActivity((prev) => [
        {
          id: `ACT-${Date.now()}`,
          type: "new-booking",
          title: "New booking request",
          message: `${incoming.id} from ${incoming.pickupLocation} to ${incoming.dropoffLocation}`,
          createdAt: new Date().toISOString(),
          bookingId: incoming.id,
          isNew: true,
        },
        ...prev,
      ]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const assignDriver = (bookingId: string, driverId: string) => {
    const selectedDriver = drivers.find((d) => d.id === driverId);
    if (!selectedDriver) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              assignedDriverId: driverId,
              rideStatus: "assigned",
            }
          : b,
      ),
    );

    setDrivers((prev) =>
      prev.map((d) => {
        if (d.id === driverId) {
          return { ...d, availabilityStatus: "assigned", activeBookingId: bookingId };
        }
        if (d.activeBookingId === bookingId && d.id !== driverId) {
          return { ...d, availabilityStatus: "available", activeBookingId: undefined };
        }
        return d;
      }),
    );

    setActivity((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: "driver-assigned",
        title: "Driver assigned",
        message: `${selectedDriver.name} assigned to ${bookingId}`,
        createdAt: new Date().toISOString(),
        bookingId,
        isNew: true,
      },
      ...prev,
    ]);
  };

  const updateRideStatus = (bookingId: string, status: RideStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, rideStatus: status } : b)));

    if (status === "completed") {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking?.assignedDriverId) {
        setDrivers((prev) =>
          prev.map((d) =>
            d.id === booking.assignedDriverId
              ? {
                  ...d,
                  availabilityStatus: "available",
                  activeBookingId: undefined,
                  tripsToday: d.tripsToday + 1,
                  reportedEarnings: d.reportedEarnings + booking.estimatedFare,
                }
              : d,
          ),
        );
      }
    }

    setActivity((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: "booking-updated",
        title: "Booking status updated",
        message: `${bookingId} moved to ${status.replace("-", " ")}`,
        createdAt: new Date().toISOString(),
        bookingId,
        isNew: true,
      },
      ...prev,
    ]);
  };

  const updatePaymentStatus = (bookingId: string, status: PaymentStatus) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, paymentStatus: status } : b)));

    setPayments((prev) => {
      const existing = prev.find((p) => p.bookingId === bookingId);
      if (existing) {
        return prev.map((p) => (p.bookingId === bookingId ? { ...p, status } : p));
      }

      return [
        {
          id: `PAY-${Date.now()}`,
          bookingId,
          customerName: booking.customerName,
          amount: booking.estimatedFare,
          method: booking.paymentMethod,
          status,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });

    setActivity((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: "payment-updated",
        title: "Payment status changed",
        message: `${bookingId} payment marked ${status.replace("-", " ")}`,
        createdAt: new Date().toISOString(),
        bookingId,
        isNew: true,
      },
      ...prev,
    ]);
  };

  const markActivitySeen = () => {
    setActivity((prev) => prev.map((item) => ({ ...item, isNew: false })));
  };

  const addDriver = (driverData: Omit<Driver, "id" | "tripsToday" | "reportedEarnings" | "availabilityStatus">) => {
    const newDriver: Driver = {
      ...driverData,
      id: `DRV-${Date.now()}`,
      availabilityStatus: "available",
      tripsToday: 0,
      reportedEarnings: 0,
    };
    setDrivers((prev) => [...prev, newDriver]);
    setActivity((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: "driver-assigned",
        title: "New driver added",
        message: `${newDriver.name} (${newDriver.vehiclePlate}) joined the fleet`,
        createdAt: new Date().toISOString(),
        isNew: true,
      },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({
      bookings,
      drivers,
      payments,
      activity,
      assignDriver,
      updateRideStatus,
      updatePaymentStatus,
      markActivitySeen,
      addDriver,
    }),
    [bookings, drivers, payments, activity],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }
  return context;
}
