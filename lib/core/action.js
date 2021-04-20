const {promisify} = require('util');
const path = require('path');

const download = promisify(require('download-git-repo'));
const open = require('open');

const {koaRepo, vueRepo} = require('../config/repo-config');
const {commandSpawn} = require('../utils/terminal');
const {compile, write2File, createDirSync} = require('../utils/utils');
const log = require('../utils/log');

const npm_cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const createRepo = async (Repo, project, runCmd, port) => {
	// 1.clone项目
	await download(Repo, project, {clone: true}).then(() => {
		log.hint('项目创建完成，正在安装依赖……');
	}).catch(err => {
		log.error('项目下载出错，请查看错误信息');
		console.error(err)
	});
	// 2.执行npm install
	await commandSpawn(npm_cmd, ['install'], {cwd: `./${project}`});
	// 3.npm run dev
	await commandSpawn(npm_cmd, runCmd, {cwd: `./${project}`});
	// 4.打开浏览器
	open(`http://localhost:${port}/`);
}

const ejs2File = async (name, dest, template, filename) => {
	const templatePath = path.resolve(__dirname, template);
	// 1. 有对应的ejs模块
	const result = await compile(templatePath, {name, lowerName: name.toLowerCase()});
	// 2. 将result 写入到.js文件中
	// 判断文件是否存在，不存在则创建
	createDirSync(dest)
	const targetPath = path.resolve(dest, filename);
	// 将result结果写入指定地址文件
	write2File(targetPath, result);
}

const createProjectAction = async (res) => {
	log.hint(`感谢你使用${require('../../package.json').name}，正在帮你创建项目，请稍后……`);
	if (res.frames === 'koa') await createRepo(koaRepo, res.project, ['run', 'dev'], '3000')
	if (res.frames === 'vue') await createRepo(vueRepo, res.project, ['run', 'serve'], '8080')
};

const addTemplateAction = async (res) => {
	log.hint(`感谢你使用${require('../../package.json').name}，正在帮你为您在 ${res.dest} 目录中创建 ${res.frames} ${res.template}，请稍后……`);
	if (res.frames === 'koa') {
		if (res.template === 'router') await addKoaRouterAction(res.name, res.dest)
	} else if (res.frames === 'vue') {
		if (res.template === 'component') await addVueCpnAction(res.name, res.dest)
		else if (res.template === 'page') await addVuePageAndRouter(res.name, `${res.dest}${res.name.toLowerCase()}`)
		else if (res.template === 'store') await addStoreAction(res.name, `${res.dest}${res.name.toLowerCase()}`)
	}
	log.hint(` ${res.frames} ${res.template} 创建完成，请注意相应目录结构的文件变化`);
}

const addKoaRouterAction = async (name, dest) => {
	await ejs2File(name, dest, `../templates/koa-router.js.ejs`, `${name}.js`)
};

const addVueCpnAction = async (name, dest) => {
	await ejs2File(name, dest, `../templates/component.vue.ejs`, `${name}.vue`)
}

const addVuePageAndRouter = async (name, dest) => {
	await addVueCpnAction(name, dest)
	await ejs2File(name, dest, `../templates/vue-router.js.ejs`, 'router.js')
}

const addStoreAction = async (name, dest) => {
	await ejs2File(name, dest, `../templates/vue-store.js.ejs`, 'index.js')
	await ejs2File(name, dest, `../templates/vue-types.js.ejs`, 'types.js')

}


module.exports = {
	createProjectAction,
	addTemplateAction,
	addKoaRouterAction,
	addVueCpnAction,
	addVuePageAndRouter,
	addStoreAction
};
