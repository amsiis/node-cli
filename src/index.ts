#!/usr/bin/env node

import 'reflect-metadata'
import Init from './Init'
import chalk from 'chalk'
import boxen from 'boxen'
// import yargs from 'yargs'

// const options = yargs
// .usage('Usage: -n <name>')
// .option('n', { alias: 'name', describe: 'Your name', type: 'string', demandOption: true })
// .argv

// const greeting = chalk.white.bold(`hello ${options['name']}`)
const greeting = chalk.white.bold('Welcome to BPLATE CLI')

const boxenOptions: boxen.Options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
}
const msgBox = boxen(greeting, boxenOptions)

console.log(msgBox)

new Init()
