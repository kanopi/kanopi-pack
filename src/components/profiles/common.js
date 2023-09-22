/**
 * Common Webpack configuration profile settings, common to development and proudction
 *  - Sets aliases, entry, output, externals, and optimization
 * 
 * @param {*} configuration - Kanopi Pack Configuration (Standard Interface)
 * 
 * @returns {object} Webpack configuration partial pattern
 */
module.exports = (configuration) => {
  const {
    externals: externalScripts,
    filePatterns: { entryPoints, jsOutputPattern },
    paths: { aliases },
    scripts: { additionalResolveExtensions, useJsxSyntax }
  } = configuration;

  let resolveExtensions = ['.js', '.ts', '.json'];

  if (useJsxSyntax) {
    resolveExtensions = resolveExtensions.concat(['.jsx', '.tsx']);
  }

  if ('' !== additionalResolveExtensions) {
    let extensions = additionalResolveExtensions.split(',');
    resolveExtensions = resolveExtensions.concat(extensions);
  }

  return {
    resolve: {
      extensions: resolveExtensions,
      alias: aliases
    },
    entry: entryPoints,
    externals: externalScripts,
    output: jsOutputPattern,
    optimization: {
      chunkIds: 'named',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        name: 'central',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor'
          }
        }
      }
    }
  };
}
