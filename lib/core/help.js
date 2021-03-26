const program = require('commander');

const helpOptions = () => {
	program.option('-w, -why', 'a why cli');
	program.option('-d, --dest <dest>', 'a destination folder');
};

module.exports = helpOptions;