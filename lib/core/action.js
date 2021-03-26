const { promisify } = require('util');
const path = require('path');

const download = promisify(require('download-git-repo'));
const open = require('open');

const { koaRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, write2File } = require('../utils/utils');

const createProjectAction = async (project) => {
	console.log('感谢你使用wecode，wecode正在帮你创建项目，请稍后……');
	// 1.clone项目
	await download(koaRepo, project, { clone: true }).then(() => { console.log('项目创建完成，正在安装依赖……'); }).catch(err => { console.log(err); });
	// 2.执行npm install
	const npm_cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
	await commandSpawn(npm_cmd, ['install'], { cwd: `./${project}` });
	// 3.npm run dev
	commandSpawn(npm_cmd, ['run', 'dev'], { cwd: `./${project}` });
	// 4.打开浏览器
	open("http://localhost:3000/");
};

const addRouterAction = async (name, dest) => {
	// 1. 有对应的ejs模块
	const result = await compile('router.ejs', { name, lowerName: name.toLowerCase() });
	// 2. 将result 写入到.js文件中
	const targetPath = path.resolve(dest, `${name}.js`);
	write2File(targetPath, result);

};

// TODO: inquirer

module.exports = {
	createProjectAction,
	addRouterAction
};