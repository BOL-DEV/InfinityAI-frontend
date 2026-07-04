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
