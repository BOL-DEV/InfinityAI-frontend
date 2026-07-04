import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary flex">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Dashboard Frame */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
