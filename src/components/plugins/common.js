const path = require('path');

/**
 * Common set of Webpack Plugins for all environments
 * 
 * @param {*} environment - Kanopi Pack environment (Standard Interface)
 * @returns {Array} - Set of required and configured Webpack Plugins
 */
module.exports = (environment) => {
    const {
      paths: { source: sourcePath },
      resolver: { requirePackageModule },
      scripts: {
        esLintAutoFix,
        esLintDisable,
        esLintFileTypes
      },
      styles: {
        styleLintAutoFix,
        styleLintConfigBaseDir,
        styleLintConfigFile,
        styleLintIgnorePath
      }
    } = environment;
    const CopyWebpackPlugin = requirePackageModule('copy-webpack-plugin');
    const EsLintPlugin = requirePackageModule('eslint-webpack-plugin');
    const StyleLintPlugin = requirePackageModule('stylelint-webpack-plugin');
    const webpack = requirePackageModule('webpack');
    
    let plugins = [
        new StyleLintPlugin({
          configBasedir: styleLintConfigBaseDir,
          configFile: styleLintConfigFile,
          fix: styleLintAutoFix,
          ignorePath: styleLintIgnorePath
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(sourcePath, 'static'),
              to: 'static/',
              toType: 'dir'
            }
          ]
        }),
        new webpack.HashedModuleIdsPlugin({
          context: sourcePath,
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 8
        })
      ];

      if (true !== esLintDisable) {
        plugins = plugins.concat( [
          new EsLintPlugin({
          context: sourcePath,
          extensions: esLintFileTypes,
          fix: esLintAutoFix
        })
      ]);
      }

      return plugins;
}
