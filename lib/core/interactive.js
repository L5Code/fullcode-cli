const inquirer = require('inquirer');

const createInteractive = async (project) => {
	const interactive = [{
		type: 'input',
		message: '新项目名称:',
		name: 'project',
		default: project,
		validate: function (val) {
			const reg = /^[_a-zA-Z]+[_a-zA-Z0-9]*$/;
			if (reg.test(val)) { // 只能是数字、字母、下划线组成
				return true;
			}
			return "请输入符合规范的项目名称(只能是数字、字母、下划线组成)";
		}
	}, {
		type: 'list',
		message: '请选择一个框架:',
		name: 'frame',
		choices: [
			"Koa",
			"Express",
			"VuePress"
		],
		filter: function (val) { // 使用filter将回答变为小写
			return val.toLowerCase();
		}
	}];
	return await inquirer.prompt(interactive);
};

module.exports = {
	createInteractive
};