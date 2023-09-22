/**
 * @typedef {Object} DotEnvConfiguration
 * @property {boolean} dotenvEnable - If the feature is enabled
 * @property {Object} dotenvConfiguration - Pass through a DotEnv configuration object
 */

module.exports = {
  /**
   * 
   * @param {DotEnvConfiguration} configuration
   * @returns {DotEnvConfiguration}
   */
  readEnvironmentVariables: ({ dotenvEnable = true, dotenvConfiguration = {} } = {}) => {
    return {
      dotenvEnable,
      dotenvConfiguration
    };
  }
};
