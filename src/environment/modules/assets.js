/**
 * @typedef {AssetConfiguration}
 * @property {string|string[]|undefined} inlineFileTypes - (Optional) File Types to write inline: an array or comma-delimited string of extensions
 * @property {string|string[]|undefined} resourceFileTypes - (Optional) File Types to include in the bundle: an array or comma-delimited string of extensions
 */

/**
 * @typedef {AssetFileTypes}
 * @property {string[]} inline - File Types to write inline: an array of extensions
 * @property {string[]} resource - File Types to include in the bundle: an array of extensions
 */

const defaultResources = ['png', 'svg', 'jpg', 'jpeg', 'gif', 'woff', 'woff2', 'eot', 'ttf', 'otf'];

module.exports = {
  /**
   * Read the asset configuration into a filtered set of Asset File Types
   *  - Default Resources: 'png', 'svg', 'jpg', 'jpeg', 'gif', 'woff', 'woff2', 'eot', 'ttf', 'otf'
   *  - Default Inline: N/A 
   *  - When you specify Inline extensions, this component ensures they are not in the set of Resource extensions
   * 
   * @param {AssetConfiguration|null} configuration - (Optional) Incoming configuration
   * 
   * @returns {AssetFileTypes} 
   */
  readAssetFileTypes: ({ inlineFileTypes = [], resourceFileTypes = defaultResources } = {}) => {
    let inline = 'string' === typeof inlineFileTypes
      ? inlineFileTypes.split(',')
      : (Array.isArray(inlineFileTypes) ? inlineFileTypes : []);
    let allResources = 'string' === typeof resourceFileTypes
      ? resourceFileTypes.split(',')
      : (Array.isArray(resourceFileTypes) ? resourceFileTypes : []);
    let resources = allResources.filter((resource) => false === inline.contains(resource));

    return {
      inline,
      resources
    };
  }
};
