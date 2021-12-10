/**
 * Common set of Webpack Plugins for all environments
 * 
 * @param {*} environment - Kanopi Pack environment (Standard Interface)
 * @returns {Array} - Set of required and configured Webpack Plugins
 */
module.exports = (environment) => {
    const { requirePackageModule } = environment.resolver;
    const CopyWebpackPlugin = requirePackageModule('copy-webpack-plugin');
    const StyleLintPlugin = requirePackageModule('stylelint-webpack-plugin');
    const webpack = requirePackageModule('webpack');
    
    return [
        new StyleLintPlugin({
          configBasedir: environment.styles.styleLintConfigBaseDir,
          configFile: environment.styles.styleLintConfigFile,
          fix: environment.styles.styleLintAutoFix,
          ignorePath: environment.styles.styleLintIgnorePath
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
          context: environment.paths.source,
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 8
        })
      ];
}
