'use client';

import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';

export function Header() {
  const { themeMode, setThemeMode } = useTheme();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <header className="h-16 px-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text">
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-card"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-semibold">Financial Dashboard</h1>
      </div>

      <div className="flex items-center">
        <div className="relative mr-4">
          <select
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value as any)}
            className="appearance-none bg-gray-100 dark:bg-dark-card px-3 py-1.5 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        <button className="p-2 rounded-full bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
