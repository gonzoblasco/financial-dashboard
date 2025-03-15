import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export default function WatchlistPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Watchlist</h1>
        <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Watchlist functionality coming in v0.3.0
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
