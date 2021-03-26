const { promisify } = require('util');

const download = promisify(require('download-git-repo'));

const { koaRepo } = require('../config/repo-config');

const createProjectAction = async (project) => {
	// 1.clone项目
	await download(koaRepo, project, { clone: true });
	// 2.执行npm install
	// 3.npm run serve
	// 4.打开浏览器
};

module.exports = {
	createProjectAction
};