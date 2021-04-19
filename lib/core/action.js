const {promisify} = require('util');
const path = require('path');

const download = promisify(require('download-git-repo'));
const open = require('open');

const {koaRepo, vueRepo} = require('../config/repo-config');
const {commandSpawn} = require('../utils/terminal');
const {compile, write2File, createDirSync} = require('../utils/utils');

const npm_cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const createKoaRepo = async () => {
	// 1.clone项目
	await download(koaRepo, res.project, {clone: true}).then(() => {
		console.log('项目创建完成，正在安装依赖……');
	}).catch(err => {
		console.log(err);
	});
	// 2.执行npm install
	await commandSpawn(npm_cmd, ['install'], {cwd: `./${res.project}`});
	// 3.npm run dev
	await commandSpawn(npm_cmd, ['run', 'dev'], {cwd: `./${res.project}`});
	// 4.打开浏览器
	open("http://localhost:3000/");
}

const createVueRepo = async () => {
	// 1.clone项目
	await download(vueRepo, res.project, {clone: true}).then(() => {
		console.log('项目创建完成，正在安装依赖……');
	}).catch(err => {
		console.log(err);
	});
	// 2.执行npm install
	await commandSpawn(npm_cmd, ['install'], {cwd: `./${res.project}`});
	// 3.npm run dev
	await commandSpawn(npm_cmd, ['run', 'serve'], {cwd: `./${res.project}`});
	// 4.打开浏览器
	open("http://localhost:8080/");
}

const createProjectAction = async (res) => {
	console.log(`感谢你使用${require('../../package.json').name}，正在帮你创建项目，请稍后……`);
	if (res.frames === 'koa') await createKoaRepo()
	if (res.frames === 'vue') await createVueRepo()
};

const addKoaRouterAction = async (name, dest) => {
	// 1. 有对应的ejs模块
	const result = await compile('koa-router.js.ejs', {name, lowerName: name.toLowerCase()});
	// 2. 将result 写入到.js文件中
	const targetPath = path.resolve(dest, `${name}.js`);
	write2File(targetPath, result);
};

const addVueCpnAction = async (name, dest) => {
	// 1. 有对应的ejs模块
	const result = await compile('component.vue.ejs', {name, lowerName: name.toLowerCase()});
	// 2. 将result 写入到.js文件中
	const targetPath = path.resolve(dest, `${name}.vue`);
	write2File(targetPath, result);
}

const addVuePageAndRouter = async (name, dest) => {
	const data = {name, lowerName: name.toLowerCase()}
	// 1. 有对应的ejs模块
	const pageResult = await compile('component.vue.ejs', data);
	const routerResult = await compile('vue-router.js.ejs', data);
	// 2. 将result 写入到.js文件中
	const targetDest = path.resolve(dest, name.toLowerCase())
	if (createDirSync(targetDest)) {
		const targetPagePath = path.resolve(targetDest, `${name}.vue`);
		const targetRouterPath = path.resolve(targetDest, `router.js`);
		write2File(targetPagePath, pageResult);
		write2File(targetRouterPath, routerResult);
	}
}

const addStoreAction = async (name, dest) => {
	const storeResult = await compile('vue-store.js.ejs', {})
	const typesResult = await compile('vue-types.js.ejs', {})

	const targetDest = path.resolve(dest, name.toLowerCase())
	if (createDirSync(targetDest)) {
		const targetStorePath = path.resolve(targetDest, `${name}.js`)
		const targetTypesPath = path.resolve(targetDest, 'types.js')
		write2File(targetStorePath, storeResult);
		write2File(targetTypesPath, typesResult);
	}
}


module.exports = {
	createProjectAction,
	addKoaRouterAction,
	addVueCpnAction,
	addVuePageAndRouter,
	addStoreAction
};
