const vsCodeSettings = require('./.vscode/settings.json');

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', vsCodeSettings['conventionalCommits.scopes']],
  },
};
