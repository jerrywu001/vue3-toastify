/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import vueJsx from '@vitejs/plugin-vue-jsx';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      'vue3-toastify': path.resolve(__dirname, process.env.USEPACK === 'true' ? '../dist/esm' : '../src'),
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    Vue({
      // reactivityTransform: true,
    }),

    vueJsx(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      importMode: 'sync',
    }),

    WindiCSS(),
  ],
});
