const program = require('commander');

const helpOptions = () => {
	program.option('-d, --dest <dest>', 'a destination folder');
};

module.exports = helpOptions;