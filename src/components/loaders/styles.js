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
    resolver: { requirePackageModule },
    styles: { postCssCustomizePluginOrder: customOrder, useSass }
  } = environment;

  const PostCSSPlugins = 'undefined' !== typeof (customOrder) && Array.isArray(customOrder) && 0 < customOrder.length
    ? customOrder
    : [
      'postcss-import-ext-glob',
      'postcss-import',
      'postcss-mixins',
      'postcss-custom-selectors',
      'postcss-nested',
      'postcss-custom-media',
      'postcss-preset-env'
    ];

  let ActivePostCSSPlugins = [];

  /**
   * Require each PostCSS plugin if they are passed as the plugin name; If an object, assume the plugin is loaded and may have options
   */
  PostCSSPlugins.forEach((pluginName) => {
    let currentModule = 'string' === typeof pluginName ? requirePackageModule(pluginName) : pluginName;

    'postcss-present-env' === currentModule
      ? ActivePostCSSPlugins.push([
        pluginName,
        {
          autoprefixer: { 'grid': 'autoplace' }
        }
      ])
      : ActivePostCSSPlugins.push(requirePackageModule(pluginName));
  });

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
          plugins: ActivePostCSSPlugins
        },
        sourceMap: isSourceMapsEnabled
      }
    },
  ];

  if (useSass) {
    baseRules.push(requirePackageModule(environment));
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
