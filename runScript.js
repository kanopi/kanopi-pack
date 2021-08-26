const pkgDir = require('pkg-dir')
const chalk = require('chalk')
const execa = require('execa')

module.exports = async function runScript (task, additonalArgs) {
  const projectRoot = await pkgDir(process.cwd());
  const runner = 'npm run';
  const args = [task, ...additonalArgs]

  const command = chalk.dim(`${runner} ${args.join(' ')}`)
  console.log(`Running ${command}`)

  return await execa(runner, args, { cwd: projectRoot, stdio: 'inherit' })
}