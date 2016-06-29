const express = require('express');
const http = require('http');
const path = require('path');
const init = require('./server/init');
const PORT = 8080;
var app = express();

app.use(express.static('src'));

var server = http
	.createServer(app)
	.listen(PORT);


init(server);
