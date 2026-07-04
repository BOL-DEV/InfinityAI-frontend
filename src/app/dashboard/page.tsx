'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Topbar from '@/components/layout/Topbar';
import StatCard from '@/components/ui/StatCard';
import MemoryCard from '@/components/ui/MemoryCard';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import { ApiClient } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Database, Share2 } from 'lucide-react';

export default function DashboardHome() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('Welcome 👋');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 18) setGreeting('Good Afternoon 🌤️');
    else setGreeting('Good Evening 👋');
  }, []);

  // Fetch memories reactively
  const { data: memories, isLoading, isError } = useQuery({
    queryKey: ['memories', searchQuery],
    queryFn: () => ApiClient.fetchMemories(searchQuery),
  });

  // Delete memory mutation
  const deleteMutation = useMutation({
    mutationFn: (url: string) => ApiClient.deleteMemory(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
    },
  });

  return (
    <DashboardLayout>
      <Topbar title="Dashboard" />
      
      <main className="flex-grow p-6 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <section className="flex flex-col gap-1.5 animate-in fade-in duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">{greeting}</h2>
          <p className="text-sm text-text-secondary">Welcome back. Here is an overview of your knowledge base.</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Total Memories"
            value={isLoading ? '...' : memories?.length ?? 0}
            icon={<Database className="h-4.5 w-4.5" />}
            description="Sanitized webpage summaries"
          />
          <StatCard
            title="Recent Searches"
            value="12"
            icon={<Search className="h-4.5 w-4.5" />}
            description="Queries processed this week"
          />
          <StatCard
            title="Knowledge Connections"
            value={(memories?.length ?? 0) > 0 ? (memories?.length ?? 0) * 2 + 3 : 0}
            icon={<Share2 className="h-4.5 w-4.5" />}
            description="Dynamic semantic relations"
          />
        </section>

        {/* Search Bar Context */}
        <section className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border text-text-primary rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </section>

        {/* Recent Memories Section */}
        <section className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border pb-2">
            Recent Memories
          </h3>

          {isLoading ? (
            <LoadingState type="card" count={3} />
          ) : isError ? (
            <div className="text-sm text-red-400">Failed to load memories. Check backend connection.</div>
          ) : !memories || memories.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {memories.slice(0, 3).map((item, index) => (
                <MemoryCard
                  key={`${item.url}-${index}`}
                  title={item.title}
                  url={item.url}
                  snippet={item.content && item.content.length > 150 ? `${item.content.substring(0, 150)}...` : (item.content || 'No description available.')}
                  timestamp={item.timestamp}
                  onDelete={() => deleteMutation.mutate(item.url)}
                  isDeleting={deleteMutation.variables === item.url && deleteMutation.isPending}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </DashboardLayout>
  );
}
