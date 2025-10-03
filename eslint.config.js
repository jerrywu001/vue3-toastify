import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import eslintVue from 'eslint-plugin-vue';

export default [
  ...eslintVue.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic': stylistic,
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
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1}],
      '@stylistic/no-floating-decimal': 'error' ,
      '@stylistic/max-len': ['error', { 'code': 280 }],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/brace-style': 'error',
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/array-element-newline': ['error', { 'multiline': true, consistent: true }],
      '@stylistic/array-bracket-newline': ['error', { 'multiline': true }],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/new-parens': ['error', 'always'],
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/key-spacing': ['error', { afterColon: true }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      '@stylistic/no-extra-parens': 'error',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': 'error',
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/semi-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': 'error',
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/switch-colon-spacing': 'error',
      '@stylistic/template-tag-spacing': 'error',
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'], next: '*'},
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']}
      ],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          asyncArrow: 'always',
          anonymous: 'never',
          named: 'never',
        }
      ],

      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-newline': ['error', { 'prevent': false }],
      '@stylistic/jsx-indent-props': [2, 2],
      '@stylistic/jsx-one-expression-per-line': 'error',
      '@stylistic/jsx-max-props-per-line': [1, { 'when': 'multiline' }],
      '@stylistic/jsx-equals-spacing': [2, 'never'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-self-closing-comp': ['error', { 'component': true, 'html': true }],
      '@stylistic/jsx-closing-bracket-location': [1, 'line-aligned'],
      '@stylistic/jsx-curly-spacing': ['error', { 'when': 'never' }],
      '@stylistic/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],

      '@stylistic/member-delimiter-style': 'error',
      '@stylistic/type-annotation-spacing': [
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

      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',

      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
];
