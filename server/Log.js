'use strict';
var errorSocket;
module.exports = {
	create: create,
	logErrorException: error,
	log: log
};

function create (io) {
	errorSocket = io.of('/errors');
	errorSocket.on('connection', function (socket) {

		socket.on('fire-error', function () {
			console.log('\n\n\nError fired\n\n\n');
			foo()
				.catch(error);
		});
	})
}

function error (err) {
	if(errorSocket) {
		errorSocket.emit('errors', {
			message: err.message,
			stack: err.stack
		});
		
		return Promise.reject(err);
	}
}

function log () {

}
