module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'arrow-parens': [2, 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    "MusicKit": true
  }
};
