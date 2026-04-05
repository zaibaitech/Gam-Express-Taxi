'use client';

import { useState } from "react";
import DriverCard from "@/components/admin/DriverCard";
import EmptyState from "@/components/admin/EmptyState";
import SummaryStatCard from "@/components/admin/SummaryStatCard";
import AddDriverModal from "@/components/admin/AddDriverModal";
import { useAdminData } from "@/components/admin/AdminDataProvider";

export default function AdminDriversPage() {
  const { drivers, bookings } = useAdminData();
  const [showModal, setShowModal] = useState(false);

  const available = drivers.filter((d) => d.availabilityStatus === "available").length;
  const assigned = drivers.filter((d) => d.availabilityStatus === "assigned").length;
  const onTrip = drivers.filter((d) => d.availabilityStatus === "on-trip").length;
  const offline = drivers.filter((d) => d.availabilityStatus === "offline").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Drivers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          + Add Driver
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryStatCard title="Available Drivers" value={`${available}`} icon="AV" />
        <SummaryStatCard title="Assigned Drivers" value={`${assigned}`} icon="AS" />
        <SummaryStatCard title="Drivers On Trip" value={`${onTrip}`} icon="TR" />
        <SummaryStatCard title="Offline Drivers" value={`${offline}`} icon="OF" />
      </section>

      {drivers.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {drivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} bookings={bookings} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No drivers configured"
          description="Add your first driver profile to start manual assignments."
        />
      )}

      {showModal && <AddDriverModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
