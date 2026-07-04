'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/layout/Topbar';
import EmptyChat from '@/components/ui/EmptyChat';
import ChatInput from '@/components/ui/ChatInput';
import { ApiClient } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ChatLandingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputText, setInputText] = useState('');

  // Create chat session mutation
  const createChatMutation = useMutation({
    mutationFn: (initialMsg?: string) => ApiClient.createChat(),
    onSuccess: (data, initialMsg) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      if (initialMsg) {
        router.push(`/chat/${data.chatId}?msg=${encodeURIComponent(initialMsg)}`);
      } else {
        router.push(`/chat/${data.chatId}`);
      }
    },
  });

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    createChatMutation.mutate(inputText);
  };

  const handleSelectPrompt = (promptText: string) => {
    createChatMutation.mutate(promptText);
  };

  return (
    <>
      <Topbar title="Ask Knowledge" />

      {/* Main Container */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col justify-center scroll-smooth">
        <EmptyChat onSelectPrompt={handleSelectPrompt} />
      </div>

      {/* Input container */}
      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSubmit={handleSendMessage}
        disabled={createChatMutation.isPending}
      />
    </>
  );
}
