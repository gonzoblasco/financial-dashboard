'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { PropsWithChildren } from 'react';

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
