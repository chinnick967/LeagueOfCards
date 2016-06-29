const mysql = require ('mysql2/promise');
const config = require('../../config.json');

module.exports = function () {
	return mysql.createConnection ({
		host: config.host,
		user: config.user.name,
		password: config.user.password,
		database: config.database,
		port: config.port
	}).then(function (connection) {
		console.log('Connected to database.');
		return connection;
	}, function (err) {
		console.error('Failed to connect to database', err);
		return Promise.reject(err);
	});
};