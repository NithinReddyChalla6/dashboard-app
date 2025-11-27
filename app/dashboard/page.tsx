import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import InvoiceStatusChart from '@/app/ui/dashboard/invoice-status-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchRevenue, fetchCardData } from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const cardData = await fetchCardData();

  return (
    <main className="p-6 md:p-10">
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenue} />
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <InvoiceStatusChart 
            totalPaid={Number(cardData.totalPaidInvoices)} 
            totalPending={Number(cardData.totalPendingInvoices)}
          />
        </Suspense>
      </div>
      <div className="mt-6">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
