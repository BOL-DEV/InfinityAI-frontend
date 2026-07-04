import React from 'react';
import { Sparkles } from 'lucide-react';
import SuggestedPrompts from './SuggestedPrompts';

interface EmptyChatProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function EmptyChat({ onSelectPrompt }: EmptyChatProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-6 max-w-4xl mx-auto w-full select-none animate-in fade-in duration-300">
      <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-primary animate-pulse">
        <Sparkles className="h-8 w-8 text-indigo-400" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">
          Ask Your Knowledge
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          Everything you've saved can now be searched and synthesized using natural language. Select a query below or type your own question.
        </p>
      </div>
      <SuggestedPrompts onSelect={onSelectPrompt} />
    </div>
  );
}
