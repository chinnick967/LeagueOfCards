'use strict';
const Player = require('./Player');
const Utils = require('./Utils');
const Log = require('../Log');

var queue = [];
var playersInGame = {};

module.exports = {
	add: add,
	process: process,
	remove: remove
};

function add (player) {
	if(!Utils.isType(player, C.PLAYER_TYPE)) return;
	if(!playersInGame[player.uuid]) {
		player.status = C.PLAYER_IN_QUEUE;
		queue.push(player);
		playersInGame[player.uuid] = true;
		console.log('Queue Count =', queue.length);
	}
}

function process () {
	return new Promise((resolve, reject) => {
		var pairs = [];

		while(queue.length >= 2) {
			var player1 = queue.shift();
			var player2 = queue.shift();
			delete playersInGame[player1.uuid];
			delete playersInGame[player2.uuid];
			pairs.push([player1, player2]);
		}

		resolve(pairs);
	})
		.catch(Log.logErrorException);
}

function remove (player) {
	return new Promise((resolve, reject) => {
		if(!Utils.isType(player, C.PLAYER_TYPE)) return reject();
		var index = queue.indexOf(player);
		if(index !== -1) {
			queue.splice(index, 1);
			delete playersInGame[player.uuid];
		}

		resolve();
	})
		.catch(Log.logErrorException);
}