export default function AdminSettingsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Business Information</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-gray-700">
            Business Name
            <input
              defaultValue="City Taxi Gambia"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Support Phone
            <input
              defaultValue="+220 345 6789"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Default Fare Rules</h2>
        <p className="mt-1 text-sm text-gray-600">
          Placeholder for base fare, per-km logic, and scheduled booking surcharges.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-gray-700">
            Base Fare (GMD)
            <input
              defaultValue="50"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Per KM (GMD)
            <input
              defaultValue="15"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Night Surcharge (%)
            <input
              defaultValue="10"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Payment Preferences</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            Mobile Money (Preferred)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            Cash on Pickup (Optional)
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
        <p className="mt-1 text-sm text-gray-600">
          Placeholder for SMS alerts, payment alerts, and dispatcher reminders.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
            type="button"
          >
            Save Settings
          </button>
          <button
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            type="button"
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
}
