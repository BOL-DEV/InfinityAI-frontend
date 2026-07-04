'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split by code block indicator
  const parts = content.split('```');

  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed text-text-secondary select-text">
      {parts.map((part, index) => {
        const isCodeBlock = index % 2 === 1;

        if (isCodeBlock) {
          return <CodeBlock key={index} rawContent={part} />;
        }

        return <TextBlock key={index} text={part} />;
      })}
    </div>
  );
}

/* --- Inline Text Formatter --- */
function formatInlineText(text: string): React.ReactNode {
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i} className="italic text-text-primary">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="bg-white/10 border border-white/5 px-1.5 py-0.5 rounded text-indigo-300 text-xs font-mono"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('[') && part.includes('](')) {
          const closingBrack = part.indexOf(']');
          const title = part.slice(1, closingBrack);
          const url = part.slice(closingBrack + 2, -1);
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline font-semibold"
            >
              {title}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

/* --- Text Block Formatter --- */
function TextBlock({ text }: { text: string }) {
  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let currentListItems: React.ReactNode[] = [];
  let currentListType: 'bullet' | 'ordered' | null = null;
  let listKeyCounter = 0;

  const flushList = () => {
    if (currentListType === 'bullet') {
      renderedElements.push(
        <ul key={`list-${listKeyCounter++}`} className="list-disc pl-5 my-2 flex flex-col gap-1.5 text-text-secondary">
          {currentListItems}
        </ul>
      );
    } else if (currentListType === 'ordered') {
      renderedElements.push(
        <ol key={`list-${listKeyCounter++}`} className="list-decimal pl-5 my-2 flex flex-col gap-1.5 text-text-secondary">
          {currentListItems}
        </ol>
      );
    }
    currentListItems = [];
    currentListType = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check header H1
    if (line.startsWith('# ')) {
      flushList();
      renderedElements.push(
        <h1 key={i} className="text-xl font-bold text-white mt-4 mb-2 tracking-tight">
          {formatInlineText(line.slice(2))}
        </h1>
      );
      continue;
    }

    // Check header H2
    if (line.startsWith('## ')) {
      flushList();
      renderedElements.push(
        <h2 key={i} className="text-lg font-bold text-white mt-4 mb-2 tracking-tight">
          {formatInlineText(line.slice(3))}
        </h2>
      );
      continue;
    }

    // Check header H3
    if (line.startsWith('### ')) {
      flushList();
      renderedElements.push(
        <h3 key={i} className="text-base font-bold text-white mt-3 mb-1.5 tracking-tight">
          {formatInlineText(line.slice(4))}
        </h3>
      );
      continue;
    }

    // Check bullet lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (currentListType !== 'bullet') {
        flushList();
        currentListType = 'bullet';
      }
      const rawText = line.trim().slice(2);
      currentListItems.push(
        <li key={i} className="pl-1">
          {formatInlineText(rawText)}
        </li>
      );
      continue;
    }

    // Check ordered lists
    const orderedMatch = line.trim().match(/^(\d+)\.\s(.*)/);
    if (orderedMatch) {
      if (currentListType !== 'ordered') {
        flushList();
        currentListType = 'ordered';
      }
      const rawText = orderedMatch[2];
      currentListItems.push(
        <li key={i} className="pl-1">
          {formatInlineText(rawText)}
        </li>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      continue;
    }

    // Regular line / Paragraph
    flushList();
    renderedElements.push(
      <p key={i} className="my-2 leading-relaxed">
        {formatInlineText(line)}
      </p>
    );
  }

  flushList(); // Final flush

  return <>{renderedElements}</>;
}

/* --- Code Block Wrapper --- */
function CodeBlock({ rawContent }: { rawContent: string }) {
  const [copied, setCopied] = useState(false);

  // Extract language & code
  const lines = rawContent.split('\n');
  const language = lines[0]?.trim() || 'code';
  const code = lines.slice(1).join('\n').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-white/5 rounded-lg overflow-hidden my-3 bg-[#0d111a] shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/2 select-none">
        <span className="text-[10px] font-bold tracking-widest text-text-muted uppercase font-mono">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="text-[10px] font-semibold">Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[350px]">
        <pre className="font-mono text-xs text-indigo-200/90 whitespace-pre leading-relaxed select-text">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
