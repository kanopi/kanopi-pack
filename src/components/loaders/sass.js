module.exports = (environment) => {
  const {
    resolver: { requirePackageModule },
    paths: { node = '' },
    sourceMap = false
  } = environment;

  return {
    loader: 'sass-loader',
    options: {
      implementation: requirePackageModule('sass'),
      sassOptions: {
        includePaths: [
          node
        ],
        linefeed: 'lf',
        outputStyle: 'expanded',
      },
      sourceMap: sourceMap,
    }
  };
}
