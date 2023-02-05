import DefaultTheme from 'vitepress/theme';
// @ts-ignore
import Playground from '../../../../playground/src/pages/index.vue';
// @ts-ignore
import Sandbox from '../../components/SandBox.vue';

import './index.scss';

// eslint-disable-next-line import/no-relative-packages
import '../../../../src/styles/main.scss'; // 不要修改或删除

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Playground', Playground);
    app.component('Sandbox', Sandbox);
  }
}
