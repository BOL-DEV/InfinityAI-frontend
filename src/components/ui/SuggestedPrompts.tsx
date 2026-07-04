import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  const prompts = [
    { text: 'Explain React Server Components', category: 'Development' },
    { text: 'Where did I learn about OAuth?', category: 'Security' },
    { text: 'Summarize everything I read about Docker', category: 'Infrastructure' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-2 select-none">
      {prompts.map((prompt, i) => (
        <button
          key={i}
          onClick={() => onSelect(prompt.text)}
          className="glass-panel text-left p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-indigo-500/30 transition-all duration-200 group flex flex-col justify-between gap-3 cursor-pointer"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest font-mono">
              {prompt.category}
            </span>
            <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2 leading-relaxed">
              "{prompt.text}"
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity self-end">
            <span>Send prompt</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </button>
      ))}
    </div>
  );
}
