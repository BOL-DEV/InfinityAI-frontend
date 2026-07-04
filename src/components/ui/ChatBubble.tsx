import React from 'react';
import { Sparkles } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import SourcesList from './SourcesList';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  sources?: { title: string; url: string; snippet: string }[];
}

export function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3 justify-end self-end max-w-[85%] animate-in fade-in duration-300">
      <div className="flex flex-col gap-1 items-end">
        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest font-mono mr-1">
          You
        </span>
        <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-sm shadow-md leading-relaxed select-text">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
      <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 font-bold text-xs select-none">
        U
      </div>
    </div>
  );
}

export function AssistantBubble({
  content,
  sources,
}: {
  content: string;
  sources?: { title: string; url: string; snippet: string }[];
}) {
  return (
    <div className="flex items-start gap-4 self-start max-w-[85%] animate-in fade-in duration-300">
      <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-primary shrink-0 select-none">
        <Sparkles className="h-4 w-4 text-indigo-400" />
      </div>
      <div className="flex flex-col gap-1 pt-0.5 w-full">
        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest font-mono">
          InfinityAI
        </span>
        <div className="mt-1 flex flex-col w-full">
          <MarkdownRenderer content={content} />
          {sources && sources.length > 0 && <SourcesList sources={sources} />}
        </div>
      </div>
    </div>
  );
}

export default function ChatBubble({ role, content, sources }: ChatBubbleProps) {
  if (role === 'user') {
    return <UserBubble content={content} />;
  }
  return <AssistantBubble content={content} sources={sources} />;
}
