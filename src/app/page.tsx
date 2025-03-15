import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-2xl px-6 py-12 bg-white dark:bg-dark-card rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-dark-text">
          Financial Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          An advanced dashboard for financial data visualization and analysis
        </p>
        <div className="flex justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
