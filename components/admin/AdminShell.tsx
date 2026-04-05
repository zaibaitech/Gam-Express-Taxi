'use client';

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDataProvider from "@/components/admin/AdminDataProvider";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AdminDataProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="lg:pl-72">
          <AdminHeader onMenuOpen={() => setMenuOpen(true)} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AdminDataProvider>
  );
}
