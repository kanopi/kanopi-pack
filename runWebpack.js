const chalk = require('chalk');
const webpack = require('webpack');

module.exports = function runWebpack (config) {
  const compiler = webpack(config);
  try {
    console.log(chalk.yellow('Beginning build process...'));
    console.log('');
    compiler.run((errors, statistics) => {
      if (errors) {
        throw errors;
      }

      console.log(chalk.green('Asset Listing:'));
      for (let asset in statistics.compilation.assets) {
        console.log('\t' + asset);
      }
      console.log('');
      console.log(chalk.green('Finished building assets'));
    });
  }
  catch (error) {
    console.error(chalk.red('Build failed...'))
    console.error(error);
  }
}