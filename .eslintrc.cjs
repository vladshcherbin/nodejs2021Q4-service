module.exports = {
  extends: '@shcherbin/eslint-config/node-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['eslint-plugin-tsdoc'],
  rules: {
    'tsdoc/syntax': 'warn'
  },
  overrides: [{
    files: 'src/**/index.ts',
    rules: {
      'import/prefer-default-export': 'off'
    }
  }]
}
