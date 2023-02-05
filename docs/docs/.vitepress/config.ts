import { defineConfig } from 'vitepress';
import container from 'markdown-it-container';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { renderSandbox } from 'vitepress-plugin-sandpack';
import { version } from '../../../package.json';
import path from 'path';

export default defineConfig({
  lang: 'en-US',
  title: 'Vue3 toastify',
  description: 'Vue3 toastify docs',
  lastUpdated: true,

  markdown: {
    config(md) {
      md
        .use(container, 'sandbox', {
          render (tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox');
          },
        });
    },
  },

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
        { text: 'Installation', link: '/get-started/installation' },
      ]
    },
    {
      text: 'API Reference',
      collapsible: true,
      items: [
        { text: 'Container', link: '/api/container' },
        { text: 'Toast', link: '/api/toast' },
      ]
    },
    {
      text: 'Usage',
      collapsible: true,
      items: [
        { text: 'Container id', link: '/usage/container' },
        { text: 'Positioning toast', link: '/usage/positioning-toast' },
        { text: 'Replace the default transition', link: '/usage/replace-default-transition' },
        { text: 'Use a controlled progress bar', link: '/usage/use-a-controlled-progress-bar' },
        { text: 'How to style', link: '/usage/how-to-style' },
        { text: 'Define custom animation', link: '/usage/custom-animation' },
        { text: 'Handling promises', link: '/usage/promise' },
        { text: 'Handling autoClose', link: '/usage/auto-close' },
        { text: 'Render html string', link: '/usage/render-html-string' },
        { text: 'Render more than string', link: '/usage/render-more-than-string' },
        { text: 'Remove toast', link: '/usage/remove-toast-programmatically' },
        { text: 'Update a toast', link: '/usage/update-toast' },
        { text: 'Icons', link: '/usage/icons' },
        { text: 'Use a custom id', link: '/usage/use-a-custom-id' },
        { text: 'Use a custom close button', link: '/usage/custom-close-button' },
        { text: 'Prevent duplicate', link: '/usage/prevent-duplicate' },
        { text: 'Enable right to left support', link: '/usage/enable-right-to-left-support' },
        { text: 'Delay notification appearance', link: '/usage/delay-toast-appearance' },
        { text: 'Define callback', link: '/usage/define-callback' },
        { text: 'Pause on focus loss', link: '/usage/pause-on-focus-loss' },
        { text: 'Accessibility', link: '/usage/accessibility' },
      ]
    },
  ];
}
