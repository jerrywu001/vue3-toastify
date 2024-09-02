module.exports = {
  // https://github.com/conventional-changelog/commitlint/#what-is-commitlint
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['chore', 'feat', 'fix', 'doc', 'style', 'update', 'refactor', 'test', 'framework', 'revert'],
    ],
    'type-case': [0, 'always', 'start-case'],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
