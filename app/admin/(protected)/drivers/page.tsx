'use client';

import DriverCard from "@/components/admin/DriverCard";
import EmptyState from "@/components/admin/EmptyState";
import SummaryStatCard from "@/components/admin/SummaryStatCard";
import { useAdminData } from "@/components/admin/AdminDataProvider";

export default function AdminDriversPage() {
  const { drivers, bookings } = useAdminData();

  const available = drivers.filter((d) => d.availabilityStatus === "available").length;
  const assigned = drivers.filter((d) => d.availabilityStatus === "assigned").length;
  const onTrip = drivers.filter((d) => d.availabilityStatus === "on-trip").length;
  const offline = drivers.filter((d) => d.availabilityStatus === "offline").length;

  return (
    <div className="space-y-5">
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
    </div>
  );
}
