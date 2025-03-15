import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export default function InstrumentsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Financial Instruments</h1>
        <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Instruments browser coming in v0.2.0
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
