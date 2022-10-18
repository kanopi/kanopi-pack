/**
 * @typedef {DotEnvConfiguration}
 * @property {boolean} dotenvEnable - If the feature is enabled
 * @property {Object} dotenvConfiguration - Pass through a DotEnv configuration object
 */

module.exports = {
    readEnvironmentVariables: ({ dotenvEnable = true, dotenvConfiguration = {} } = {}) => {
        return {
            dotenvEnable,
            dotenvConfiguration
        };
    }
};