const program = require('commander');

const { createInteractive } = require('./interactive');

const { createProjectAction, addRouterAction } = require('./action');
const createCommands = () => {

	program
		.command('create [project] [frame]')
		.description('create a new project into a folder')
		.action(async (project, frame) => {
			if (!project || !frame) {
				// 创建用户交互
				const res = await createInteractive(project);
				if (res.frame === 'koa') createProjectAction(res.project);
			} else {
				if (frame === 'koa') createProjectAction(project);
			}



		});
	// program
	// 	.command('create <name> <project>  [others...]')
	// 	.description('clone a repository into a folder')
	// 	.action((name, project, others) => {
	// 		if (name === 'koa') {
	// 			createProjectAction(project);
	// 		}
	// 	});

	program
		.command('add router <name>')
		.description('add router into your project, eq: wecode addrouter orders')
		.action((name) => {
			addRouterAction(name, program._optionValues.dest || 'routes/');
		});
};

module.exports = createCommands;