import { defineConfig } from 'tsup';
import babel from 'esbuild-plugin-babel';

// https://tsup.egoist.dev/
// https://esbuild.github.io/

export default defineConfig({
  name: 'tsup',
  entry: [
    './src/index.ts',
  ],
  outExtension({ format }) {
    const extension = format === 'esm' ? '.mjs' : '.js';
    return {
      js: extension,
    };
  },
  target: 'es6',
  format: [
    'cjs',
    'esm',
  ],
  shims: false,
  clean: true,
  dts: './src/index.ts',
  // sourcemap: true,
  splitting: false,
  minify: true,
  esbuildPlugins: [
    babel(),
  ],
});
