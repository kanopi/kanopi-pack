/**
 * 
 * @param {PackConfiguration} configuration  
 * @returns {array}
 */
module.exports = (configuration = {}) => {
  const svgToMiniDataURI = require('mini-svg-data-uri');
  const {
    assets = {}
  } = configuration;
  const {
    inline = [],
    resources = []
  } = assets;
  const rules = [];

  const useSvg = Array.isArray(inline) && -1 < inline.indexOf('svg');
  const otherInline = Array.isArray(inline) ? inline.filter((item) => 'svg' !== item) : [];

  if (useSvg) {
    rules.push({
      test: new RegExp('\.svg$', 'i'),
      type: 'asset/inline',
      generator: {
        dataUrl: (content) => svgToMiniDataURI(content.toString())
      }
    });
  }

  if (Array.isArray(otherInline) && 0 < otherInline.length) {
    rules.push({
      test: new RegExp('\.(' + otherInline.join('|') + ')$', 'i'),
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
