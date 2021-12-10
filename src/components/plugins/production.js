/**
 * Set of Webpack Plugins for Development server environments
 * 
 * @param {*} environment - Kanopi Pack environment (Standard Interface)
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
  const { CleanWebpackPlugin } = requirePackageModule('clean-webpack-plugin');
  const MiniCssExtractPlugin = requirePackageModule('mini-css-extract-plugin');

  return [
    new MiniCssExtractPlugin({
      filename: cssOutputPattern
    }),
    new CleanWebpackPlugin(),
    new AssetsPlugin({
      fileTypes: ['js', 'css'],
      includeAllFileTypes: false,
      includeManifest: 'manifest',
      manifestFirst: true,
      path: distributionPath,
      prettyPrint: true
    })
  ];
}
