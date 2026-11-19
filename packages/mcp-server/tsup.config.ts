import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    'tools/index': 'src/tools/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: false,
  splitting: false,
  sourcemap: true,
  shims: true,
});
