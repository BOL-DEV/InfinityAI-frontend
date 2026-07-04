import React from 'react';
import Link from 'next/link';
import { Bookmark, MessageSquare, Network, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col justify-between overflow-x-hidden">
      {/* Decorative Gradient Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Banner Navigation */}
      <header className="max-w-6xl w-full mx-auto px-6 py-5 flex items-center justify-between border-b border-white/5">
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
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl w-full mx-auto px-6 py-20 text-center gap-8 z-10">
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
          <a href="chrome://extensions/" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="px-6 py-3 text-base gap-2">
              Install Extension
            </Button>
          </a>
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
      <footer className="border-t border-white/5 py-8 text-center text-xs text-text-muted">
        <p>&copy; {new Date().getFullYear()} InfinityAI. Built for researchers, developers, and students.</p>
      </footer>
    </div>
  );
}
