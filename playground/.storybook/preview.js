import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
  pixel2: {
    name: 'Pixel 2',
    styles: {
      width: '411px',
      height: '731px',
    },
  },
  iphone5: {
    name: 'iPhone 5/SE',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  iphone678: {
    name: 'iPhone 6/7/8',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
};

// https://storybook.js.org/docs/react/essentials/viewport
export const parameters = {
  padded: false,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Intro"],
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
};
