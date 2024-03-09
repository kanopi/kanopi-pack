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
    sourceMaps = false,
    styles: { postCssCustomizePluginOrder: customOrder, postCssCustomParser: postCssParser, useSass }
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

  const PostCSSOptions = 'undefined' !== typeof postCssParser
    ? {
      parser: postCssParser,
      plugins: PostCSSPlugins
    }
    : {
      plugins: PostCSSPlugins
    }

  let prependedPaths = environment?.styles?.scssIncludes ?? [];
  let usePrependedPaths = Array.isArray(prependedPaths) && 0 < prependedPaths.length;

  let baseRules = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: sourceMaps
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: PostCSSOptions,
        sourceMap: sourceMaps
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
