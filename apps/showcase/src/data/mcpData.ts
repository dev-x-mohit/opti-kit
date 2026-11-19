export interface McpPreset {
  id: string;
  label: string;
  userPrompt: string;
  toolCall: {
    name: string;
    args: Record<string, any>;
  };
  toolResult: Record<string, any>;
  explanation: string;
}

export const mcpPresets: McpPreset[] = [
  {
    id: 'finance-compound',
    label: 'Compound Interest',
    userPrompt: 'Calculate the total interest on a $25,000 portfolio at 7.5% annual return over 15 years compounded monthly.',
    toolCall: {
      name: 'opti_finance_calc',
      args: {
        calculation: 'compoundInterest',
        principal: 25000,
        rate: 7.5,
        time: 15,
        compoundingsPerYear: 12
      }
    },
    toolResult: {
      principal: 25000,
      rate: 7.5,
      time: 15,
      compoundingsPerYear: 12,
      interest: 51720.66,
      total: 76720.66
    },
    explanation: 'The agent dispatches the calculation to OptiKit’s deterministic formula, ensuring zero rounding hallucination.'
  },
  {
    id: 'stats-stddev',
    label: 'Standard Deviation',
    userPrompt: 'Find the mean and sample standard deviation of latency readings: [42, 45, 48, 51, 89, 120, 44, 46].',
    toolCall: {
      name: 'opti_statistics',
      args: {
        numbers: [42, 45, 48, 51, 89, 120, 44, 46],
        metric: 'all'
      }
    },
    toolResult: {
      count: 8,
      sum: 485,
      mean: 60.625,
      median: 47,
      variance: 749.125,
      standardDeviation: 27.37,
      min: 42,
      max: 120,
      range: 78
    },
    explanation: 'OptiKit runs exact mathematical variance calculation without stochastic drift.'
  },
  {
    id: 'text-similarity',
    label: 'Fuzzy Matching & Soundex',
    userPrompt: 'Calculate Levenshtein distance and American Soundex code between "Stephen" and "Steven".',
    toolCall: {
      name: 'opti_text_analysis',
      args: {
        str1: 'Stephen',
        str2: 'Steven',
        mode: 'similarity'
      }
    },
    toolResult: {
      levenshteinDistance: 2,
      soundex1: 'S315',
      soundex2: 'S315'
    },
    explanation: 'Phonetically identical codes ("S315") and exact distance computed instantly.'
  },
  {
    id: 'diff-objects',
    label: 'Deep Object Differ & Patch',
    userPrompt: 'Diff the production config vs staging config and generate RFC 6902 JSON patch operations.',
    toolCall: {
      name: 'opti_diff_objects',
      args: {
        original: { env: 'production', replicas: 5, debug: false },
        updated: { env: 'production', replicas: 8, debug: false, region: 'us-east-1' }
      }
    },
    toolResult: {
      added: { region: 'us-east-1' },
      removed: {},
      updated: { replicas: { oldValue: 5, newValue: 8 } },
      hasChanges: true
    },
    explanation: 'Provides exact structural diffs and RFC 6902 patches without hallucinating object modifications.'
  },
  {
    id: 'checksum-crc32',
    label: 'CRC32 & Fast Checksum',
    userPrompt: 'Compute IEEE 802.3 CRC32 checksum for fast cache-key validation of this payload.',
    toolCall: {
      name: 'opti_checksum',
      args: {
        text: 'opti-kit-zero-dependency-engine',
        algorithm: 'crc32Hex'
      }
    },
    toolResult: {
      checksum: 'e719b48c'
    },
    explanation: 'Hardware-grade table lookup CRC-32 for cache invalidation, data integrity, and network packets.'
  }
];

export const mcpConfigSnippet = {
  mcpServers: {
    'opti-kit': {
      command: 'npx',
      args: ['-y', '@dev_x_mohit/opti-kit-mcp']
    }
  }
};

export const mcpCompatibility = [
  { name: 'Claude Desktop', supported: true },
  { name: 'Cursor IDE', supported: true },
  { name: 'Antigravity', supported: true },
  { name: 'Cline / Roo Code', supported: true },
  { name: 'Windsurf', supported: true }
];
