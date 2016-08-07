'use strict';
const uuid = require('node-uuid');
const GameList = require('./GameList');
const Utils = require('./Utils');
const Turn = require('./Turn');
const EventEmitter = require('./EventEmitter');
const Log = require('../Log');



module.exports = Game;

function Game (players) {
	EventEmitter.call(this);
	var player1 = players[0];
	var player2 = players[1];

	this.type = C.GAME_TYPE;
	this.uuid = uuid.v4();
	this.status = C.GAME_IDLE;
	this.players = {};
	this.player1 = player1.uuid;
	this.player2 = player2.uuid;
	this.players[this.player1] = player1;
	this.players[this.player2] = player2;
	this.startTime = null;

	this.stats = {
		startTime: null,
		endTime: null,
		duration: null,
		winner: null,
		loser: null
	};

	player1.setGame(this);
	player2.setGame(this);
	this.turn = new Turn(player1, player2);
	
	this.turn.on('change', (data) => {
		if(data.type !== C.TURN_TYPE_MULLIGAN) {
			IO.to(this.uuid).emit('game:turnTimer:change', data);
		} else {
			var player1 = this.players[this.player1];
			var player2 = this.players[this.player2];
			player1.socket.emit('game:found', generateGameFoundResponse(true, player1, this));
			player2.socket.emit('game:found', generateGameFoundResponse(false, player2, this));
		}
	});

	players[0].socket.join(this.uuid);
	players[1].socket.join(this.uuid);
}

Object.assign(Game.prototype, EventEmitter.prototype, {
	start: start,
	endGame: endGame,
	endTurn: endTurn,
	clearGame: clearGame,
	getPlayerIds: getPlayerIds,
	getPlayers: getPlayers,
	getOpponent: getOpponent,
	updateTurn: updateTurn,
	getPlayerNumber: getPlayerNumber
});

function start () {
	return new Promise((resolve) => {
		this.turn.start ();
		this.stats.startTime = Date.now();
		resolve();
	})
		.catch(Log.logErrorException);
}

function endGame (type, playerId, status) {
	return new Promise((resolve, reject) => {
		// Check if game has already ended
		if(this.status !== C.GAME_END) {
			var opponent = this.getOpponent(playerId);
			var opponentId = (opponent && opponent.uuid) || null;

			this.status = C.GAME_END;
			console.log ('Game Status', this.status);

			var endTime = Date.now();
			this.stats.endTime = endTime;
			this.stats.duration = endTime - this.stats.startTime;
			this.stats.winner = status === C.GAME_VICTORY ? playerId: opponentId;
			this.stats.loser = status === C.GAME_DEFEAT ? playerId: opponentId;

			this.emit('end', {
				type: this.type,
				stats: Object.assign({}, this.stats)
			});

			// TODO: Declare Winner
			// TODO: Clear Game
			// TODO: Remove Players from Game

			this.clearGame ().then(resolve, reject);
		} else {
			// Resolve if endGame was already invoked.
			resolve();
		}
	})
		.catch(Log.logErrorException);
}

function endTurn (playerId) {
	try {
		this.turn.endTurn(playerId);
	} catch (err) {
		console.log(err);
	}
}

function clearGame () {
	return new Promise((resolve, reject) => {
		// TODO: Clear Timers
		Promise.all([
			// Remove From game list.
			GameList.remove(this),
			// Remove timers
			this.turn.cleanup()
		]).then(resolve, reject);
	})
		.catch(Log.logErrorException);
}

function getPlayerIds () {
	return Object.keys(this.players);
}

function getPlayers () {
	return this.getPlayerIds().map(playerId => this.players[playerId]);
}

function generateGameFoundResponse(isPlayer1, player, game) {
	return {
		gameId: game.uuid,
		player: isPlayer1 ? 1 : 2,
		enemyPlayer: isPlayer1 ? 2 : 1,
		cards: CARD_LIST,
		startTime: game.stats.startTime,
		player1Id: game.players[game.player1].username,
		player2Id: game.players[game.player2].username,
		playerId: player.uuid,
		turn: {
			player: game.turn.currentTurn,
			interval: game.turn.currentTurnDuration / 1000,
			type: game.turn.type,
			start: Date.now()
		}
	};
}

function getOpponent (player) {
	// Accepts player uuid or player object
	var requestId = typeof player === 'string' ? player: (player && player.uuid);
	if(this.players[requestId]) {
		var opponentId = this.getPlayerIds()
			.filter(playerId =>  playerId !== requestId)[0];
		return this.players[opponentId];
	} else {
		return false;
	}
}

function updateTurn (type, interval, player) {
	if(typeof player !== 'string') {
		// Toggle functionality
		player = this.getOpponent(this.turn.playerId).uuid;
	}
	this.turn.playerId = player;
	this.turn.player = getPlayerNumber(player);
	this.turn.interval = interval;
	this.turn.type = type || C.TURN_TYPE_TURN;
	this.turn.start = Date.now ();
	IO.to (this.uuid).emit ('game:turnTimer:change', this.turn);
}

function getPlayerNumber (playerId) {
	if(this.player1 === playerId) {
		return 1;
	} else if(this.player2 === playerId) {
		return 2;
	} 
}
