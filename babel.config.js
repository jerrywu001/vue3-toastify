module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false, // preserve ES modules.
        corejs: { version: 3, proposals: true },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@vue/babel-plugin-jsx',
      {
        enableObjectSlots: true,
      },
    ],
    '@babel/plugin-transform-runtime', // enables the re-use of Babel's injected helper code to save on codesize.
  ],
  exclude: [/core-js/],
};
