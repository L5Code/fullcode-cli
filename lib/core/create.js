const program = require('commander');

const {createInteractive} = require('./interactive');
const {
	createProjectAction,
	addKoaRouterAction,
	addVueCpnAction,
	addVuePageAndRouter,
	addStoreAction
} = require('./action');
const {lastDir} = require('../utils/utils')

const createCommands = () => {
	program
		.command('create')
		.description('create a new project into a folder')
		.action(async () => {
			const res = await createInteractive(lastDir());
			await createProjectAction(res);
		});

	program
		.command('add-koa-router <router>')
		.description('add router into your project, eq: fullcode add-koa-router orders [-d routes/]')
		.action(async (router) => {
			await addKoaRouterAction(router, program._optionValues.dest || 'routes/');
		});

	program
		.command('add-vue-cpn <cpn>')
		.description('add vue component, eq: fullcode add-vue-cpn HelloWorld [-d src/components]')
		.action(async (cpn) => {
			await addVueCpnAction(cpn, program._optionValues.dest || process.cwd());
		})

	program
		.command('add-vue-page <page>')
		.description('add vue page and router config, eq: fullcode add-vue-page Home [-d src/pages]')
		.action(async (page) => {
			await addVuePageAndRouter(page, program._optionValues.dest || process.cwd());
		})

	program
		.command('add-vue-store <store>')
		.description('add vue page and router config, eq: fullcode add-vue-page Home [-d src/pages]')
		.action(async (store) => {
			await addStoreAction(store, program._optionValues.dest || process.cwd());
		})
};

module.exports = createCommands;
