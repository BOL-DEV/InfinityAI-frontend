'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { ApiClient, ChatSessionPreview } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Search } from 'lucide-react';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const activeChatId = params.chatId as string | undefined;

  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1. Fetch previous chat sessions
  const { data: chats = [], isLoading: isChatsLoading } = useQuery<ChatSessionPreview[]>({
    queryKey: ['chats'],
    queryFn: () => ApiClient.fetchChats(),
  });

  // 2. Create Chat Mutation
  const createChatMutation = useMutation({
    mutationFn: () => ApiClient.createChat(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      router.push(`/chat/${data.chatId}`);
    },
  });

  // 3. Delete Chat Mutation
  const deleteChatMutation = useMutation({
    mutationFn: (chatId: string) => ApiClient.deleteChat(chatId),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      setDeletingId(null);
      // If the deleted chat was currently open, redirect to chat home
      if (activeChatId === deletedId) {
        router.push('/chat');
      }
    },
  });

  // Time-ago formatting utility
  const formatTimeAgo = (dateStr: string) => {
    if (!dateStr) return 'Recently';
    try {
      const now = new Date();
      const date = new Date(dateStr);
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffSec < 60) return 'Just now';
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHr < 24) return `${diffHr}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return 'Last week';
    } catch {
      return 'Recently';
    }
  };

  // Filter chats by title matching search query
  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteChatMutation.mutate(deletingId);
    }
  };

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      {/* Left Sub-Sidebar: Chat History Lists */}
      <aside className="w-64 border-r border-border bg-[#0a0e17] flex flex-col justify-between hidden md:flex shrink-0">
        <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-grow">
          {/* New Chat Trigger */}
          <Button
            variant="primary"
            onClick={() => createChatMutation.mutate()}
            loading={createChatMutation.isPending}
            className="w-full text-xs py-2 px-3 gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>

          {/* Title Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-secondary border border-border text-xs text-text-primary rounded-lg focus:outline-none focus:border-indigo-500 transition-colors animate-in fade-in duration-300"
            />
          </div>

          {/* List */}
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-2 mb-1.5 select-none">
              Conversations
            </span>

            {isChatsLoading ? (
              <div className="flex flex-col gap-2 p-2">
                <div className="h-10 bg-white/5 animate-pulse rounded-md" />
                <div className="h-10 bg-white/5 animate-pulse rounded-md" />
                <div className="h-10 bg-white/5 animate-pulse rounded-md" />
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="text-xs text-text-muted px-2 py-4 italic select-none">
                {searchQuery ? 'No matching chats' : 'No chats yet'}
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`group flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border border-transparent ${
                    activeChatId === chat.chatId
                      ? 'bg-white/5 text-white border-white/5'
                      : 'text-text-secondary hover:bg-white/2 hover:text-text-primary'
                  }`}
                >
                  <button
                    onClick={() => router.push(`/chat/${chat.chatId}`)}
                    className="flex flex-col gap-0.5 flex-1 text-left min-w-0 cursor-pointer"
                  >
                    <span className="truncate pr-1 font-bold text-white group-hover:text-indigo-400 transition-colors" title={chat.title}>
                      {chat.title}
                    </span>
                    <span className="text-[10px] text-text-muted font-normal">
                      {formatTimeAgo(chat.updatedAt)}
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingId(chat.chatId);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-0.5 rounded cursor-pointer transition-opacity shrink-0"
                    title="Delete chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Right Dynamic Children Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        {children}
      </div>

      {/* Delete Confirmation Modal Dialog */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="glass-panel max-w-sm w-full p-6 flex flex-col gap-4 border border-white/10 rounded-2xl animate-in scale-in duration-200">
            <h3 className="text-base font-bold text-white">Delete Conversation?</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              This will permanently erase all message history inside this chat session from Cognee. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => setDeletingId(null)}
                className="text-xs py-1.5 px-4"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                loading={deleteChatMutation.isPending}
                className="text-xs py-1.5 px-4 bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
