import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholders para widgets futuros */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6 h-64 flex items-center justify-center border border-gray-100 dark:border-dark-border">
            <p className="text-gray-400 dark:text-gray-500">Chart Widget (Coming Soon)</p>
          </div>
          <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6 h-64 flex items-center justify-center border border-gray-100 dark:border-dark-border">
            <p className="text-gray-400 dark:text-gray-500">Market Overview (Coming Soon)</p>
          </div>
          <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6 h-64 flex items-center justify-center border border-gray-100 dark:border-dark-border">
            <p className="text-gray-400 dark:text-gray-500">Watchlist (Coming Soon)</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
