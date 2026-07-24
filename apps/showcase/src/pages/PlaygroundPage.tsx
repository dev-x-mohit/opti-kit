import React, { useState } from 'react';
import * as opti from '@dev_x_mohit/opti-kit';
import { Play, Code2, Terminal, ChevronDown } from 'lucide-react';
import { utilitiesData } from '../data/utilitiesData';

export function PlaygroundPage() {
  const defaultSnippet = `// Welcome to the OptiKit Scripting IDE!
// The 'opti' object is globally available.

const arr = [1, 2, 3, 4, 5, 6, 7];
const chunks = opti.chunk(arr, 3);

const result = chunks.map(chunk => opti.shuffle(chunk));

return {
  originalLength: arr.length,
  chunkedResult: result
};`;

  const [code, setCode] = useState(defaultSnippet);
  const [selectedFunc, setSelectedFunc] = useState('');
  
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const generateSnippet = (name: string, signature: string) => {
    const val = (opti as any)[name];
    const isClass = typeof val === 'function' && /^[A-Z]/.test(name);
    const isObject = typeof val === 'object' && val !== null;

    if (isClass) {
      return `// Testing class opti.${name}\nconst instance = new opti.${name}();\n\nconsole.log("Instance created:", instance);\nreturn instance;`;
    }
    if (isObject) {
      return `// Testing object opti.${name}\nconsole.log("Object properties:", Object.keys(opti.${name}));\nreturn opti.${name};`;
    }

    const defaults: Record<string, string> = {
      chunk: '[1, 2, 3, 4, 5], 2',
      slugify: '"Hello World!"',
      capitalize: '"hello world"',
      camelCase: '"hello-world"',
      kebabCase: '"helloWorld"',
      snakeCase: '"helloWorld"',
      truncate: '"Hello World", 5',
      clamp: '15, 0, 10',
      random: '1, 100',
      difference: '[1, 2, 3], [2, 4]',
      intersection: '[1, 2, 3], [2, 3, 4]',
      unique: '[1, 1, 2, 3, 3]',
      groupBy: '[{ type: "a" }, { type: "b" }, { type: "a" }], item => item.type',
      isEmail: '"test@example.com"',
      isUrl: '"https://example.com"',
      hexToRgb: '"#ff0000"',
      rgbToHex: '255, 0, 0',
      parseQuery: '"?foo=bar&baz=qux"',
      stringifyQuery: '{ foo: "bar", baz: "qux" }',
      cookieGet: '"session_id"',
      cookieSet: '"session_id", "12345", { days: 7 }',
      escapeHtml: '"<h1>Hello</h1>"',
      unescapeHtml: '"&lt;h1&gt;Hello&lt;/h1&gt;"',
    };

    let args = defaults[name];

    if (!args) {
      const match = signature.match(/\((.*?)\)/);
      if (match && match[1].trim()) {
        let params: string[] = [];
        let current = '';
        let depth = 0;
        for (const char of match[1]) {
          if (char === '<' || char === '[' || char === '{' || char === '(') depth++;
          else if (char === '>' || char === ']' || char === '}' || char === ')') depth--;
          else if (char === ',' && depth === 0) {
            params.push(current.trim());
            current = '';
            continue;
          }
          current += char;
        }
        if (current.trim()) params.push(current.trim());

        const dummyArgs = params.map(param => {
          const colonIdx = param.indexOf(':');
          if (colonIdx === -1) {
            if (param.includes('...')) return '[1, 2, 3]';
            return 'null';
          }
          const pName = param.substring(0, colonIdx).replace('?', '').trim().toLowerCase();
          const type = param.substring(colonIdx + 1).trim().toLowerCase();

          if (pName.includes('url')) return '"https://example.com"';
          if (pName.includes('email')) return '"test@example.com"';
          if (pName.includes('color') || pName.includes('hex')) return '"#ff0000"';
          if (pName.includes('date')) return 'new Date()';
          if (pName.includes('regex') || pName.includes('pattern')) return '/test/i';

          if (type.includes('string')) return '"Hello World"';
          if (type.includes('number')) return '42';
          if (type.includes('boolean')) return 'true';
          if (type.includes('[]') || type.includes('array')) return '[1, 2, 3]';
          if (type.includes('record') || type.includes('object') || type.startsWith('{')) return '{ key: "value" }';
          if (type.includes('=>') || type.includes('function')) return '() => {}';
          if (type.includes('date')) return 'new Date()';
          if (type.includes('regexp')) return '/test/i';

          return 'null';
        });

        args = dummyArgs.join(', ');
      } else {
        args = '';
      }
    }

    if (name === 'delay') {
      return `console.log("Waiting for 1 second...");\nawait opti.delay(1000);\nconsole.log("Done!");\nreturn true;`;
    }
    if (name === 'debounce' || name === 'throttle') {
      return `let count = 0;\nconst fn = opti.${name}(() => {\n  count++;\n  console.log("Fired! Count:", count);\n}, 100);\n\nfn();\nfn();\nfn();\n\nconsole.log("Waiting for async execution...");\nawait new Promise(r => setTimeout(r, 150));\nreturn { finalCount: count };`;
    }

    return `// Testing opti.${name}\nconst result = opti.${name}(${args});\n\nconsole.log("Result:", result);\nreturn result;`;
  };

  const handleSelectUtility = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedFunc(val);
    if (val === '') {
      setCode(defaultSnippet);
      return;
    }
    const meta = utilitiesData.find(u => u.id === val);
    if (meta) {
      setCode(generateSnippet(meta.name, meta.signature));
      setOutput('');
    }
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput('Executing...');
    
    // Slight delay to allow UI to update
    await new Promise(r => setTimeout(r, 50));
    
    try {
      // Overwrite console.log inside the function to capture it
      let logs: string[] = [];
      const fn = new Function('opti', 'consoleLogs', `
        const console = { log: (...args) => consoleLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')) };
        return (async () => {
          ${code}
        })();
      `);
      
      const result = await fn(opti, logs);
      
      let finalOutput = logs.length > 0 ? logs.join('\n') + '\n\n' : '';
      if (result === undefined) {
        finalOutput += 'Script executed successfully (No return value).';
      } else {
        finalOutput += JSON.stringify(result, null, 2);
      }
      setOutput(finalOutput);
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col md:flex-row overflow-hidden bg-background">
      {/* Left Pane - Editor */}
      <div className="flex-1 flex flex-col border-r border-border h-full">
        <div className="bg-surface/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-main font-medium">
              <Code2 size={18} className="text-primary" />
              Script Editor
            </div>
            
            <div className="relative border-l border-border pl-4 hidden md:block">
              <select 
                value={selectedFunc}
                onChange={handleSelectUtility}
                className="appearance-none bg-background border border-border rounded-md pl-3 pr-8 py-1 text-xs text-text-main focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer w-48"
              >
                <option value="" className="bg-surface text-[#1F2937] dark:text-white">Load an example...</option>
                {utilitiesData.map(u => (
                  <option key={u.id} value={u.id} className="bg-surface text-[#1F2937] dark:text-white">{u.name} ({u.module})</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted hidden lg:block">Press <kbd className="bg-background px-1.5 py-0.5 rounded border border-border">Cmd/Ctrl + Enter</kbd> to run</span>
            <button 
              onClick={executeCode}
              disabled={isExecuting}
              className="flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-95 text-white px-4 py-1.5 rounded-xl text-sm font-semibold shadow-md transition-all disabled:opacity-50"
            >
              <Play size={14} /> {isExecuting ? 'Running...' : 'Run Script'}
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative bg-[#EEF2F8] dark:bg-[#0d1117] overflow-hidden">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            className="absolute inset-0 w-full h-full bg-transparent text-[#1F2937] dark:text-[#e6edf3] p-4 font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar"
            style={{ tabSize: 2 }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const newCode = code.substring(0, start) + '  ' + code.substring(end);
                setCode(newCode);
                // Synchronously update selection
                setTimeout(() => {
                  (e.target as HTMLTextAreaElement).selectionStart = (e.target as HTMLTextAreaElement).selectionEnd = start + 2;
                }, 0);
              }
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                executeCode();
              }
            }}
          />
        </div>
      </div>

      {/* Right Pane - Output */}
      <div className="flex-1 flex flex-col h-full bg-[#F6F7FB] dark:bg-[#0d1117]">
        <div className="bg-surface/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-2 shrink-0 text-text-main font-medium">
          <Terminal size={18} className="text-success" />
          Console Output
        </div>
        <div className="flex-1 p-4 overflow-auto custom-scrollbar">
          <pre className="font-mono text-sm leading-relaxed text-[#059669] dark:text-[#7ee787] whitespace-pre-wrap">
            {output || '// Output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
