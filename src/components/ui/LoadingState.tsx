import React from 'react';

interface LoadingStateProps {
  type?: 'card' | 'stats' | 'list';
  count?: number;
}

export default function LoadingState({ type = 'card', count = 3 }: LoadingStateProps) {
  const items = Array.from({ length: count });

  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((_, i) => (
          <div key={i} className="glass-panel rounded-xl p-5 flex flex-col gap-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-white/10 rounded"></div>
              <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
            </div>
            <div className="h-6 w-16 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {items.map((_, i) => (
          <div key={i} className="glass-panel rounded-xl p-4 flex items-center justify-between animate-pulse">
            <div className="flex flex-col gap-2 w-3/4">
              <div className="h-4 w-48 bg-white/10 rounded"></div>
              <div className="h-3 w-96 bg-white/10 rounded"></div>
            </div>
            <div className="h-8 w-20 bg-white/10 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((_, i) => (
        <div key={i} className="glass-panel rounded-xl p-5 flex flex-col gap-4 animate-pulse justify-between min-h-[160px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 bg-white/10 rounded"></div>
              <div className="h-4 w-12 bg-white/10 rounded"></div>
            </div>
            <div className="h-3 w-full bg-white/10 rounded"></div>
            <div className="h-3 w-5/6 bg-white/10 rounded"></div>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <div className="h-3 w-20 bg-white/10 rounded"></div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-white/10 rounded-lg"></div>
              <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
