import { Payment } from "@/types/admin";
import StatusBadge from "@/components/admin/StatusBadge";

interface PaymentTableProps {
  payments: Payment[];
}

export default function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[850px]">
        <thead>
          <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="px-4 py-3">Payment ID</th>
            <th className="px-4 py-3">Booking ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Method</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t border-gray-100 text-sm">
              <td className="px-4 py-3 font-semibold text-gray-900">{payment.id}</td>
              <td className="px-4 py-3 text-gray-700">{payment.bookingId}</td>
              <td className="px-4 py-3 text-gray-700">{payment.customerName}</td>
              <td className="px-4 py-3 font-semibold text-gray-900">GMD {payment.amount}</td>
              <td className="px-4 py-3 capitalize text-gray-700">{payment.method.replace("-", " ")}</td>
              <td className="px-4 py-3">
                <StatusBadge status={payment.status} />
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
