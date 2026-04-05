'use client';

import { usePathname, useRouter } from "next/navigation";

const titles: Record<string, string> = {
  "/admin/dashboard": "Dashboard Overview",
  "/admin/bookings": "Bookings Management",
  "/admin/drivers": "Driver Operations",
  "/admin/payments": "Payments Monitoring",
  "/admin/settings": "Business Settings",
};

interface AdminHeaderProps {
  onMenuOpen: () => void;
}

export default function AdminHeader({ onMenuOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const title = titles[pathname] ?? "Admin";

  const handleLogout = () => {
    document.cookie = "admin_auth=; Max-Age=0; path=/";
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuOpen}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 lg:hidden"
          >
            Menu
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 lg:text-xl">{title}</h1>
            <p className="text-xs text-gray-500">Operational control for your 4-taxi fleet</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 md:flex">
            <span className="text-xs font-semibold text-gray-500">Search</span>
            <input
              className="w-28 border-0 bg-transparent text-sm outline-none lg:w-44"
              placeholder="Bookings, drivers..."
              disabled
            />
          </div>
          <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700" type="button">
            Bell
          </button>
          <div className="hidden rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-white sm:block">
            Admin
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
