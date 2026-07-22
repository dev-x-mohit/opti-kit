import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const highlightLine = (line: string) => {
    if (line.startsWith('//')) {
      return <span className="text-black dark:text-muted italic font-medium">{line}</span>;
    }

    // Basic token highlighter for JS/TS/Bash
    const parts = line.split(/(\b(?:import|export|from|const|let|var|function|return|async|await|default|type|interface|npm|pnpm|yarn|bun)\b|".*?"|'.*?'|\/\/.*)/g);
    
    return parts.map((part, index) => {
      if (!part) return null;
      if (part.startsWith('//')) {
        return <span key={index} className="text-black dark:text-muted italic font-medium">{part}</span>;
      }
      if (/^(?:import|export|from|const|let|var|function|return|async|await|default|type|interface)$/.test(part)) {
        return <span key={index} className="text-[#4F46E5] dark:text-accent font-bold">{part}</span>;
      }
      if (/^(?:npm|pnpm|yarn|bun)$/.test(part)) {
        return <span key={index} className="text-[#2563EB] dark:text-primary font-bold">{part}</span>;
      }
      if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
        return <span key={index} className="text-[#047857] dark:text-emerald-400 font-semibold">{part}</span>;
      }
      return <span key={index} className="text-black dark:text-text-main font-medium">{part}</span>;
    });
  };

  return (
    <div className="relative group rounded-[16px] overflow-hidden bg-[#EEF2F8] dark:bg-code-bg border border-[#DCE3F0] dark:border-border my-6 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-surface/80 dark:bg-surface/50 border-b border-[#DCE3F0] dark:border-border">
        <span className="text-xs font-mono text-black dark:text-muted uppercase tracking-wider font-semibold">{language}</span>
        <button
          onClick={handleCopy}
          className="text-black hover:text-primary dark:text-muted dark:hover:text-text-main transition-colors p-1.5 rounded-md hover:bg-surface"
          aria-label="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-black dark:text-text-main">
        {code.split('\n').map((line, i) => (
          <div key={i} className="whitespace-pre">{highlightLine(line) || ' '}</div>
        ))}
      </div>
    </div>
  );
}
