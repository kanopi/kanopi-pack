const fs = require('fs');
const { exit } = require('process');

/**
 * @typedef {ConfigurationFileLoader}
 * @property {Function} read - Read the configuration
 */

/**
 * @returns {ConfigurationFileLoader}
 */
module.exports = {
  /**
   * Read the Kanopi Pack configuration object
   * 
   * @param {PathResolver} pathResolver
   * @returns {Object}
   */
  read: (pathResolver) => {
    const chalk = pathResolver.requirePackageModule('chalk');

    const configuration_locations = [
      pathResolver.toCallingPackage('kanopi-pack.js'),
      pathResolver.toCallingPackage('assets/configuration/kanopi-pack.js'),
      pathResolver.toCallingPackage('kanopi-pack.json'),
      pathResolver.toCallingPackage('assets/configuration/kanopi-pack.json')
    ];

    let kanopiPackConfig;

    for (let path_index in configuration_locations) {
      let config_path = configuration_locations[path_index];
      if (fs.existsSync(config_path)) {
        kanopiPackConfig = require(config_path);
        break;
      }
    }

    if (!kanopiPackConfig) {
      console.log(chalk.red("ERROR: ") + "kanopi-pack.json configuration file not found, checked the following locations:");
      configuration_locations.forEach((location) => {
        console.log(chalk.yellow(location));
      })
      exit();
    }

    return kanopiPackConfig;
  }
}
