const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

const FileRules = require('./rules/file');
const ScssLoaders = require('./loaders/scss');
const TypescriptRules = require('./rules/typescript');

const basePackConfig = require('./kanopi.pack');
let kanopiPackConfig = {
  ...basePackConfig,
  sourceMaps: true
};

module.exports = merge.smart(
  common(kanopiPackConfig),
  {
    output: {
      publicPath: kanopiPackConfig.paths.devServerPublic
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      ...kanopiPackConfig.devServer,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: {
        disableDotRule: true,
        htmlAcceptHeaders: [
          'text/html',
          'application/xhtml+xml'
        ]
      },
      hotOnly: true,
      inline: true,
      overlay: { warnings: false, errors: true }
    },
    module: {
      rules: [
        ...FileRules(),
        ...TypescriptRules(kanopiPackConfig),
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader',
            ...ScssLoaders(kanopiPackConfig, `$asset_root: '${kanopiPackConfig.devServer.host}';`)
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new AssetsPlugin({
        fileTypes: ['js', 'css'],
        keepInMemory: true,
        includeAllFileTypes: false,
        includeManifest: 'manifest',
        manifestFirst: true,
        path: path.join('assets', 'dist'),
        prettyPrint: true
      })
    ]
  }
);