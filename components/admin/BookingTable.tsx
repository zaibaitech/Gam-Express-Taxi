import { Booking, Driver } from "@/types/admin";
import StatusBadge from "@/components/admin/StatusBadge";

interface BookingTableProps {
  bookings: Booking[];
  drivers: Driver[];
  onOpen: (booking: Booking) => void;
}

export default function BookingTable({ bookings, drivers, onOpen }: BookingTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-[1200px] w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="px-4 py-3">Booking ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Pickup</th>
            <th className="px-4 py-3">Drop-off</th>
            <th className="px-4 py-3">Fare</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Ride Status</th>
            <th className="px-4 py-3">Driver</th>
            <th className="px-4 py-3">Requested</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const driver = drivers.find((d) => d.id === booking.assignedDriverId);
            return (
              <tr key={booking.id} className="border-t border-gray-100 text-sm">
                <td className="px-4 py-3 font-semibold text-gray-900">{booking.id}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800">{booking.customerName}</p>
                  <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                </td>
                <td className="px-4 py-3 text-gray-700">{booking.pickupLocation}</td>
                <td className="px-4 py-3 text-gray-700">{booking.dropoffLocation}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">GMD {booking.estimatedFare}</td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">{booking.paymentMethod}</p>
                    <StatusBadge status={booking.paymentStatus} />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.rideStatus} />
                </td>
                <td className="px-4 py-3 text-gray-700">{driver?.name ?? "Unassigned"}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(booking.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onOpen(booking)}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700"
                  >
                    View / Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
