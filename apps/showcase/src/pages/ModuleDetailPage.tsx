import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Copy, Check, Play, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { utilitiesData } from '../data/utilitiesData';
import * as opti from '@dev_x_mohit/opti-kit';
import { Card } from '../components/ui/Card';

// Smart dummy argument generator based on signature and function name
const generateDummyArgs = (signature: string, name: string) => {
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

  if (defaults[name]) return defaults[name];

  const match = signature.match(/\((.*?)\)/);
  if (!match || !match[1].trim()) return '';

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

  return dummyArgs.join(', ');
};


export function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams] = useSearchParams();
  
  const moduleUtils = useMemo(() => {
    if (!moduleId) return [];
    return utilitiesData.filter(u => u.module.toLowerCase() === moduleId.toLowerCase());
  }, [moduleId]);
  
  const actualModuleName = moduleUtils.length > 0 ? moduleUtils[0].module : moduleId || '';

  // Initialize with the utility passed in query param `u` (from Command Palette) or just the first one
  const [selectedUtilityId, setSelectedUtilityId] = useState<string>(() => {
    const u = searchParams.get('u');
    if (u && moduleUtils.some(modU => modU.id === u)) return u;
    return moduleUtils[0]?.id || '';
  });

  // If search param changes (user searches again), update selection
  useEffect(() => {
    const u = searchParams.get('u');
    if (u && moduleUtils.some(modU => modU.id === u)) {
      setSelectedUtilityId(u);
    } else if (moduleUtils.length > 0 && !moduleUtils.some(modU => modU.id === selectedUtilityId)) {
      setSelectedUtilityId(moduleUtils[0].id);
    }
  }, [searchParams, moduleUtils]);

  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [inputArgs, setInputArgs] = useState('');
  
  const selectedUtility = useMemo(() => 
    moduleUtils.find(u => u.id === selectedUtilityId) || moduleUtils[0], 
  [selectedUtilityId, moduleUtils]);

  useEffect(() => {
    if (selectedUtility) {
      const val = (opti as any)[selectedUtility.name];
      const isClass = typeof val === 'function' && /^[A-Z]/.test(selectedUtility.name);
      const isObject = typeof val === 'object' && val !== null;
      
      let defaultCode = '';
      if (isClass) {
        defaultCode = `const instance = new opti.${selectedUtility.name}();\n// instance.method(...)\nreturn instance;`;
      } else if (isObject) {
        defaultCode = `return opti.${selectedUtility.name};`;
      } else {
        const match = selectedUtility.example.match(/\((.*)\)$/);
        let defaultArgs = match && match[1] && match[1] !== '...' ? match[1] : generateDummyArgs(selectedUtility.signature, selectedUtility.name);
        defaultCode = `opti.${selectedUtility.name}(${defaultArgs})`;
      }

      setInputArgs(defaultCode);
      setCopiedImport(false);
      setCopiedSignature(false);
      setCopiedOutput(false);
    }
  }, [selectedUtility]);

  const handleCopy = async (text: string, setter: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {}
  };

  const evaluateCode = () => {
    if (!selectedUtility) return { output: '', error: false };
    
    try {
      let codeToRun = inputArgs.trim();
      const needsReturn = !codeToRun.includes('return ') && !codeToRun.startsWith('const ') && !codeToRun.startsWith('let ');
      if (needsReturn) {
        codeToRun = `return ${codeToRun}`;
      }

      // Safe evaluation context with only opti library available
      const fn = new Function('opti', codeToRun);
      let result = fn(opti);
      
      if (result instanceof Promise) {
        return { output: 'Promise { <pending> }', error: false };
      }
      
      if (result === undefined) return { output: 'undefined', error: false };
      if (result === null) return { output: 'null', error: false };
      if (typeof result === 'function') return { output: '[Function]', error: false };
      
      return { 
        output: JSON.stringify(result, null, 2),
        error: false 
      };
    } catch (e: any) {
      return { output: e.toString(), error: true };
    }
  };

  const evalResult = evaluateCode();

  if (moduleUtils.length === 0) {
    return (
      <div className="p-10 max-w-5xl mx-auto text-center">
        <p className="text-muted">Module not found.</p>
        <Link to="/modules" className="text-primary hover:underline mt-4 inline-block">Back to Modules</Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link to="/modules" className="hover:text-primary transition-colors">Modules</Link>
        <ChevronRight size={14} />
        <Link to={`/modules/${actualModuleName.toLowerCase()}`} className={selectedUtility ? "hover:text-primary transition-colors" : "font-semibold text-text-main"}>
          {actualModuleName}
        </Link>
        {selectedUtility && (
          <>
            <ChevronRight size={14} />
            <span className="font-semibold text-text-main">{selectedUtility.name}</span>
          </>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-text-main">{actualModuleName}</h1>
          <p className="text-muted mt-1">{moduleUtils.length} utilities available</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Playground / Details */}
        <div className="w-full flex flex-col">
          {selectedUtility ? (
            <motion.div 
              key={selectedUtility.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 pr-2 pb-4"
            >
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold font-mono text-primary flex items-center gap-2">
                        {selectedUtility.name}
                        <span className="text-xs font-sans px-2 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                          {selectedUtility.module}
                        </span>
                      </h2>
                      <p className="text-muted mt-2">{selectedUtility.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Import */}
                    <div className="group relative">
                      <div className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Import</div>
                      <div className="bg-black/90 dark:bg-black/40 border border-border p-3 rounded-lg overflow-x-auto text-sm font-mono text-green-400">
                        import {'{'} {selectedUtility.name} {'}'} from '@dev_x_mohit/opti-kit';
                      </div>
                      <button 
                        onClick={() => handleCopy(`import { ${selectedUtility.name} } from '@dev_x_mohit/opti-kit';`, setCopiedImport)}
                        className="absolute right-2 top-8 p-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors"
                      >
                        {copiedImport ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>

                    {/* Signature */}
                    <div className="group relative">
                      <div className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Signature</div>
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg overflow-x-auto text-sm font-mono text-primary">
                        {selectedUtility.signature}
                      </div>
                      <button 
                        onClick={() => handleCopy(selectedUtility.signature, setCopiedSignature)}
                        className="absolute right-2 top-8 p-1.5 bg-primary/10 hover:bg-primary/20 rounded-md text-primary transition-colors"
                      >
                        {copiedSignature ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Interactive Playground */}
              <Card className="flex flex-col min-h-[300px] mb-8">
                <div className="p-4 border-b border-border bg-surface flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <Play size={16} className="text-primary" />
                    <h3 className="font-bold text-text-main">Live Playground</h3>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row flex-1">
                  <div className="w-full md:w-1/2 p-4 border-r border-border bg-background flex flex-col min-h-[150px]">
                    <div className="text-xs text-muted mb-2 font-mono flex items-center gap-2 shrink-0">
                      <span className="text-primary">{'//'} Editable Execution Code</span>
                    </div>
                    <textarea
                      value={inputArgs}
                      onChange={(e) => setInputArgs(e.target.value)}
                      className="w-full flex-1 bg-transparent border-none resize-none focus:outline-none font-mono text-sm text-text-main"
                      spellCheck="false"
                    />
                  </div>
                  
                  <div className="w-full md:w-1/2 p-4 bg-black/5 dark:bg-white/5 relative group flex flex-col min-h-[150px]">
                    <div className="text-xs text-muted mb-2 font-mono flex items-center gap-2 shrink-0">
                      <span className={evalResult.error ? 'text-red-500' : 'text-green-500'}>
                        {'//'} {evalResult.error ? 'Error Output' : 'Result'}
                      </span>
                    </div>
                    <pre className={`font-mono text-sm flex-1 whitespace-pre-wrap break-all ${evalResult.error ? 'text-red-500' : 'text-text-main'}`}>
                      {evalResult.output}
                    </pre>
                    {!evalResult.error && evalResult.output && (
                      <button 
                        onClick={() => handleCopy(evalResult.output, setCopiedOutput)}
                        className="absolute right-4 top-4 p-1.5 bg-surface border border-border shadow-sm hover:bg-black/5 dark:hover:bg-white/5 rounded-md text-muted transition-colors opacity-0 group-hover:opacity-100"
                      >
                        {copiedOutput ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted">
              Select a utility to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
