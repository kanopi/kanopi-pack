const path = require('path');

/**
 * Set of Webpack Plugins for Development server environments
 * 
 * @param {*} environment - Kanopi Pack environment (Standard Interface)
 * 
 * @returns {Array} - Set of required and configured Webpack Plugins
 */
module.exports = (environment) => {
  const { requirePackageModule } = environment.resolver;
  const AssetsPlugin = requirePackageModule('assets-webpack-plugin');

  return [
    new AssetsPlugin({
      fileTypes: ['js', 'css'],
      fullPath: false,
      keepInMemory: true,
      includeAllFileTypes: false,
      includeManifest: 'manifest',
      manifestFirst: true,
      path: path.join('assets', 'dist'),
      prettyPrint: true
    })
  ];
}
