'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "OV" },
  { href: "/admin/bookings", label: "Bookings", icon: "BK" },
  { href: "/admin/drivers", label: "Drivers", icon: "DR" },
  { href: "/admin/payments", label: "Payments", icon: "PY" },
  { href: "/admin/settings", label: "Settings", icon: "ST" },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open ? <button aria-label="Close menu" className="fixed inset-0 z-30 bg-black/35 lg:hidden" onClick={onClose} /> : null}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-gray-200 bg-white p-5 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white">
            GT
          </div>
          <div>
            <p className="font-bold text-gray-900">Gam Express Taxi</p>
            <p className="text-xs text-gray-500">Admin Command Center</p>
          </div>
        </div>

        <nav className="space-y-2">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-sky-50 text-sky-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          Mobile money payments improve transparency and speed up booking confirmations.
        </div>
      </aside>
    </>
  );
}
