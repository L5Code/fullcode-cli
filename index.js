#!/usr/bin/env Node
const program = require('commander')

program.version(require('./package.json').version);

program.option('-w -why', 'a why cli');
program.option('-d --dest <dest>', 'a destination folder')

program.parse(process.argv);

console.log(program.dest, program._optionValues.dest)