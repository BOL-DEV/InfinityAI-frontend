'use client';

import React, { useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import Button from './Button';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6 pt-2 bg-gradient-to-t from-[#090d16] via-[#090d16]/95 to-transparent z-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim() && !disabled) onSubmit();
        }}
        className="glass-panel border border-white/5 rounded-xl p-2 flex items-end gap-2.5 shadow-2xl shadow-black/40 hover:border-indigo-500/25 focus-within:border-indigo-500/40 transition-colors duration-200"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything you've previously read..."
          disabled={disabled}
          className="flex-1 max-h-[180px] min-h-[36px] py-2 px-3 bg-transparent text-text-primary placeholder:text-text-muted text-sm border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed align-bottom"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!value.trim() || disabled}
          className="h-9 w-9 p-0 rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
        >
          <SendHorizontal className="h-4.5 w-4.5" />
        </Button>
      </form>
    </div>
  );
}
