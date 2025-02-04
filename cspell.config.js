const vsCodeSettings = require('./.vscode/settings.json');

module.exports = {
  $schema:
    'https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json',
  allowCompoundWords: true,
  caseSensitive: true,
  dictionaries: [
    'bash',
    'en_us',
    'en-gb',
    'fonts',
    'html',
    'lorem-ipsum',
    'node',
    'npm',
    'pt-br',
    'typescript',
  ],
  ignorePaths: [
    'dist',
    'node_modules',
    'local',
    'nx.json',
    'package.json',
    'pnpm-lock.yaml',
    'tmp',
    '.husky',
    '.vscode',
    '.gitignore',
    'cspell.config.js',
  ],
  ignoreWords: vsCodeSettings['cSpell.ignoreWords'],
  language: 'en',
  useGitignore: true,
  version: '0.2',
  words: vsCodeSettings['cSpell.words'],
};
