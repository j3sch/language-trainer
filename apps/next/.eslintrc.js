module.exports = {
  extends: ["next/babel","next/core-web-vitals"]
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}