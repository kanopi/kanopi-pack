#!/usr/bin/env node

const program = require('../commands/index');

program
    .command('production')
    .description('Runs Webpack for production builds.')
    .allowUnknownOption()
    .action(() => {
        let arguments = ['--mode', , ...process.argv.slice(2)]
        require('../runScript')('production', arguments)
    });

program
    .command('development')
    .description('Runs Webpack Dev Server for local development.')
    .allowUnknownOption()
    .action(() => {
        require('../runDevServer')('development', process.argv.slice(3))
    });

program.parse(process.argv);
