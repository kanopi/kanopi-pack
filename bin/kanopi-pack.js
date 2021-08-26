#!/usr/bin/env node

const program = require('commander');

program
  .version('1.0.0')
  .option('-m, --mode', 'Webpack Mode')
  .parse(process.argv);

program
  .command('production')
  .description('Runs Webpack for production builds.')
  .allowUnknownOption()
  .action(() => {
    require('../runScript')('production', process.argv.slice(3))
  });

program
  .command('development')
  .description('Runs Webpack Dev Server for local development.')
  .allowUnknownOption()
  .action(() => {
    require('../runScript')('development', process.argv.slice(3))
  })

  program.parse(process.argv);