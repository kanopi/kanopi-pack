/**
 * @typedef {Object} PathResolver
 * @property {Function} toCallingPackage - Find a package from the modules directory
 * @property {Function} toCallingPackage - Find the current path to a file in the source/calling project for the process
 * @property {Function} toKanopiPack - Find a path in the Kanopi Pack package
 */

const path = require('path');
const callingProjectRoot = process.cwd();
const kanopiPackPackageRoot = path.resolve(__dirname, '..', '..');

/**
 * @returns {PathResolver}
 */
module.exports = {
  /**
   * Find a package from the modules directory
   * 
   * @param {string} packageName 
   * @returns {string}
   */
  requirePackageModule: (packageName) => {
    return require(path.resolve(callingProjectRoot, 'node_modules', packageName));
  },
  /**
   * Find the current path to a file in the source/calling project for the process
   * 
   * @param {string} pathFragment 
   * @returns {string}
   */
  toCallingPackage: (pathFragment) => {
    return path.resolve(callingProjectRoot, pathFragment);
  },
  /**
   * Find a path in the Kanopi Pack package
   * 
   * @param {stfing} pathFragment 
   * @returns {string}
   */
  toKanopiPack: (pathFragment) => {
    return path.resolve(kanopiPackPackageRoot, pathFragment);
  }
};
