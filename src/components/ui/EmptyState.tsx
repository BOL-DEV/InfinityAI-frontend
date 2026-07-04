import React from 'react';
import { Database } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = 'No knowledge saved yet',
  description = 'Save articles and webpages using the Chrome extension to build your AI second brain.',
  actionText = 'Start Saving Pages',
  actionHref = '/',
}: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-5 max-w-lg mx-auto mt-6">
      <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-primary">
        <Database className="h-8 w-8" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-text-primary tracking-tight">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
      <Link href={actionHref}>
        <Button variant="primary" className="px-5">
          {actionText}
        </Button>
      </Link>
    </div>
  );
}
