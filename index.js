const runDevServer = require('./runDevServer');
const runWebpack = require('./runWebpack');

module.exports = {
    command: require('./commands/index'),
    runners: {
        development: runDevServer,
        production: runWebpack
    }
};