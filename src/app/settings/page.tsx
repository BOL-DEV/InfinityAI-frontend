'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Topbar from '@/components/layout/Topbar';
import Button from '@/components/ui/Button';
import { ApiClient } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState('');

  // Forget everything parallel deletion mutation
  const forgetAllMutation = useMutation({
    mutationFn: () => ApiClient.forgetAll(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
      setSuccessMessage(data.message || 'All memories forgotten successfully.');
      // Clear notification after 4 seconds
      setTimeout(() => setSuccessMessage(''), 4000);
    },
  });

  return (
    <DashboardLayout>
      <Topbar title="Settings" />

      <main className="flex-grow p-6 md:p-8 max-w-3xl mx-auto w-full flex flex-col gap-8">
        <section className="flex flex-col gap-1.5 border-b border-border pb-4 animate-in fade-in duration-300">
          <h2 className="text-xl font-bold text-white tracking-tight">System Settings</h2>
          <p className="text-sm text-text-secondary">Configure credentials, integrations, and database operations.</p>
        </section>

        {/* Chrome Extension Setup */}
        <section className="flex flex-col gap-4 animate-in fade-in duration-400">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Chrome Extension Setup
          </h3>

          <div className="glass-panel border-indigo-500/20 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-white">Install Memory Assistant</span>
              <p className="text-xs text-text-secondary leading-relaxed">
                Save articles, blogs, and documentation directly into your knowledge base as you browse the web.
              </p>
            </div>

            <div className="border-t border-border/40 pt-4 flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">1</span>
                <span className="text-xs text-white">
                  Download the extension folder from your <a href="https://github.com/BOL-DEV/InfinityAI-extension" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">GitHub repository</a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">2</span>
                <span className="text-xs text-white">
                  Navigate to <code className="bg-black/40 px-1.5 py-0.5 rounded border border-border/60 text-[10px] text-indigo-300">chrome://extensions/</code> in Google Chrome
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">3</span>
                <span className="text-xs text-white">
                  Enable <strong>Developer Mode</strong> in the top-right corner
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">4</span>
                <span className="text-xs text-white">
                  Click <strong>Load unpacked</strong> and select the extension's <code className="bg-black/40 px-1.5 py-0.5 rounded border border-border/60 text-[10px] text-indigo-300">dist</code> folder
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone Section */}
        <section className="flex flex-col gap-4 animate-in fade-in duration-500">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-500 flex items-center gap-2">
            <AlertTriangle className="h-4.5 w-4.5" />
            Danger Zone
          </h3>

          <div className="glass-panel border-red-500/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-md">
              <span className="text-sm font-bold text-white">Forget Everything</span>
              <span className="text-xs text-text-secondary leading-relaxed">
                Permanently delete all saved articles and semantic memory indexes from the database. This action is irreversible.
              </span>
            </div>

            <Button
              variant="danger"
              loading={forgetAllMutation.isPending}
              onClick={() => {
                if (
                  confirm(
                    'Are you sure you want to permanently delete all saved pages? This action is irreversible.'
                  )
                ) {
                  forgetAllMutation.mutate();
                }
              }}
              className="px-5 shrink-0"
            >
              Forget Everything
            </Button>
          </div>
        </section>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm animate-in fade-in duration-300">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
