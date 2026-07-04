import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export default function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col gap-3 hover:border-indigo-500/20 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{title}</span>
        <div className="text-primary p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          {icon}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight text-text-primary">{value}</span>
        {description && (
          <span className="text-xs text-text-secondary">{description}</span>
        )}
      </div>
    </div>
  );
}
