import React from 'react';

interface TopbarProps {
  title: string;
  children?: React.ReactNode;
}

export default function Topbar({ title, children }: TopbarProps) {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 md:px-8 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-20">
      <h1 className="text-lg font-bold text-text-primary tracking-tight pl-12 md:pl-0">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        {children}
      </div>
    </header>
  );
}
