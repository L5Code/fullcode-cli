const program = require('commander');

const {createInteractive, addInteractive} = require('./interactive');
const {defaultFolder} = require('../config');
const {
	createProjectAction,
	addTemplateAction,
	addKoaRouterAction,
	addVueCpnAction,
	addVuePageAndRouter,
	addStoreAction
} = require('./action');
const {lastDir} = require('../utils/utils')

const createCommands = () => {
	// 指令集
	program
		.command('create')
		.description('create a new project into a folder')
		.action(async () => {
			const res = await createInteractive(lastDir());
			await createProjectAction(res);
		});

	program
		.command('add')
		.description('add a new template into your project')
		.action(async () => {
			const res = await addInteractive();
			await addTemplateAction(res);
		});

	program
		.command('add-koa-router <name>')
		.description('add router into your project, e.g. fullcode add-koa-router orders [-d routes]')
		.action(async (name) => {
			await addKoaRouterAction(name, program._optionValues.dest || defaultFolder.koa.router);
		});

	program
		.command('add-vue-cpn <name>')
		.description('add vue component, e.g. fullcode add-vue-cpn HelloWorld [-d src/components]')
		.action(async (name) => {
			await addVueCpnAction(name, program._optionValues.dest || defaultFolder.vue.component);
		})

	program
		.command('add-vue-page <name>')
		.description('add vue page and router config, e.g. fullcode add-vue-page Home [-d src/pages]')
		.action(async (name) => {
			await addVuePageAndRouter(name, program._optionValues.dest || `${defaultFolder.vue.page}${name.toLowerCase()}`);
		})

	program
		.command('add-vue-store <name>')
		.description('add vue store, e.g. fullcode add-vue-store Home [-d src/store/modules]')
		.action(async (name) => {
			await addStoreAction(name, program._optionValues.dest || `${defaultFolder.vue.store}${name.toLowerCase()}`);
		})
};

module.exports = createCommands;
