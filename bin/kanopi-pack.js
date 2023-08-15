#!/usr/bin/env node

const chalk = require('chalk');
const package = require('../index');
const {
  commands: { standard: program },
  configuration: { development, production },
  runners: { runDevServer, runWebpack }
} = package;

program
  .command('check-configuration')
  .description('Output the Webpack configuration for the specified environment.')
  .argument('[environment]', 'Choose production (default) or development')
  .action((environment) => {
    const isDevelopment = 'development' === environment;

    console.log(chalk.greenBright('Package:\tKanopi Pack Standard'))
    console.log(chalk.yellow('Environment:\t' + (isDevelopment ? 'Development' : 'Production')));
    console.log(chalk.yellow('Current configuration:'));
    console.log('');

    isDevelopment
      ? console.log(development)
      : console.log(production);
  });

program
  .command('standard')
  .description('Run Webpack builds, set environment to development for HMR')
  .argument('[environment]', 'Choose production (default) or development')
  .action((environment) => {
    const isDevelopment = 'development' === environment;

    console.log(chalk.greenBright('Package:\tKanopi Pack Standard'))
    console.log(chalk.yellow('Environment:\t' + (isDevelopment ? 'Development' : 'Production')));
    console.log('');

    isDevelopment
      ? runDevServer(development)
      : runWebpack(production);
  });

program.parse(process.argv);
