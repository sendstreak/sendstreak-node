module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true
  },
  extends: [
    'eslint-config-sendstreak'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true
    },
    ecmaVersion: 11,
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  root: true,
  rules: {
    'no-console': 'off'
  }
};
