const { Command } = require('commander');
const package = require('../../package.json');
const program = new Command();

program
  .version(`kanopi-pack ${package.version}`);
  
module.exports = program;