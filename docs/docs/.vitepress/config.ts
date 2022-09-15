import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
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
        .use(require('markdown-it-directive'))
        .use(
          require('markdown-it-directive-webcomponents'),
          {
            components: [
              {
                present: 'both',
                name: 'playground',
                tag: 'playground',
                parseInner: true,
              },
              {
                present: 'both',
                name: 'sandbox',
                tag: 'sand-box',
                allowedAttrs: ['readonly', 'closabletabs', 'template'],
                parseInner: true,
              },
              {
                present: 'both',
                name: 'code-group',
                tag: 'code-group',
                allowedAttrs: ['tag'],
                parseInner: true,
              },
            ],
          }
      );
    },
  },

  themeConfig: {
    nav: nav(),

    sidebar: sidebarConfig(),

    editLink: {
      pattern: 'https://github.com/jerrywu001/jerry-todo/edit/main/docs/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerrywu001/jerry-todo' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present jerrywu001'
    },
  },

  vite: {
    resolve: {
      alias: {
        'jerry-todo': `${path.resolve(__dirname, '../../../src')}`,
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
          link: 'https://github.com/jerrywu001/jerry-todo/releases'
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
      text: 'Usage',
      collapsible: true,
      items: [
        { text: 'Positioning toast', link: '/usage/positioning-toast' },
        { text: 'Replace the default transition', link: '/usage/replace-default-transition' },
        { text: 'Handling promises', link: '/usage/promise' },
        { text: 'Handling autoClose', link: '/usage/auto-close' },
        { text: 'Render more than string', link: '/usage/render-more-than-string' },
        { text: 'Remove toast', link: '/usage/remove-toast-programmatically' },
        { text: 'Icons', link: '/usage/icons' },
        { text: 'Use a custom id', link: '/usage/use-a-custom-id' },
        { text: 'Use a custom close button', link: '/usage/custom-close-button' },
        { text: 'Prevent duplicate', link: '/usage/prevent-duplicate' },
        { text: 'Delay notification appearance', link: '/usage/delay-toast-appearance' },
        { text: 'Define callback', link: '/usage/define-callback' },
        { text: 'Pause on focus loss', link: '/usage/pause-on-focus-loss' },
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
