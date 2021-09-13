#!/usr/bin/env node

const chalk = require('chalk');
const program = require('../commands/index');

program
    .command('standard')
    .description('Run Webpack builds, set environment to develoment for HMR')
    .argument('[environment]', 'Choose production (default) or development')
    .action((environment) => {
        const isDevelopment = 'development' === environment;

        console.log(chalk.greenBright('Package:\tKanopi Pack Standard'))
        console.log(chalk.yellow('Environment:\t' + (isDevelopment ? 'Development' : 'Production')));
        console.log('');

        isDevelopment 
            ? require('../runDevServer')(require('../configuration/webpack.development'))
            : require('../runWebpack')(require('../configuration/webpack.production'));
    });

program.parse(process.argv);
