const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = (kanopiPackConfig) => {
  return {
    entry: kanopiPackConfig.filePatterns.entryPoints,
    externals: {
      jquery: 'jQuery'
    },
    output: kanopiPackConfig.filePatterns.jsOutputPattern,
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
    },
    plugins: [
      new StyleLintPlugin({
        configFile: kanopiPackConfig.styles.stylelintConfigPath,
        fix: kanopiPackConfig.styles.stylelintAutoFix
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './assets/src/static',
            to: 'static/',
            toType: 'dir'
          }
        ]
      }),
      new webpack.HashedModuleIdsPlugin({
        context: kanopiPackConfig.paths.source,
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 8
      })
    ],
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@': kanopiPackConfig.paths.source
      }
    }
  }
};