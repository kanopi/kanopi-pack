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

    const OptimizeCSSAssetsPlugin = requirePackageModule('optimize-css-assets-webpack-plugin');
    const TerserWebpackPlugin = requirePackageModule('terser-webpack-plugin');

    const optimization = {
        minimize: enableMinification,
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
      }
      
      if (enableMinification) {
        optimization.minimizer.push(new TerserWebpackPlugin(minificationOptions));
      }

    return {
        mode: 'production',
        optimization: optimization    
    };
}