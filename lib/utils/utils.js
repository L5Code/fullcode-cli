const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const compile = (template, data) => {
	const templatePath = path.resolve(__dirname, `../templates/${template}`);
	return new Promise((resolve, reject) => {
		ejs.renderFile(templatePath, { data }, {}, (err, res) => {
			if (err) {
				console.log(err);
				reject(err);
				return;
			}
			resolve(res);
		});
	});

};

const write2File = (path, content) => {
	return fs.promises.writeFile(path, content);
};

module.exports = { compile, write2File };