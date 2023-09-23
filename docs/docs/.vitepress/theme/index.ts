import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Documate from '@documate/vue';
// @ts-ignore
import Playground from '../../../../playground/src/pages/index.vue';
// @ts-ignore
import Sandbox from '../../components/SandBox.vue';

import './index.scss';
import '@documate/vue/dist/style.css';

// eslint-disable-next-line import/no-relative-packages
import '../../../../src/styles/main.scss'; // 不要修改或删除

export default {
  ...DefaultTheme,
  // https://aircode.io/dashboard
  // https://documate.site/
  Layout: h(DefaultTheme.Layout, null, {
    'nav-bar-content-before': () => h(Documate, {
      endpoint: 'https://qaux941yzc.us.aircode.run/ask',
    }),
  }),
  enhanceApp({ app }) {
    app.component('Playground', Playground);
    app.component('Sandbox', Sandbox);
  }
}
