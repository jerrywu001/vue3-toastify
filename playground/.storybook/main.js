const path = require('path');
const Vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const { mergeConfig } = require('vite');

module.exports = {
  stories: [
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/vue3',
  async viteFinal(config, { configType: env }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          'jerry-todo': path.resolve(__dirname, '../../src'),
          'jerry-todo/': path.resolve(__dirname, '../../src/'),
        },
      },
      plugins: [
        Vue({
          reactivityTransform: true,
        }),

        vueJsx(),
      ],
    });
  },
};
