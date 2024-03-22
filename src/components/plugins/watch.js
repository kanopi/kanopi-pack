/**
 * Set of Webpack Plugins for Watch, like a without the directory clear Production-style environment
 * 
 * @param {PackConfiguration} environment - Kanopi Pack environment (Standard Interface)
 * 
 * @returns {Array} - Set of required and configured Webpack Plugins
 */
module.exports = (environment) => {
  const {
    filePatterns: { cssOutputPattern },
    paths: { distribution: distributionPath },
    resolver: { requirePackageModule }
  } = environment;

  const AssetsPlugin = requirePackageModule('assets-webpack-plugin');
  const MiniCssExtractPlugin = requirePackageModule('mini-css-extract-plugin');

  return [
    new MiniCssExtractPlugin({
      filename: cssOutputPattern
    }),
    new AssetsPlugin({
      fileTypes: ['js', 'css'],
      fullPath: false,
      includeAllFileTypes: false,
      includeManifest: 'manifest',
      manifestFirst: false,
      path: distributionPath,
      prettyPrint: true,
      removeFullPathAutoPrefix: true
    })
  ];
}
