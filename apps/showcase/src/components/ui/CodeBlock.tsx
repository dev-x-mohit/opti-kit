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

  return (
    <div className="relative group rounded-xl overflow-hidden bg-code-bg border border-border my-6 shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-surface/50 border-b border-border">
        <span className="text-xs font-mono text-muted uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="text-muted hover:text-text-main transition-colors p-1.5 rounded-md hover:bg-surface"
          aria-label="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-loose text-text-main">
        {code.split('\n').map((line, i) => (
          <div key={i} className="whitespace-pre">{line || ' '}</div>
        ))}
      </div>
    </div>
  );
}
