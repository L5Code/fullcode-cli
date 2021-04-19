const inquirer = require('inquirer');

const createInteractive = async (project) => {
	const interactive = [{
    type: 'input',
    message: 'new project name:',
    name: 'project',
    default: project,
    validate: function (val) {
      const reg = /^[_a-zA-Z]+[_a-zA-Z0-9]*$/;
      if (reg.test(val)) { // 只能是数字、字母、下划线组成
        return true;
      }
      return "Please enter a project name that meets the specifications (only number, letter, or underscore)";
    }
  }, {
    type: 'list',
    message: 'Please choose a frame:',
    name: 'frames',
    choices: [
      "Koa",
      "Vue"
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
