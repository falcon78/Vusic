module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'arrow-parens': [2, 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
