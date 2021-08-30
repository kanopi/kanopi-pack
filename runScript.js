const pkgDir = require('pkg-dir')
const chalk = require('chalk')
const execa = require('execa')

module.exports = async function runScript (task, additonalArgs) {
  const projectRoot = await pkgDir(process.cwd());
  const runner = 'node webpack';
  const args = [...additonalArgs].join(' ')

  const command = chalk.dim(`${runner} ${args}`)
  console.log(`Running ${command}`)

  try {    
    return await execa.sync('node -v');
    //return await execa(runner, args, { cwd: projectRoot, stdio: 'inherit' })
  }
  catch (error) {
    console.log(error);
  }
}