#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');

program
  .version(`kanopi-pack ${package.version}`)
  .usage('<command> [options]');

program
  .command('production')
  .description('Runs Webpack for production builds.')
  .allowUnknownOption()
  .action(() => {
    let arguments = ['--mode',,...process.argv.slice(2)]
    require('../runScript')('production', arguments)
  });

program
  .command('development')
  .description('Runs Webpack Dev Server for local development.')
  .allowUnknownOption()
  .action(() => {
    require('../runDevServer')('development', process.argv.slice(3))
  })

  program.parse(process.argv);