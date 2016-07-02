const uuid = require('node-uuid');

module.exports = function Game (player1) {
	this.id = uuid.v4();
	this.players = [player1];
	this.socket = player1.socket;
	this.creationDate = Date.now();
	this.status = 'waiting';
};

Game.prototype.join = function () {};
Game.prototype.kill = function () {};
Game.prototype.isOpen = function () {};



function gameFound (socket) {
	socket.broadcast.emit('game:found');
	socket.emit('game:found');
}

function loadingGameInfo () {
	socket.broadcast.emit('game:loading:info');
	socket.emit('game:loading:info');
}

function sendPlayerInfo (socket, player) {

}
