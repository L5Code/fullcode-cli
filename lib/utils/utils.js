const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const compile = (templatePath, data = {}, opts = {}) => {
	return new Promise((resolve, reject) => {
		ejs.renderFile(templatePath, {data}, opts, (err, res) => {
			if (err) {
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

const lastDir = () => {
	const arr_cwd = process.cwd().split(path.sep)
	return arr_cwd[arr_cwd.length - 1]
}

const createDirSync = pathName => {
	if (fs.existsSync(pathName)) {
		return true
	} else {
		if (createDirSync(path.dirname(pathName))) {
			fs.mkdirSync(pathName)
			return true
		}
	}
}

module.exports = {compile, write2File, lastDir, createDirSync};
