/**
 * 
 * @param {PackConfiguration} configuration  
 * @returns {array}
 */
module.exports = (configuration = {}) => {
  const {
    assets = {}
  } = configuration;
  const {
    inline = [],
    resources = []
  } = assets;
  const rules = [];

  if (Array.isArray(inline) && 0 < inline.length) {
    rules.push({
      test: new RegExp('\.(' + inline.join('|') + ')$', 'i'),
      type: 'asset/inline'
    });
  }

  if (Array.isArray(resources) && 0 < resources.length) {
    rules.push({
      test: new RegExp('\.(' + resources.join('|') + ')$', 'i'),
      type: 'asset/resource'
    });
  }

  return rules;
}
