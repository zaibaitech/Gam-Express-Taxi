'use client';

import { useMemo, useState } from "react";
import BookingDetailsPanel from "@/components/admin/BookingDetailsPanel";
import BookingTable from "@/components/admin/BookingTable";
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import EmptyState from "@/components/admin/EmptyState";
import FilterBar from "@/components/admin/FilterBar";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { Booking, BookingFilters } from "@/types/admin";

const defaultFilters: BookingFilters = {
  status: "all",
  paymentStatus: "all",
  driverId: "all",
  date: "",
};

export default function AdminBookingsPage() {
  const { bookings, drivers, assignDriver, updateRideStatus } = useAdminData();
  const [filters, setFilters] = useState<BookingFilters>(defaultFilters);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const statusOk = filters.status === "all" || booking.rideStatus === filters.status;
      const paymentOk =
        filters.paymentStatus === "all" || booking.paymentStatus === filters.paymentStatus;
      const driverOk =
        filters.driverId === "all" || booking.assignedDriverId === filters.driverId;
      const dateOk =
        !filters.date || booking.createdAt.slice(0, 10) === filters.date;

      return statusOk && paymentOk && driverOk && dateOk;
    });
  }, [bookings, filters]);

  return (
    <div className="space-y-4">
      <FilterBar filters={filters} onChange={setFilters} drivers={drivers} />

      {filteredBookings.length ? (
        <BookingTable bookings={filteredBookings} drivers={drivers} onOpen={setSelectedBooking} />
      ) : (
        <EmptyState
          title="No bookings match these filters"
          description="Try clearing one or more filters to see more booking records."
        />
      )}

      <BookingDetailsPanel
        booking={selectedBooking}
        drivers={drivers}
        onClose={() => setSelectedBooking(null)}
        onAssign={(driverId) => {
          if (!selectedBooking) return;
          assignDriver(selectedBooking.id, driverId);
          setSelectedBooking({ ...selectedBooking, assignedDriverId: driverId, rideStatus: "assigned" });
        }}
        onMarkConfirmed={() => {
          if (!selectedBooking) return;
          updateRideStatus(selectedBooking.id, "pending-confirmation");
          setSelectedBooking({ ...selectedBooking, rideStatus: "pending-confirmation" });
        }}
        onMarkCompleted={() => {
          if (!selectedBooking) return;
          setConfirmOpen(true);
        }}
        onCancel={() => {
          if (!selectedBooking) return;
          updateRideStatus(selectedBooking.id, "cancelled");
          setSelectedBooking({ ...selectedBooking, rideStatus: "cancelled" });
        }}
      />

      <ConfirmationModal
        open={confirmOpen}
        title="Mark ride as completed"
        message="This will close the booking and release the driver as available."
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (selectedBooking) {
            updateRideStatus(selectedBooking.id, "completed");
            setSelectedBooking({ ...selectedBooking, rideStatus: "completed" });
          }
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
