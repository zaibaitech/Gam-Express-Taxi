import { BookingFilters, Driver, PaymentStatus, RideStatus } from "@/types/admin";

interface FilterBarProps {
  filters: BookingFilters;
  onChange: (filters: BookingFilters) => void;
  drivers: Driver[];
}

const statusOptions: Array<RideStatus | "all"> = [
  "all",
  "new-request",
  "pending-confirmation",
  "assigned",
  "in-progress",
  "completed",
  "cancelled",
];

const paymentOptions: Array<PaymentStatus | "all"> = [
  "all",
  "unpaid",
  "pending-mobile-money",
  "paid",
  "failed",
];

export default function FilterBar({ filters, onChange, drivers }: FilterBarProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-4">
      <label className="text-xs font-semibold text-gray-500">
        Ride Status
        <select
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as RideStatus | "all" })}
        >
          {statusOptions.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All" : item}
            </option>
          ))}
        </select>
      </label>

      <label className="text-xs font-semibold text-gray-500">
        Payment Status
        <select
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
          value={filters.paymentStatus}
          onChange={(e) =>
            onChange({ ...filters, paymentStatus: e.target.value as PaymentStatus | "all" })
          }
        >
          {paymentOptions.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All" : item}
            </option>
          ))}
        </select>
      </label>

      <label className="text-xs font-semibold text-gray-500">
        Driver
        <select
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
          value={filters.driverId}
          onChange={(e) => onChange({ ...filters, driverId: e.target.value })}
        >
          <option value="all">All Drivers</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-xs font-semibold text-gray-500">
        Requested Date
        <input
          type="date"
          value={filters.date}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
          onChange={(e) => onChange({ ...filters, date: e.target.value })}
        />
      </label>
    </div>
  );
}
