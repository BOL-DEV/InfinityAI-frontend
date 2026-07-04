'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Library, Settings as SettingsIcon, Menu, X, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Memories', href: '/memories', icon: Library },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-secondary border border-border text-text-primary rounded-lg shadow-lg hover:bg-secondary-hover cursor-pointer"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 border-r border-border bg-[#0b0f19] p-5 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2.5 px-2 mt-2">
            <span className="text-xl">🧠</span>
            <span className="font-bold text-lg text-gradient">InfinityAI</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-500/10 text-primary border-l-2 border-primary'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Minimal User Profile Placeholder */}
        <div className="flex items-center gap-3 border-t border-border pt-4 px-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">John Doe</span>
            <span className="text-[10px] text-text-secondary">Research Lead</span>
          </div>
        </div>
      </aside>

      {/* Overlay to close sidebar on mobile click */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        ></div>
      )}
    </>
  );
}
