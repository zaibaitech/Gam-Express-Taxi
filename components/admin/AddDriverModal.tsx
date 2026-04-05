'use client';

import { useState } from "react";
import { useAdminData } from "@/components/admin/AdminDataProvider";

interface AddDriverModalProps {
  onClose: () => void;
}

export default function AddDriverModal({ onClose }: AddDriverModalProps) {
  const { addDriver } = useAdminData();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleName: "",
    vehiclePlate: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.vehicleName || !form.vehiclePlate) {
      setError("All fields are required.");
      return;
    }
    addDriver(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Add New Driver</h2>
        <p className="text-sm text-gray-500 mb-5">Fill in the driver's details to add them to the fleet.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ousman Jallow"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. +220 775 1234"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
            <input
              type="text"
              placeholder="e.g. Toyota Vitz"
              value={form.vehicleName}
              onChange={(e) => setForm((f) => ({ ...f, vehicleName: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Plate</label>
            <input
              type="text"
              placeholder="e.g. BJL 4321 A"
              value={form.vehiclePlate}
              onChange={(e) => setForm((f) => ({ ...f, vehiclePlate: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
