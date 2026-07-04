'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, MessageSquare, Network, ArrowRight, X, Puzzle, Download, HelpCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col justify-between overflow-x-hidden relative">
      {/* Decorative Gradient Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Banner Navigation */}
      <header className="max-w-6xl w-full mx-auto px-6 py-5 flex items-center justify-between border-b border-white/5 relative z-20">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-lg text-gradient">InfinityAI</span>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary" className="px-4 py-2 border-white/5 bg-white/5 hover:bg-white/10 text-white gap-2">
            Open App
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl w-full mx-auto px-6 py-20 text-center gap-8 z-10 relative">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Research, <br />
            <span className="text-gradient">Instantly Remembered.</span>
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
            Save articles, documentation, and pages with one click. 
            Ask natural language questions about everything you have read, 
            and see your knowledge visualize automatically.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button 
            variant="primary" 
            className="px-6 py-3 text-base gap-2"
            onClick={() => setIsGuideOpen(true)}
          >
            <Puzzle className="h-5 w-5" />
            Guide to Install Extension
          </Button>
          <Link href="/dashboard">
            <Button variant="secondary" className="px-6 py-3 text-base border-white/10 bg-white/5 hover:bg-white/10 text-white">
              Open Dashboard
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 text-left">
          {/* Feature Card 1 */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/30 transition-all duration-300">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-primary w-fit">
              <Bookmark className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-white text-base">Remember</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Save webpages instantly using our Manifest V3 Chrome Extension. Extract clean, distraction-free article text automatically.
              </p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/30 transition-all duration-300">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-primary w-fit">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-white text-base">Ask</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Query your collected browser memory in natural language. Access synthesized summaries citing exact original source URLs.
              </p>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/30 transition-all duration-300">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-primary w-fit">
              <Network className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-white text-base">Connect</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Create relations between concepts. Visualize dynamic semantic connections across topics inside an interactive knowledge graph.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-text-muted relative z-10">
        <p>&copy; {new Date().getFullYear()} InfinityAI. Built for researchers, developers, and students.</p>
      </footer>

      {/* Premium Installation Guide Modal Overlay */}
      {isGuideOpen && (
        <div className="fixed inset-0 bg-[#070b13]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div 
            className="glass-panel max-w-lg w-full rounded-2xl p-6 md:p-8 relative flex flex-col gap-5 border border-white/10 shadow-2xl animate-in scale-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-text-secondary hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setIsGuideOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-primary border border-indigo-500/20">
                <Puzzle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Chrome Extension Installation</h2>
            </div>

            {/* Installation Instructions */}
            <div className="flex flex-col gap-5 my-2">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">1</span>
                  <div className="w-[1px] h-full bg-white/10 mt-2"></div>
                </div>
                <div className="flex flex-col gap-1 mt-0.5">
                  <span className="text-sm font-semibold text-white">Download Codebase</span>
                  <span className="text-xs text-text-secondary leading-relaxed">
                    Download the extension folder from your{' '}
                    <a 
                      href="https://github.com/BOL-DEV/InfinityAI-extension" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      GitHub repository
                      <Download className="h-3 w-3" />
                    </a>. Extract the files on your computer.
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">2</span>
                  <div className="w-[1px] h-full bg-white/10 mt-2"></div>
                </div>
                <div className="flex flex-col gap-1 mt-0.5">
                  <span className="text-sm font-semibold text-white">Open Developer Settings</span>
                  <span className="text-xs text-text-secondary leading-relaxed">
                    Navigate to <code className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5 text-[10px] text-indigo-300 select-all font-mono">chrome://extensions/</code> in a new Google Chrome window tab.
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">3</span>
                  <div className="w-[1px] h-full bg-white/10 mt-2"></div>
                </div>
                <div className="flex flex-col gap-1 mt-0.5">
                  <span className="text-sm font-semibold text-white">Toggle Developer Mode</span>
                  <span className="text-xs text-text-secondary leading-relaxed">
                    Switch the <strong>Developer Mode</strong> toggle in the top-right corner to **ON**.
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">4</span>
                </div>
                <div className="flex flex-col gap-1 mt-0.5">
                  <span className="text-sm font-semibold text-white">Load Unpacked Extension</span>
                  <span className="text-xs text-text-secondary leading-relaxed">
                    Click the <strong>Load unpacked</strong> button in the top-left corner and choose the extension's <code className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5 text-[10px] text-indigo-300 font-mono">dist</code> folder.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2">
              <Button 
                variant="secondary" 
                onClick={() => setIsGuideOpen(false)}
                className="px-4 py-2 border-white/10 text-white"
              >
                Close
              </Button>
              <a 
                href="https://github.com/BOL-DEV/InfinityAI-extension" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="px-4 py-2">
                  Get Files
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
