module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['src/', 'variables/', 'assets/', 'redux/', 'views/', 'layouts/', 'components/'],
      },
    ],
    'react/forbid-prop-types': 0,
    'linebreak-style': 0,
  },
  plugins: ['react'],
  extends: ['airbnb'],
};
