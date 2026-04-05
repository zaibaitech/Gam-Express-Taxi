import { Booking, Driver } from "@/types/admin";
import StatusBadge from "@/components/admin/StatusBadge";

interface DriverCardProps {
  driver: Driver;
  bookings: Booking[];
}

export default function DriverCard({ driver, bookings }: DriverCardProps) {
  const activeBooking = bookings.find((booking) => booking.id === driver.activeBookingId);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{driver.name}</h3>
          <p className="text-sm text-gray-500">{driver.phone}</p>
          <p className="mt-1 text-sm text-gray-700">
            {driver.vehicleName} • {driver.vehiclePlate}
          </p>
        </div>
        <StatusBadge status={driver.availabilityStatus} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Trips Today</p>
          <p className="font-semibold text-gray-900">{driver.tripsToday}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Reported Earnings</p>
          <p className="font-semibold text-gray-900">GMD {driver.reportedEarnings}</p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-gray-200 p-3 text-sm">
        <p className="text-xs text-gray-500">Assigned Ride</p>
        <p className="font-semibold text-gray-800">
          {activeBooking ? `${activeBooking.id} • ${activeBooking.pickupLocation}` : "No active assignment"}
        </p>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700"
      >
        View Assigned Rides
      </button>
    </article>
  );
}
