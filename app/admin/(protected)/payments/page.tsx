'use client';

import PaymentTable from "@/components/admin/PaymentTable";
import SummaryStatCard from "@/components/admin/SummaryStatCard";
import { useAdminData } from "@/components/admin/AdminDataProvider";

export default function AdminPaymentsPage() {
  const { payments } = useAdminData();

  const totalPaymentsToday = payments.length;
  const mobileMoney = payments.filter((p) => p.method === "mobile-money").length;
  const cashBookings = payments.filter((p) => p.method === "cash").length;
  const failedOrPending = payments.filter((p) => p.status === "failed" || p.status === "pending-mobile-money").length;

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryStatCard title="Total Payments Today" value={`${totalPaymentsToday}`} icon="TP" />
        <SummaryStatCard title="Mobile Money" value={`${mobileMoney}`} icon="MM" />
        <SummaryStatCard title="Cash Bookings" value={`${cashBookings}`} icon="CS" />
        <SummaryStatCard title="Failed / Pending" value={`${failedOrPending}`} icon="AL" />
      </section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Mobile money payments are preferred for transparency and faster booking confirmation.
      </div>

      <PaymentTable payments={payments} />
    </div>
  );
}
