module.exports = {
  extends: 'next',
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
