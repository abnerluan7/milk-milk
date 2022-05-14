module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'prettier',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@shared/',
          '/^Components/',
          '/^Libs/',
          '/^Services/',
          '/^Types/',
          '/^Providers/',
          '/^Schemas/',
          '/^Screens/',
          '/^Helpers/',
          [('parent', 'sibling', 'index')],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
