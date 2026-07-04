import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SourceCardProps {
  title: string;
  url: string;
  snippet: string;
}

export default function SourceCard({ title, url, snippet }: SourceCardProps) {
  let hostname = 'unknown';
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url;
  }

  return (
    <div className="glass-panel border border-white/5 rounded-xl p-3.5 flex flex-col gap-2 transition-all duration-200 w-full max-w-[280px] bg-white/2 hover:bg-white/4">
      <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-1.5">
        <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-wide uppercase">
          {hostname}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xs font-bold text-white line-clamp-1" title={title}>
          {title}
        </h4>
        <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed" title={snippet}>
          {snippet || 'No description preview available.'}
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors w-fit group"
      >
        <span>Open Original</span>
        <ExternalLink className="h-3 w-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
}
