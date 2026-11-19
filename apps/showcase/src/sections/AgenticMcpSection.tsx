import React, { useState, useEffect } from 'react';
import { Bot, Terminal, Cpu, ArrowRight, Check, Copy, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { mcpPresets, mcpConfigSnippet, mcpCompatibility } from '../data/mcpData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { copyToClipboard } from '../lib/copyToClipboard';

export function AgenticMcpSection() {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const preset = mcpPresets[activePresetIndex];

  // Typewriter effect when preset changes
  useEffect(() => {
    setIsTyping(true);
    setDisplayedPrompt('');
    let idx = 0;
    const fullText = preset.userPrompt;

    const timer = setInterval(() => {
      idx++;
      setDisplayedPrompt(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [activePresetIndex]);

  const handleCopyConfig = async () => {
    const text = JSON.stringify(mcpConfigSnippet, null, 2);
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 1500);
    }
  };

  return (
    <section id="mcp" className="py-20 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-3">
            <Badge variant="primary" icon={<Bot size={13} />}>
              Model Context Protocol (MCP) Server
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Give your AI agent real math, not guesses.
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            LLMs frequently hallucinate complex calculations, date math, and statistics. With OptiKit’s MCP server, agents call pure, verified TypeScript functions locally over stdio.
          </p>
        </div>

        {/* 2D Architecture Flow Diagram with Animated Vector Pulses */}
        <div className="mb-12 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] max-w-4xl mx-auto shadow-xs relative overflow-hidden">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] text-center mb-6">
            Zero-Hallucination Execution Flow
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative z-10">
            {/* Step 1: LLM */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-center shadow-xs">
              <div className="text-xs text-[var(--text-muted)] font-mono">01. Agent / Model</div>
              <div className="text-sm font-semibold text-[var(--text)] mt-1">LLM Decides Tool Call</div>
              <p className="text-[11px] text-[var(--text-faint)] mt-1">Identifies math or data task</p>
            </div>

            {/* Step 2: MCP */}
            <div className="p-4 rounded-xl border border-[var(--primary)]/40 bg-[var(--surface-2)] text-center relative shadow-xs">
              <div className="text-xs text-[var(--primary)] font-mono font-medium">02. MCP Layer</div>
              <div className="text-sm font-semibold text-[var(--text)] mt-1">opti-kit-mcp</div>
              <p className="text-[11px] text-[var(--text-faint)] mt-1">Validates JSON Schema</p>
            </div>

            {/* Step 3: OptiKit Core */}
            <div className="p-4 rounded-xl border border-[var(--primary)] bg-[var(--primary-soft)] text-center shadow-xs">
              <div className="text-xs text-[var(--primary)] font-mono font-semibold">03. Deterministic Core</div>
              <div className="text-sm font-semibold text-[var(--primary)] mt-1">@dev_x_mohit/opti-kit</div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">Executes in &lt;1ms</p>
            </div>

            {/* Step 4: Exact Result */}
            <div className="p-4 rounded-xl border border-[var(--success)] bg-[var(--success-soft)] text-center shadow-xs">
              <div className="text-xs text-[var(--success)] font-mono font-semibold">04. Ground Truth</div>
              <div className="text-sm font-semibold text-[var(--success)] mt-1">Exact Verified Result</div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">Returned to user</p>
            </div>
          </div>
        </div>

        {/* Preset Prompt Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-[var(--text-faint)] mr-2 font-mono">Replay Presets:</span>
          {mcpPresets.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                activePresetIndex === idx
                  ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-semibold shadow-xs'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Realistic Chat / Terminal Mock */}
        <div className="max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5 bg-[var(--surface-2)]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="font-mono text-xs text-[var(--text-muted)]">
                agent-session (stdio: opti-kit-mcp)
              </span>
            </div>
            <Badge variant="primary" className="py-0.5 text-[10px]">
              Tool Verified
            </Badge>
          </div>

          <div className="p-6 space-y-6 font-mono text-xs">
            {/* User Message */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[var(--surface-2)] text-[var(--text-muted)] shrink-0 font-sans font-bold text-xs">
                You
              </div>
              <div className="flex-1 bg-[var(--surface-2)]/60 border border-[var(--border)] rounded-xl p-3.5 text-[var(--text)] font-sans text-xs leading-relaxed">
                {displayedPrompt}
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-[var(--primary)] ml-1 animate-pulse" />}
              </div>
            </div>

            {/* MCP Tool Call Card */}
            <div className="pl-6 border-l-2 border-[var(--primary)] space-y-3">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                <Terminal size={14} />
                <span>Tool Execution: {preset.toolCall.name}</span>
              </div>

              {/* Tool Arguments */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3.5 space-y-1">
                <span className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider block font-semibold">
                  Input Parameters:
                </span>
                <pre className="text-[var(--text-muted)] text-[11px] overflow-x-auto leading-relaxed">
                  {JSON.stringify(preset.toolCall.args, null, 2)}
                </pre>
              </div>

              {/* Tool Return Output */}
              <div className="rounded-xl border border-[var(--success)]/40 bg-[var(--success-soft)] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[var(--success)] font-semibold uppercase tracking-wider">
                    Return Output (Deterministic):
                  </span>
                  <span className="text-[10px] text-[var(--success)] font-mono">0.4ms</span>
                </div>
                <pre className="text-[var(--text)] text-[11px] overflow-x-auto leading-relaxed font-semibold">
                  {JSON.stringify(preset.toolResult, null, 2)}
                </pre>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="text-[11px] text-[var(--text-faint)] font-sans italic bg-[var(--surface-2)]/40 p-3 rounded-lg border border-[var(--border)]/60">
              💡 {preset.explanation}
            </div>
          </div>

          {/* Copyable MCP Config JSON */}
          <div className="border-t border-[var(--border)] p-4 bg-[var(--surface-2)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text)]">
                Add to your Claude Desktop / Cursor Config (<code className="font-mono text-[11px]">claude_desktop_config.json</code>):
              </span>
              <button
                onClick={handleCopyConfig}
                className="flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline cursor-pointer font-medium"
              >
                {copiedConfig ? (
                  <>
                    <Check size={13} className="text-[var(--success)]" />
                    <span className="text-[var(--success)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] font-mono text-xs text-[var(--text)] overflow-x-auto leading-relaxed">
{`{
  "mcpServers": {
    "opti-kit": {
      "command": "npx",
      "args": ["-y", "@dev_x_mohit/opti-kit-mcp"]
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Compatibility Chips */}
        <div className="mt-8 text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] mb-3">
            Fully Compatible With:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {mcpCompatibility.map((tool) => (
              <span
                key={tool.name}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] font-medium shadow-xs"
              >
                <CheckCircle2 size={13} className="text-[var(--primary)]" />
                <span>{tool.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
