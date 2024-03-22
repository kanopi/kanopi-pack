#!/usr/bin/env node

const chalk = require('chalk');
const kanopiPack = require('../index');
const utility = require('util');
const {
  commands: { standard: program },
  configuration: { development, production, watch },
  environment: { standard: { watchOptions } },
  runners: { runDevServer, runWebpack, watchWebpack }
} = kanopiPack;

const PACKAGE_MODES = {
  'development': { name: 'Development', runner: () => runDevServer(development) },
  'production': { name: 'Production', runner: () => runWebpack(production) },
  'watch': { name: 'Watch', runner: () => watchWebpack(watch, watchOptions) }
};

program
  .command('check-configuration')
  .description('Output the Webpack configuration for the specified environment.')
  .argument('[depth]', 'Number of levels deep (default 6) to show the configuration')
  .argument('[environment]', 'Choose production (default) or development')
  .argument('[color]', 'Whether to show the output in color (default false)')
  .action((depth = 6, environment = 'production', color = false) => {
    const isDevelopment = 'development' === environment;

    console.log(chalk.greenBright('Package:\tKanopi Pack Standard'))
    console.log(chalk.yellow('Environment:\t' + (isDevelopment ? 'Development' : 'Production')));
    console.log('');
    console.log(chalk.yellow('Current configuration:'));
    console.log('');
    console.log(utility.inspect(isDevelopment ? development : production, { depth: depth, colors: color }));
  });

program
  .command('standard')
  .description('Run Webpack builds, set environment to development for HMR, or watch for rebuilds without HMR.')
  .argument('[environment]', 'Choose production (default), watch or development')
  .action((environment = 'production') => {
    const selectedMode = PACKAGE_MODES[environment] ?? PACKAGE_MODES['production'];
    const { configuration, name, runner } = selectedMode;

    console.log(chalk.greenBright('Package:\tKanopi Pack Standard'))
    console.log(chalk.yellow('Environment:\t' + name));
    console.log('');
    runner(configuration);
  });

program.parse(process.argv);
