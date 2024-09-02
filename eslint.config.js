import stylisticTs from '@stylistic/eslint-plugin-ts';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticPlus from '@stylistic/eslint-plugin-plus';
import parserTs from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import eslintVue from 'eslint-plugin-vue';

export default [
  ...eslintVue.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
      '@stylistic/js': stylisticJs,
      '@stylistic/jsx': stylisticJsx,
      '@stylistic/plus': stylisticPlus,
    },
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.vue',
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
          tsx: true
        },
        ecmaVersion: 2020,
        useJSXTextNode: true,
        sourceType: 'module',
        parser: parserTs,
      }
    },
    ignores: [
      'node_modules',
      'dist/**/*.ts',
      'build',
      'coverage',
      'eslint.config.js',
      '**/*.css',
      '**/*.scss',
      '**/*.less',
      'src/assets',
    ],
    rules: {
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1}],
      '@stylistic/js/no-floating-decimal': 'error' ,
      '@stylistic/js/max-len': ['error', { 'code': 280 }],
      '@stylistic/js/arrow-spacing': 'error',
      '@stylistic/js/block-spacing': 'error',
      '@stylistic/js/brace-style': 'error',
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/array-element-newline': ['error', { 'multiline': true, consistent: true }],
      '@stylistic/js/array-bracket-newline': ['error', { 'multiline': true }],
      '@stylistic/js/array-bracket-spacing': ['error', 'never'],
      '@stylistic/js/new-parens': ['error', 'always'],
      '@stylistic/js/computed-property-spacing': ['error', 'never'],
      '@stylistic/js/arrow-parens': ['error', 'always'],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/js/key-spacing': ['error', { afterColon: true }],
      '@stylistic/js/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/lines-between-class-members': ['error', 'always'],
      '@stylistic/js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      '@stylistic/js/no-extra-parens': 'error',
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/object-property-newline': 'error',
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/semi-spacing': 'error',
      '@stylistic/js/space-before-blocks': 'error',
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/js/space-unary-ops': 'error',
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/spaced-comment': ['error', 'always'],
      '@stylistic/js/switch-colon-spacing': 'error',
      '@stylistic/js/template-tag-spacing': 'error',
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/template-curly-spacing': ['error', 'never'],
      '@stylistic/js/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/js/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'], next: '*'},
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']}
      ],
      '@stylistic/js/space-before-function-paren': [
        'error',
        {
          asyncArrow: 'always',
          anonymous: 'never',
          named: 'never',
        }
      ],

      '@stylistic/js/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx/jsx-newline': ['error', { 'prevent': false }],
      '@stylistic/jsx/jsx-indent-props': [2, 2],
      '@stylistic/jsx/jsx-one-expression-per-line': 'error',
      '@stylistic/jsx/jsx-props-no-multi-spaces': 'error',
      '@stylistic/jsx/jsx-max-props-per-line': [1, { 'when': 'multiline' }],
      '@stylistic/jsx/jsx-equals-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx/jsx-self-closing-comp': ['error', { 'component': true, 'html': true }],
      '@stylistic/jsx/jsx-closing-bracket-location': [1, 'line-aligned'],
      '@stylistic/jsx/jsx-curly-spacing': ['error', { 'when': 'never' }],
      '@stylistic/jsx/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],

      '@stylistic/ts/member-delimiter-style': 'error',
      '@stylistic/ts/type-annotation-spacing': [
        'error',
        {
          before: true,
          after: true,
          overrides: {
            colon: {
              before: false,
              after: true
            },
          }
        }
      ],

      '@stylistic/plus/indent-binary-ops': ['error', 2],
      '@stylistic/plus/type-generic-spacing': 'error',
      '@stylistic/plus/type-named-tuple-spacing': 'error',

      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
];
