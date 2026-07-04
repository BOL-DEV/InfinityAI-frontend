import React from 'react';
import SourceCard from './SourceCard';
import { Bookmark } from 'lucide-react';

interface SourcesListProps {
  sources: { title: string; url: string; snippet: string }[];
}

export default function SourcesList({ sources }: SourcesListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5 mt-4 pt-3.5 border-t border-white/5 animate-in fade-in duration-300">
      <div className="flex items-center gap-1.5 text-text-muted text-[10px] uppercase font-bold tracking-wider select-none mb-1">
        <Bookmark className="h-3 w-3 text-indigo-400" />
        <span>Based on {sources.length} {sources.length === 1 ? 'saved memory' : 'saved memories'}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {sources.map((src, index) => (
          <SourceCard
            key={index}
            title={src.title}
            url={src.url}
            snippet={src.snippet}
          />
        ))}
      </div>
    </div>
  );
}
