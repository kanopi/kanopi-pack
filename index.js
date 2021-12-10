const glob = require('glob');
const configurationDirectory = __dirname + '/configuration/';
const packageTree = require('./package-builder');

packageTree['configuration'] = {};

glob.sync(
    '*.js', 
    {
        'cwd': configurationDirectory
    }
).forEach(function(file) {
    let packageName = file.slice(0, -3);
    packageTree['configuration'][packageName] = require(configurationDirectory + file);
});

module.exports = packageTree;