const program = require('commander');

const helpOptions = () => {
  program.option('-d, --dest <dest>', 'Set the project directory');
};

program.on('--help', function () {
  console.log("")
  console.log("Others:")
  console.log("  others options~")
})
module.exports = helpOptions;
