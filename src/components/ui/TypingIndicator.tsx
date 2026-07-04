'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function TypingIndicator() {
  const [text, setText] = useState('Retrieving memories...');

  useEffect(() => {
    const t1 = setTimeout(() => setText('Thinking...'), 1500);
    const t2 = setTimeout(() => setText('Generating answer...'), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/2 self-start max-w-[85%] animate-pulse select-none">
      <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-primary shrink-0">
        <Sparkles className="h-4 w-4 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      <div className="flex flex-col gap-1 pt-0.5">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">
          InfinityAI
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-text-secondary">{text}</span>
          <span className="flex gap-1.5">
            <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
