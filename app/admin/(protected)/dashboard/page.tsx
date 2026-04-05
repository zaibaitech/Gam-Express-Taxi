'use client';

import Link from "next/link";
import LiveActivityFeed from "@/components/admin/LiveActivityFeed";
import StatusBadge from "@/components/admin/StatusBadge";
import SummaryStatCard from "@/components/admin/SummaryStatCard";
import { useAdminData } from "@/components/admin/AdminDataProvider";

export default function AdminDashboardPage() {
  const { bookings, drivers, payments, activity } = useAdminData();

  const todayBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => ["new-request", "pending-confirmation"].includes(b.rideStatus)).length;
  const assignedRides = bookings.filter((b) => b.rideStatus === "assigned").length;
  const completedRides = bookings.filter((b) => b.rideStatus === "completed").length;
  const paidRides = bookings.filter((b) => b.paymentStatus === "paid").length;
  const revenueToday = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const activeDrivers = drivers.filter((d) => d.availabilityStatus === "assigned" || d.availabilityStatus === "on-trip").length;
  const availableTaxis = drivers.filter((d) => d.availabilityStatus === "available").length;

  const bars = [
    { label: "Pending", value: pendingBookings, color: "bg-amber-500" },
    { label: "Assigned", value: assignedRides, color: "bg-indigo-500" },
    { label: "Completed", value: completedRides, color: "bg-emerald-500" },
  ];
  const maxBar = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="space-y-6">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryStatCard title="Total Bookings Today" value={`${todayBookings}`} icon="BK" />
        <SummaryStatCard title="Pending Bookings" value={`${pendingBookings}`} icon="PD" />
        <SummaryStatCard title="Assigned Rides" value={`${assignedRides}`} icon="AS" />
        <SummaryStatCard title="Completed Rides" value={`${completedRides}`} icon="CP" />
        <SummaryStatCard title="Paid Rides" value={`${paidRides}`} icon="PA" />
        <SummaryStatCard title="Revenue Today" value={`GMD ${revenueToday}`} icon="RV" />
        <SummaryStatCard title="Active Drivers" value={`${activeDrivers}`} icon="DR" />
        <SummaryStatCard title="Available Taxis" value={`${availableTaxis}`} icon="TX" />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Daily Ride Summary</h2>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {bars.map((bar) => (
              <div key={bar.label} className="rounded-xl border border-gray-100 p-3">
                <p className="text-xs font-semibold text-gray-500">{bar.label}</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{bar.value}</p>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-2 rounded-full ${bar.color}`}
                    style={{ width: `${(bar.value / maxBar) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Link href="/admin/bookings" className="rounded-lg bg-gray-900 px-3 py-2.5 text-center text-sm font-semibold text-white">
              View Bookings
            </Link>
            <Link href="/admin/bookings" className="rounded-lg border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-gray-700">
              Assign Driver
            </Link>
            <Link href="/admin/payments" className="rounded-lg border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-gray-700">
              View Payments
            </Link>
            <Link href="/admin/drivers" className="rounded-lg border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-gray-700">
              Manage Drivers
            </Link>
          </div>
        </article>

        <LiveActivityFeed items={activity} />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Recent Booking Requests</h2>
          <Link href="/admin/bookings" className="text-xs font-semibold text-sky-700">
            Open all
          </Link>
        </div>
        <div className="space-y-2">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="grid gap-2 rounded-xl border border-gray-100 p-3 md:grid-cols-6 md:items-center">
              <p className="text-sm font-semibold text-gray-900 md:col-span-1">{booking.id}</p>
              <p className="text-sm text-gray-700 md:col-span-1">{booking.customerName}</p>
              <p className="text-sm text-gray-700 md:col-span-2">{booking.pickupLocation} to {booking.dropoffLocation}</p>
              <p className="text-sm font-semibold text-gray-900 md:col-span-1">GMD {booking.estimatedFare}</p>
              <div className="md:col-span-1">
                <StatusBadge status={booking.rideStatus} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
