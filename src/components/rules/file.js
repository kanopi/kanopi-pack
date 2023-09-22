/**
 * 
 * @param {{ assets: AssetFileTypes}} environment 
 * @returns {array}
 */
module.exports = ({ assets } = {}) => {
  const {
    inline = [],
    resources = []
  } = assets;

  const rules = [];

  if (Array.isArray(inline) && 0 < inline.length) {
    rules.push({
      test: '/\.(' + inline.join('|') + ')$/i',
      type: 'asset/inline'
    });
  }

  if (Array.isArray(resources) && 0 < resources.length) {
    rules.push({
      test: '/\.(' + resources.join('|') + ')$/i',
      type: 'asset/resource'
    });
  }

  return rules;
}
