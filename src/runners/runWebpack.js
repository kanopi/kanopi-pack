import chalk from 'chalk';
const webpack = require('webpack');

module.exports = function runWebpack(config) {
  try {
    const compiler = webpack(config);

    console.log(chalk.yellow('Beginning build process...'));
    console.log('');

    compiler.run((errors, statistics) => {
      const { compilation: { errors: statisticsErrors = [] } } = statistics;
      if (errors) {
        console.log(chalk.red('Found generic configuration errors:'));
        throw errors;
      }

      if (Array.isArray(statisticsErrors) && 0 < statisticsErrors.length) {
        console.log(chalk.red('Encountered the following bundle compilation errors:'));
        throw new Error(statisticsErrors);
      }

      console.log(chalk.green('Build success - asset listing:'));
      for (let asset in statistics.compilation.assets) {
        console.log('\t' + asset);
      }

      console.log('');
    });
  }
  catch (error) {
    console.error(chalk.red('Build failed...'))
    console.error(error);
  }
}
