module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // permite usar recursos modernos do JS
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // ajustes para evitar conflito e tornar mais flexível
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never',
      },
    ],
    'no-console': 'off', // permite usar console.log
    'no-unused-vars': 'off', // desliga regra do eslint
    '@typescript-eslint/no-unused-vars': ['warn'], // mas ativa a do TS com aviso
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',

    // formatação básica
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
