'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasAuthCookie = document.cookie.includes("admin_auth=1");

    if (!hasAuthCookie && pathname !== "/admin/login") {
      router.replace("/admin/login");
      return;
    }

    if (hasAuthCookie && pathname === "/admin/login") {
      router.replace("/admin/dashboard");
      return;
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return <div className="p-6 text-sm text-gray-600">Checking admin access...</div>;
  }

  return <>{children}</>;
}
