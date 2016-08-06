'use strict';
const Utils = require('./Utils');
const Log = require('../Log');

var gameCount = 0;
var activeGames = {};
var playersInGame = {};
// TODO: Create cron job to clear out finished games.
var GameList = {
	add: add,
	remove: remove,
	clearFinishedGames: clearFinishedGames,
	getGameCount: getGameCount,
	isPlayerInGame: isPlayerInGame,
	hasGame: hasGame
};

module.exports = GameList;

function add (game) {
	return new Promise((resolve, reject) => {
		if(!Utils.isType(game, C.GAME_TYPE)) return reject();

		if(!activeGames[game.uuid]) {
			gameCount++;
			activeGames[game.uuid] = game;
			var playerIds = game.getPlayerIds();
			playersInGame[playerIds[0]] = true;
			playersInGame[playerIds[1]] = true;
		}
		resolve();
	})
		.catch(Log.logErrorException);
}

function remove (game) {
	return new Promise((resolve, reject) => {
		if(!Utils.isType(game, C.GAME_TYPE)) return reject();
		if (activeGames[game.uuid]) {
			gameCount--;
			game.getPlayerIds()
				.forEach(playerId => delete playersInGame[playerId]);
			delete activeGames[game.uuid];
		}
		resolve();
	})
		.catch(Log.logErrorException);
}

function clearFinishedGames () {
	return new Promise((resolve, reject) => {
		var promises = Object.keys(activeGames)
			.map(key => activeGames[key])
			.filter(game => {
				console.log('===');
				console.log(game.status);
				console.log(!game || game.status === C.GAME_END);
				console.log('===');
				return !game || game.status === C.GAME_END
			})
			.map(game => GameList.remove(game));
		Promise.all(promises).then(resolve, reject);
	})
		.catch(Log.logErrorException);
}

function getGameCount () {
	return gameCount;
}

function isPlayerInGame (player) {
	if (!!Utils.isType(player, C.PLAYER_TYPE)) return;
	return !!playersInGame[player.uuid];
}

function hasGame (game) {
	if(!Utils.isType(game, C.GAME_TYPE)) return;
	return !!activeGames[game.uuid];
}