const chalk = require('chalk');
const webpack = require('webpack');

/**
 * Start the watch process for Webpack
 */
module.exports = function watchWebpack(config, watchOptions) {
  try {
    const { poll = 1000, aggregateTimeout = 600 } = watchOptions;
    const compiler = webpack(config);
    console.log(chalk.yellow('Start watch process...'));
    console.log('');

    const watching = compiler.watch({ poll: poll, aggregateTimeout: aggregateTimeout }, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(stats.toString({
        colors: true
      }));
    });

    process.on('SIGINT', () => {
      watching.close(() => {
        console.log('Watching stopped.');
        process.exit(0);
      });
    });
  }
  catch (error) {
    console.error(chalk.red('Build failed...'))
    console.error(error);
  }
}
