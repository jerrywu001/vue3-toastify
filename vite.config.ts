/// <reference types="vitest" />
/// <reference types="vite/client" />

import dts from 'vite-plugin-dts';
import fs from 'fs';
import path from 'path';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import pkg from './package.json';

const resolvePath = (pathName: string) => path.resolve(__dirname, pathName);

export default defineConfig({
  resolve: {
    alias: {
      'vue3-toastify': resolvePath('./src/index.ts'),
    },
  },
  build: {
    target: browserslistToEsbuild(),
    minify: true,
    lib: {
      fileName: (type) => {
        if (type === 'es') return 'index.mjs';
        if (type === 'cjs') return 'index.js';
        return 'index.js';
      },
      entry: resolvePath('src/index.ts'),
      formats: ['es', 'cjs'],
    },
    // sourcemap: true,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: [
        ...Object.keys(pkg.devDependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
    },
  },
  plugins: [
    Vue({
      // reactivityTransform: true,
    }),
    vueJsx(),
    // https://www.npmjs.com/package/vite-plugin-dts
    dts({
      include: 'src',
      rollupTypes: true,
      afterBuild() {
        try {
          const filePath = resolvePath('dist/index.d.ts')
          const buffer = fs.readFileSync(filePath)
          const content = String(buffer).replace('declare interface ToastPromiseParams', 'export interface ToastPromiseParams')
          fs.writeFileSync(filePath, content);
        } catch (error) {
          //
        }
      },
    }),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    // transformMode: {
    //   web: [/.[tj]sx$/],
    // },
  },
});
