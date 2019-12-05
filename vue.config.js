(config) => {
  config.module
    .rule('eslint')
    .use('eslint-loader')
    .tap((opts) => ({ ...opts, emitWarning: true }));
};
