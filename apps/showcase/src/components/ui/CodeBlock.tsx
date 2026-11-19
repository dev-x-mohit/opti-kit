import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../../lib/copyToClipboard';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code.trim());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const highlightSyntax = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Check comment line
      if (line.trim().startsWith('//')) {
        return (
          <div key={lineIdx} className="table-row leading-relaxed">
            {showLineNumbers && (
              <span className="table-cell select-none pr-4 text-right text-xs text-[var(--text-faint)] opacity-60">
                {lineIdx + 1}
              </span>
            )}
            <span className="table-cell whitespace-pre font-mono text-xs text-[var(--syntax-comment)] italic">
              {line}
            </span>
          </div>
        );
      }

      // Tokenize
      const regex = /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:import|export|from|const|let|var|function|return|async|await|default|type|interface|class|new|if|else|switch|case|break|try|catch|throw|typeof|instanceof|extends|implements|as|npm|pnpm|yarn|bun|npx)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][A-Za-z0-9_$]*(?=\s*\()|[{}\[\](),;.:])/g;

      const segments: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          segments.push(
            <span key={`text-${lastIndex}`} className="text-[var(--text)]">
              {line.substring(lastIndex, match.index)}
            </span>
          );
        }

        const token = match[0];
        if (token.startsWith('//')) {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--syntax-comment)] italic">
              {token}
            </span>
          );
        } else if (
          token.startsWith('"') ||
          token.startsWith("'") ||
          token.startsWith('`')
        ) {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--syntax-string)]">
              {token}
            </span>
          );
        } else if (/^\d+(?:\.\d+)?$/.test(token)) {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--syntax-number)]">
              {token}
            </span>
          );
        } else if (
          /^(import|export|from|const|let|var|function|return|async|await|default|type|interface|class|new|if|else|switch|case|break|try|catch|throw|typeof|instanceof|extends|implements|as|npm|pnpm|yarn|bun|npx)$/.test(
            token
          )
        ) {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--syntax-keyword)] font-medium">
              {token}
            </span>
          );
        } else if (
          /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) &&
          line[match.index + token.length] === '('
        ) {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--syntax-function)]">
              {token}
            </span>
          );
        } else if (/^[{}\[\](),;.:]$/.test(token)) {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--syntax-punct)]">
              {token}
            </span>
          );
        } else {
          segments.push(
            <span key={`tok-${match.index}`} className="text-[var(--text)]">
              {token}
            </span>
          );
        }

        lastIndex = match.index + token.length;
      }

      if (lastIndex < line.length) {
        segments.push(
          <span key={`text-end`} className="text-[var(--text)]">
            {line.substring(lastIndex)}
          </span>
        );
      }

      return (
        <div key={lineIdx} className="table-row leading-relaxed">
          {showLineNumbers && (
            <span className="table-cell select-none pr-4 text-right text-xs text-[var(--text-faint)] opacity-60">
              {lineIdx + 1}
            </span>
          )}
          <span className="table-cell whitespace-pre font-mono text-xs">
            {segments.length > 0 ? segments : ' '}
          </span>
        </div>
      );
    });
  };

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3.5 py-2 bg-[var(--surface-2)]">
        <span className="font-mono text-xs text-[var(--text-muted)] select-none">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[var(--success)]" />
              <span className="text-[var(--success)] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-[var(--text)] font-mono text-xs">
        <div className="table w-full">{highlightSyntax(code)}</div>
      </div>
    </div>
  );
}
