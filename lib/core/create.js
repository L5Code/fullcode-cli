const program = require('commander');

const { createProjectAction, addRouterAction } = require('./action');
const createCommands = () => {
	program
		.command('create <project> [others...]')
		.description('clone a repository into a folder')
		.action((project, others) => {
			createProjectAction(project);
		});

	program
		.command('addrouter <name>')
		.description('add router into your project, eq: wecode addrouter orders')
		.action((name) => {
			addRouterAction(name, program._optionValues.dest || 'routes/');
		});
};

module.exports = createCommands;