import { DriverAvailability, PaymentStatus, RideStatus } from "@/types/admin";

type AdminBadgeKind = RideStatus | PaymentStatus | DriverAvailability;

interface StatusBadgeProps {
  status: AdminBadgeKind;
}

const map: Record<AdminBadgeKind, { label: string; className: string }> = {
  "new-request": { label: "New Request", className: "bg-sky-100 text-sky-700" },
  "pending-confirmation": { label: "Pending", className: "bg-amber-100 text-amber-700" },
  assigned: { label: "Assigned", className: "bg-indigo-100 text-indigo-700" },
  "in-progress": { label: "In Progress", className: "bg-violet-100 text-violet-700" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-rose-100 text-rose-700" },
  unpaid: { label: "Unpaid", className: "bg-slate-100 text-slate-700" },
  "pending-mobile-money": {
    label: "Pending MM",
    className: "bg-orange-100 text-orange-700",
  },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700" },
  available: { label: "Available", className: "bg-emerald-100 text-emerald-700" },
  "on-trip": { label: "On Trip", className: "bg-violet-100 text-violet-700" },
  offline: { label: "Offline", className: "bg-gray-100 text-gray-700" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const item = map[status];
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.className}`}>
      {item.label}
    </span>
  );
}
