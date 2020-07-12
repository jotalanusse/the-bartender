module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    'block-scoped-var': ['error'],
    curly: ['error'],
    eqeqeq: ['error'],
    'no-redeclare': ['error'],
    'no-unused-vars': ['error'],
    'no-use-before-define': ['error'],
    'no-console': 0,
    'max-len': 0,
    'linebreak-style': 0,
  },
};
