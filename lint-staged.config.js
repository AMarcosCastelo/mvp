module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*': 'cspell --no-must-find-files',
  '**/*.{[jt]s?(x),yaml,json}': 'eslint --fix',
  'package.json': 'npmPkgJsonLint .',
};
