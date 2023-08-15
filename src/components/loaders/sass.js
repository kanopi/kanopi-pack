/**
 *  Implements the SASS loader
 * 
 * @param {object} environment - Kanopi Pack environment (Standard Interface)
 * 
 * @returns {import("webpack").LoaderModule} - Webpack Loader module
 */
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
