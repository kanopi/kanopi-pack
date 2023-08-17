/**
 * Set of Webpack Loaders for Stylesheets
 *  - Implements the CSS and PostCSS loaders
 *  - Optionally use SASS via option
 *  - Allows pre-pending file paths to all CSS entry-points
 *  - Excludes a style-loader, since that tends to vary per application/framework
 * 
 * @param {object} environment - Kanopi Pack environment (Standard Interface)
 * 
 * @returns {Array} - Set of required and configured Webpack Plugins
 */
module.exports = (environment) => {
  const {
    styles: { postCssCustomizePluginOrder: customOrder, useSass }
  } = environment;

  /**
   * @var {Array<string|Array<string|Object>} PostCSSPlugins - Set of plugin names or objects with plugin name and options
   */
  const PostCSSPlugins = 'undefined' !== typeof (customOrder) && Array.isArray(customOrder)
    ? customOrder
    : [
      'postcss-import-ext-glob',
      'postcss-import',
      'postcss-mixins',
      'postcss-custom-selectors',
      'postcss-nested',
      'postcss-custom-media',
      [
        'postcss-preset-env',
        {
          autoprefixer: { 'grid': 'autoplace' }
        }
      ]
    ];

  let isSourceMapsEnabled = environment?.sourceMaps ?? false;
  let prependedPaths = environment?.styles?.scssIncludes ?? [];
  let usePrependedPaths = Array.isArray(prependedPaths) && 0 < prependedPaths.length;

  let baseRules = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: isSourceMapsEnabled
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: PostCSSPlugins
        },
        sourceMap: isSourceMapsEnabled
      }
    },
  ];

  if (useSass) {
    baseRules.push(require('./sass')(environment));
  }

  if (usePrependedPaths) {
    baseRules.push({
      loader: 'style-resources-loader',
      options: {
        patterns: prependedPaths
      }
    });
  }

  return baseRules;
}
