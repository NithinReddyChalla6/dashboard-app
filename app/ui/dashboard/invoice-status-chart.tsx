import { lusitana } from '@/app/ui/fonts';

export default async function InvoiceStatusChart({
  totalPending,
  totalPaid,
}: {
  totalPending: number;
  totalPaid: number;
}) {
  const total = totalPending + totalPaid;
  const paidPercentage = total > 0 ? (totalPaid / total) * 100 : 0;
  const pendingPercentage = 100 - paidPercentage;

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Invoice Status
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="mb-4"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={`${(paidPercentage / 100) * 503.3} 503.3`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
        </div>
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-300"></div>
            <p className="text-sm">Paid: ${totalPaid.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
            <p className="text-sm">Pending: ${totalPending.toLocaleString()}</p>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <p className="text-sm font-medium">
              {paidPercentage.toFixed(1)}% Paid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
