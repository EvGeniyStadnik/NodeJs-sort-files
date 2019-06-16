const program = require('commander');

module.exports = program
  .version('0.1.0')
  .option('-f --folder [type]', 'Source folder [./img]', './img')
  .option('-o, --output [type]', 'Output folder [./dist]', './dist')
  .option('-d, --delete', 'Delete source folder')
  .parse(process.argv)
