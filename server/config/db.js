const mysql = require ('mysql2/promise');
const config = require('../../config.json');
const chalk = require('chalk');
module.exports = function () {
	return mysql.createConnection ({
		host: config.host,
		user: config.user.name,
		password: config.user.password,
		database: config.database,
		port: config.port
	}).then(function (connection) {
		console.log(chalk.green(
			'Connected to database.'
		));
		return connection;
	}, function (err) {
		console.log(chalk.red([
			'Failed to connect to database.',
			'------------------------------',
			err,
			JSON.stringify(err, null, 2)
		].join('\n')));
		process.exit(1);
		return Promise.reject(err);
	});
};