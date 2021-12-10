const { 
  components: {
    plugins: { common: commonPlugins },
    profiles: { common: commonProfile }
  }
} = require('../package-builder');

/**
 * Pre-built Common Webpack configuration for all environments
 *  - Any extended, passed configuration must have the default configuration shape included
 * 
 * @param {*} configuration - Kanopi Pack Configuration (Standard Interface)
 * @returns {object} Webpack configuration
 */
module.exports = (configuration) => {
  return {
    ...commonProfile(configuration),
    plugins: commonPlugins(configuration)
  }
};