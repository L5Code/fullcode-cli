/**
 * 执行终端命令的相关代码
 */

const { spawn, exec } = require('child_process');
const commandSpawn = (...args) => {
	return new Promise((resolve) => {
		const childProcess = spawn(...args);
		childProcess.stdout.pipe(process.stdout);
		childProcess.stderr.pipe(process.stderr);

		childProcess.on('close', (status) => {
			console.log(`状态码:${status}`);
			resolve();
		});
	});
};

const commandExec = (cmd) => {
	return new Promise((resolve) => {
		const childProcess = exec(cmd);
		childProcess.stdout.pipe(process.stdout);
		childProcess.stderr.pipe(process.stderr);

		childProcess.on('close', (status) => {
			console.log(`状态码:${status}`);
			resolve();
		});
	});
};

module.exports = { commandSpawn, commandExec };