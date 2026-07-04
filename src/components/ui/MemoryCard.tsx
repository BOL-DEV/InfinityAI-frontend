import React from 'react';
import { ExternalLink, Trash2, Calendar } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';

interface MemoryCardProps {
  title: string;
  url: string;
  snippet: string;
  timestamp: string;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function MemoryCard({
  title,
  url,
  snippet,
  timestamp,
  onDelete,
  isDeleting = false,
}: MemoryCardProps) {
  let hostname = 'unknown';
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url;
  }

  const formattedDate = new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="glass-panel rounded-xl p-5 flex flex-col justify-between gap-4 group hover:border-indigo-500/30 transition-all duration-300"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-text-primary text-sm line-clamp-1 group-hover:text-primary transition-colors duration-200"
            title={title}
          >
            {title}
          </h3>
          <span className="text-[10px] font-semibold text-text-muted px-2 py-0.5 bg-white/5 rounded border border-white/5 font-mono">
            {hostname}
          </span>
        </div>
        <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed min-h-[50px]">
          {snippet || 'No article content available.'}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 mt-1">
        <div className="flex items-center gap-1.5 text-text-muted">
          <Calendar className="h-3.5 w-3.5" />
          <span className="text-[10px] font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="px-2 py-1 text-xs gap-1.5 h-8">
              <ExternalLink className="h-3.5 w-3.5" />
              Visit
            </Button>
          </a>
          <Button
            variant="secondary"
            loading={isDeleting}
            onClick={onDelete}
            className="px-2.5 py-1 text-xs gap-1.5 h-8 hover:bg-red-600/20 hover:text-red-400 hover:border-red-600/30 text-text-secondary transition-colors"
          >
            {!isDeleting && <Trash2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
