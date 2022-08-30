import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import WindiCSS from 'vite-plugin-windicss';
import { version } from '../../../package.json';
import path from 'path';

export default defineConfig({
  lang: 'en-US',
  title: 'Vue3 toastify',
  description: 'Vue3 toastify docs',
  lastUpdated: true,

  themeConfig: {
    nav: nav(),

    sidebar: sidebarConfig(),

    editLink: {
      pattern: 'https://github.com/jerrywu001/vue3-toastify/edit/main/docs/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerrywu001/vue3-toastify' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present jerrywu001'
    },
  },

  vite: {
    resolve: {
      alias: {
        'vue3-toastify': `${path.resolve(__dirname, '../../../src')}`,
      },
    },
    plugins: [
      vueJsx(),
      WindiCSS(),
    ],
  },
})

function nav() {
  return [
    { text: 'Get Started', link: '/get-started/introduction', activeMatch: '/get-started/' },
    { text: 'Usage', link: '/usage/positioning-toast', activeMatch: '/usage/' },
    { text: 'API Reference', link: '/api/toast', activeMatch: '/api/' },
    {
      text: version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/jerrywu001/vue3-toastify/releases'
        }
      ]
    }
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Get Started',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/get-started/introduction' },
      ]
    },
    {
      text: 'Usage',
      collapsible: true,
      items: [
        { text: 'Positioning toast', link: '/usage/positioning-toast' },
      ]
    },
    {
      text: 'API Reference',
      collapsible: true,
      items: [
        { text: 'Toast', link: '/api/toast' },
      ]
    },
  ];
}
