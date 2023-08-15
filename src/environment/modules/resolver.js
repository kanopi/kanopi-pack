/**
 * @typedef {Object} PathResolver
 * @property {Function} toCallingPackage - Find a package from the modules directory
 * @property {Function} toCallingPackage - Find the current path to a file in the source/calling project for the process
 * @property {Function} toKanopiPack - Find a path in the Kanopi Pack package
 */

const path = require('path');
const calling_project_root = process.cwd();
const kanopi_pack_root = path.resolve(__dirname, '..', '..');

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
    return require(pathResolver.toCallingPackage('node_modules/' + packageName));
  },
  /**
   * Find the current path to a file in the source/calling project for the process
   * 
   * @param {string} pathFragment 
   * @returns {string}
   */
  toCallingPackage: (pathFragment) => {
    return path.resolve(calling_project_root, pathFragment);
  },
  /**
   * Find a path in the Kanopi Pack package
   * 
   * @param {stfing} pathFragment 
   * @returns {string}
   */
  toKanopiPack: (pathFragment) => {
    return path.resolve(kanopi_pack_root, pathFragment);
  }
};
