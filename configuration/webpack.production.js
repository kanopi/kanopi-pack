const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const FileRules = require('./rules/file');
const ScssLoaders = require('./loaders/scss');
const TypescriptRules = require('./rules/typescript');

const kanopiPackConfig = require('./kanopi.pack');

module.exports = merge(
  common(kanopiPackConfig),
  {
    mode: "production",
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        ...FileRules(),
        ...TypescriptRules(kanopiPackConfig),
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            ...ScssLoaders(kanopiPackConfig)
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: kanopiPackConfig.filePatterns.cssOutputPattern
      }),
      new CleanWebpackPlugin(),
      new AssetsPlugin({
        fileTypes: ["js", "css"],
        includeAllFileTypes: false,
        includeManifest: "manifest",
        manifestFirst: true,
        path: kanopiPackConfig.paths.distribution,
        prettyPrint: true
      })
    ]
  }
);