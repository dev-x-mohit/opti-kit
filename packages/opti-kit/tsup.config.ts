import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build CJS and ESM outputs
  dts: true,              // Generate declaration files (.d.ts)
  splitting: false,
  sourcemap: false,       // Don't ship sourcemaps to npm
  clean: true,            // Clean the dist directory before build
  minify: false,          // Keep code readable for the package
});
