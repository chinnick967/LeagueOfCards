const express = require('express');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const init = require('./server/init');

const PORT = 8081;

var app = express();

app.use(express.static('src'));

var server = http
	.createServer(app)
	.listen(PORT);


init(server);


console.log(chalk.green([
	'Server Started On:',
	'http://localhost:' + PORT + '/',
	''
].join('\n')));
