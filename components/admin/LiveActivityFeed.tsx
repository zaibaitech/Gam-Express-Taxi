import { AdminActivityItem } from "@/types/admin";

interface LiveActivityFeedProps {
  items: AdminActivityItem[];
}

function getDotColor(type: AdminActivityItem["type"]) {
  if (type === "new-booking") return "bg-sky-600";
  if (type === "driver-assigned") return "bg-indigo-600";
  if (type === "payment-updated") return "bg-emerald-600";
  return "bg-amber-600";
}

export default function LiveActivityFeed({ items }: LiveActivityFeedProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Live Booking Activity</h2>
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Live</span>
      </div>
      <ul className="space-y-3">
        {items.slice(0, 8).map((item) => (
          <li key={item.id} className="rounded-xl border border-gray-100 p-3">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${getDotColor(item.type)}`} />
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              {item.isNew ? (
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">New</span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-gray-600">{item.message}</p>
            <p className="mt-1 text-[11px] text-gray-400">{new Date(item.createdAt).toLocaleTimeString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
