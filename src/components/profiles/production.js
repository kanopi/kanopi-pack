/**
 * Webpack Configuration profile settings for Proudction builds
 * 
 * @param {*} environment - Kanopi Pack environment (Standard Interface)
 * 
 * @returns {object} Webpack environment partial pattern
 */
module.exports = (environment) => {
  const {
    minification: { enable: enableMinification, options: minificationOptions },
    resolver: { requirePackageModule }
  } = environment;

  const CSSMinimizerPlugin = requirePackageModule('css-minimizer-webpack-plugin');
  const TerserWebpackPlugin = requirePackageModule('terser-webpack-plugin');

  const optimization = enableMinification
    ? {
      minimize: true,
      minimizer: [
        new CSSMinimizerPlugin(),
        new TerserWebpackPlugin(minificationOptions)
      ]
    }
    : {};

  return {
    mode: 'production',
    optimization: optimization
  };
}
