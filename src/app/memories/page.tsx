'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Topbar from '@/components/layout/Topbar';
import MemoryCard from '@/components/ui/MemoryCard';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import { ApiClient } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export default function MemoryLibrary() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch memories reactively
  const { data: memories, isLoading, isError } = useQuery({
    queryKey: ['memories', searchQuery],
    queryFn: () => ApiClient.fetchMemories(searchQuery),
  });

  // Delete specific memory mutation
  const deleteMutation = useMutation({
    mutationFn: (url: string) => ApiClient.deleteMemory(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
    },
  });

  return (
    <DashboardLayout>
      <Topbar title="Memory Library">
        {/* Topbar Filter Search Bar */}
        <div className="relative w-48 sm:w-64 md:w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter memories..."
            className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border text-text-primary rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </Topbar>

      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <LoadingState type="card" count={6} />
        ) : isError ? (
          <div className="text-sm text-red-400">Failed to load memories database. Check server backend.</div>
        ) : !memories || memories.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No matching memories found' : 'No knowledge saved yet'}
            description={
              searchQuery
                ? `No saved items match the filter phrase "${searchQuery}". Try editing your query.`
                : 'Save articles and webpages using the Chrome extension to build your AI second brain.'
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {memories.map((item, index) => (
                <MemoryCard
                  key={`${item.url}-${index}`}
                  title={item.title}
                  url={item.url}
                  snippet={
                    item.content && item.content.length > 220
                      ? `${item.content.substring(0, 220)}...`
                      : (item.content || 'No description available.')
                  }
                  timestamp={item.timestamp}
                  onDelete={() => deleteMutation.mutate(item.url)}
                  isDeleting={deleteMutation.variables === item.url && deleteMutation.isPending}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
