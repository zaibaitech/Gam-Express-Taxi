import { Booking, Driver } from "@/types/admin";
import StatusBadge from "@/components/admin/StatusBadge";

interface BookingDetailsPanelProps {
  booking: Booking | null;
  drivers: Driver[];
  onClose: () => void;
  onAssign: (driverId: string) => void;
  onMarkConfirmed: () => void;
  onMarkCompleted: () => void;
  onCancel: () => void;
}

export default function BookingDetailsPanel({
  booking,
  drivers,
  onClose,
  onAssign,
  onMarkConfirmed,
  onMarkCompleted,
  onCancel,
}: BookingDetailsPanelProps) {
  if (!booking) return null;

  const assignedDriver = drivers.find((d) => d.id === booking.assignedDriverId);
  const availableDrivers = drivers.filter((driver) => driver.availabilityStatus === "available");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <section className="h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Booking {booking.id}</h3>
            <p className="text-sm text-gray-500">Requested {new Date(booking.createdAt).toLocaleString()}</p>
          </div>
          <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Customer</p>
            <p className="text-sm font-semibold text-gray-900">{booking.customerName}</p>
            <p className="text-sm text-gray-600">{booking.customerPhone}</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Trip Route</p>
            <p className="text-sm font-semibold text-gray-900">{booking.pickupLocation}</p>
            <p className="text-xs text-gray-500">to</p>
            <p className="text-sm font-semibold text-gray-900">{booking.dropoffLocation}</p>
            <p className="mt-2 text-xs text-gray-500">Pickup time: {booking.pickupTime}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl border border-gray-200 p-4">
            <div>
              <p className="text-xs text-gray-500">Fare</p>
              <p className="text-sm font-semibold text-gray-900">GMD {booking.estimatedFare}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="text-sm font-semibold text-gray-900">{booking.paymentMethod}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ride Status</p>
              <StatusBadge status={booking.rideStatus} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Status</p>
              <StatusBadge status={booking.paymentStatus} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Assigned Driver</p>
            <p className="text-sm font-semibold text-gray-900">
              {assignedDriver ? `${assignedDriver.name} (${assignedDriver.vehiclePlate})` : "Not assigned"}
            </p>

            <div className="mt-3 flex gap-2">
              <select
                defaultValue=""
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                onChange={(e) => {
                  if (e.target.value) onAssign(e.target.value);
                }}
              >
                <option value="">Assign available driver</option>
                {availableDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} - {driver.vehiclePlate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {booking.notes ? (
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Notes</p>
              <p className="text-sm text-gray-700">{booking.notes}</p>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onMarkConfirmed}
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
              type="button"
            >
              Mark Confirmed
            </button>
            <button
              onClick={onMarkCompleted}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
              type="button"
            >
              Mark Completed
            </button>
            <button
              onClick={onCancel}
              className="col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
              type="button"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
