// https://stylelint.io/user-guide/get-started
// 执行npx stylelint **/*.{css,less,scss,vue} 进行校验

module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  // rule覆盖（根据自己喜好来配置）
  rules: {
    'string-quotes': 'single',
    'property-no-vendor-prefix': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'custom-property-pattern': null,
    'color-hex-length': 'short',
    'color-function-notation': null,
    'alpha-value-notation': null,
    'value-no-vendor-prefix': null,
    'selector-class-pattern': null,
    'function-url-quotes': null,
    'no-missing-end-of-source-newline': true,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
};
