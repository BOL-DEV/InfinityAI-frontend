'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Topbar from '@/components/layout/Topbar';
import ChatBubble from '@/components/ui/ChatBubble';
import ChatInput from '@/components/ui/ChatInput';
import EmptyChat from '@/components/ui/EmptyChat';
import TypingIndicator from '@/components/ui/TypingIndicator';
import LoadingState from '@/components/ui/LoadingState';
import Button from '@/components/ui/Button';
import { ApiClient } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

export default function ChatSessionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  
  const chatId = params.chatId as string;
  const msgParam = searchParams.get('msg');

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch specific chat session messages
  const {
    data: chatDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ['chatDetails', chatId],
    queryFn: () => ApiClient.fetchChatDetails(chatId),
    enabled: !!chatId,
  });

  // 2. Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ msg }: { msg: string }) =>
      ApiClient.sendChatMessage(chatId, msg),
    onMutate: async ({ msg }) => {
      // Optimistically append the user message locally
      await queryClient.cancelQueries({ queryKey: ['chatDetails', chatId] });
      const previousDetails = queryClient.getQueryData(['chatDetails', chatId]);

      queryClient.setQueryData(['chatDetails', chatId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          messages: [
            ...old.messages,
            {
              id: 'temp-' + Date.now(),
              role: 'user',
              content: msg,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      });

      setInputText('');
      return { previousDetails };
    },
    onSuccess: () => {
      // Invalidate chats to update the title on the sidebar if it was the first message
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['chatDetails', chatId] });
    },
    onError: (err, variables, context: any) => {
      if (context?.previousDetails) {
        queryClient.setQueryData(['chatDetails', chatId], context.previousDetails);
      }
    },
  });

  const initialProcessedRef = useRef(false);

  // Trigger query param message redirect
  useEffect(() => {
    if (msgParam && chatDetails && !initialProcessedRef.current) {
      initialProcessedRef.current = true;
      sendMessageMutation.mutate({ msg: msgParam });
      router.replace(`/chat/${chatId}`);
    }
  }, [msgParam, chatDetails, chatId, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatDetails?.messages, sendMessageMutation.isPending]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    sendMessageMutation.mutate({ msg: inputText });
  };

  const handleSelectPrompt = (promptText: string) => {
    sendMessageMutation.mutate({ msg: promptText });
  };

  return (
    <>
      <Topbar title={chatDetails?.title || 'Loading Chat...'} />

      {/* Main Conversation Stream */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scroll-smooth">
        {isDetailsLoading ? (
          <div className="max-w-3xl mx-auto w-full pt-10">
            <LoadingState type="list" count={4} />
          </div>
        ) : isDetailsError ? (
          <div className="flex flex-col items-center justify-center gap-4 text-center p-12 max-w-md mx-auto my-auto glass-panel rounded-2xl border-red-500/20 bg-red-950/10 animate-in fade-in duration-300">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Connection Error</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Could not retrieve chat session from Cognee database. Please check if your backend server is responsive.
            </p>
            <Button
              variant="secondary"
              onClick={() => refetchDetails()}
              className="text-xs py-1.5 px-4 mt-2"
            >
              Retry Connection
            </Button>
          </div>
        ) : chatDetails && chatDetails.messages.length === 0 ? (
          <EmptyChat onSelectPrompt={handleSelectPrompt} />
        ) : (
          <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-10">
            {chatDetails?.messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                sources={msg.sources}
              />
            ))}

            {sendMessageMutation.isPending && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input container */}
      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSubmit={handleSendMessage}
        disabled={sendMessageMutation.isPending || isDetailsLoading}
      />
    </>
  );
}
