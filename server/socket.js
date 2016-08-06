require('./Game/Constants');
const socketIo = require ('socket.io');
const uuid = require ('node-uuid');
const Interval = require ('./Interval');
const Timeout = require('./Timeout');
const GameList = require('./Game/GameList');
const Game = require('./Game/Game');
const Player = require('./Game/Player');
const queue = require('./Game/QueueList');
const Log = require('./Log');

module.exports = function (server) {
	// Set global variable.
	global.IO = socketIo.listen (server);
	Log.create(IO);
	var users = 0;



	setInterval(function () {
		queue.process().then(function (matchups) {
			// console.log('Matchups', matchups);
			var games = matchups
				// TODO: check if player canceled
				.map(matchup => new Game(matchup))
				.forEach(game => {
					console.log('Game Created', game.uuid);
					var players = game.getPlayers();
					players
						.forEach(player => player.status = C.PLAYER_CREATING_GAME);
					
					GameList.add(game)
						.then(function () {
							// TODO: Notify players
							game.start()
								.catch(err => console.log('Game Start Error:', err));
						})
						.catch(function (err) {
							// TODO: Emit player game create failed.
							console.log ('Failed to add game', err);
							// On failure add players back into queue
							players
								.forEach(player => queue.add(player));
						});
				});
		});
	}, C.QUEUE_PROCESS_INTERVAL);

	setInterval(() => {
		GameList.clearFinishedGames()
			.then(() => {
				console.log('GAMES SUCCESSFULLY CLEARED', 'total =', GameList.getGameCount());
			})
			.catch(err => console.log('GAME CLEAR FINISHED ERROR: ', err));
	}, C.GAME_CLEAR_FINISHED_INTERVAL);

	IO.sockets.on ('connection', handleConnection);

	function handleConnection(socket) {
		users++;
		var user = new Player(socket);
		
		
		// socket.on ('disconnect', handleDisconnect);
		// socket.on ('queue:join', handleQueueJoin);
		// socket.on ('queue:cancel', handleQueueCancel);
		//
		// function handleDisconnect () {
		// 	users--;
		// 	// Remove user from queue
		// 	queue.remove(user);
		//
		// 	// TODO: End Game
		// }
		//
		// function handleQueueJoin () {
		// 	queue.add(user);
		// }
		//
		// function handleQueueCancel () {
		// 	if(user.status === Player.status.INGAME) {
		// 		// TODO: End Game
		// 	} else {
		// 		queue.remove(user).then(function () {
		// 			socket.emit('queue:canceled');
		// 		});
		// 	}
		// }


		// var userId = Math.round (Math.random () * 10000);
		// var gameId = null;
		// var currentGame = null;
		// var currentPlayer = null;
		//
		// socket.on ('game:turn:switch', handleSwitchTurn);
		// socket.on ('game:end', handleGameEnd);
		// socket.on ('queue:cancel', handleQueueCancel);
		// socket.on ('queue:join', joinQueue);
		// socket.on ('game:action:submit', handleGameActionSubmit);
		// socket.on ('game:chat:submit', handleGameChatSubmit);
		// socket.on ('disconnect', handleDisconnect);
		//
		// function handleDisconnect() {
		// 	users--;
		// 	if()
		// 	if(currentGame && currentGame.id) {
		// 		socket.broadcast.to(currentGame.id).emit('game:end', {
		// 			type: 'OPPONENT_DISCONNECTED',
		// 			status: 'VICTORY'
		// 		});
		// 		removeGame ();
		// 	}
		// }
		//
		// function startGame(game) {
		// 	var timers = game.timers;
		// 	timers.mulligan = new Timeout(function () {
		// 		timers.active.clear();
		// 		startTimer (game);
		// 	}, (MULLIGAN_INTERVAL * 1000));
		// 	timers.mulligan.start();
		// 	timers.active = timers.mulligan;
		// 	game.creator.emit ('game:found', generateGameFoundResponse (true));
		// 	game.creator.broadcast.to (game.id).emit ('game:found', generateGameFoundResponse (false));
		//
		// 	function generateGameFoundResponse(isPlayer1) {
		// 		game.turn.start = Date.now();
		// 		return {
		// 			gameId: game.id,
		// 			player: isPlayer1 ? 1 : 2,
		// 			enemyPlayer: isPlayer1 ? 2 : 1,
		// 			cards: global.cards,
		// 			startTime: game.startTime,
		// 			player1Id: game.players[0].user,
		// 			player2Id: game.players[1].user,
		// 			playerId: userId,
		// 			turn: game.turn
		// 		}
		// 	}
		// }
		//
		// function startTimer(game) {
		// 	var timers = game.timers;
		// 	sendTurn (game, 'TURN', TURN_INTERVAL);
		// 	timers.main = new Interval(function () {
		// 		sendTurn (game, 'TURN', TURN_INTERVAL);
		// 	}, (TURN_INTERVAL * 1100));
		// 	timers.main.start();
		// 	timers.active = timers.main;
		// }
		//
		// function startDefenseTimer(game) {
		// 	var timers = game.timers;
		// 	timers.main.pause ();
		// 	sendTurn (game, 'defense', DEFENSE_INTERVAL);
		// 	timers.defense = new Timeout (function () {
		// 		timers.active.clear();
		// 		sendTurn (game, 'turn', Math.round (timers.main.timeLeft / 1000));
		// 		timers.main.continue ();
		// 		timers.active = timers.main;
		// 	}, (DEFENSE_INTERVAL * 1000));
		// 	timers.defense.start();
		// 	timers.active = timers.defense;
		// }
		//
		// function sendTurn(game, type, interval, player) {
		// 	if (currentGame) {
		// 		game.turn.player = player || (game.turn.player === 1 ? 2 : 1);
		// 		game.turn.interval = interval;
		// 		game.turn.type = (type || 'turn').toUpperCase (); // TURN | DEFENSE | MULLIGAN
		// 		game.turn.start = Date.now ();
		// 		io.to (game.id).emit ('game:turnTimer:change', game.turn);
		// 	}
		// }
		//
		// function joinGame(game) {
		// 	game.players[1].socket = socket;
		// 	game.players[1].user = userId;
		// 	game.players[1].status = 'joined';
		// 	game.players[1].data = {};
		// 	game.status = 'full';
		// 	currentPlayer = 2;
		// 	games[game.id].onEnd.push(function () {
		// 		currentGame = null;
		// 	});
		// 	socket.join (game.id);
		//
		// 	startGame (game);
		// }
		//
		// function createGame() {
		// 	var gameId = uuid.v4 ();
		// 	socket.join (gameId);
		// 	currentPlayer = 1;
		// 	games[gameId] = {
		// 		players: [{
		// 			user: userId,
		// 			status: 'joined',
		// 			socket: socket
		// 		}, {
		// 			user: null,
		// 			status: 'waiting',
		// 			socket: null
		// 		}],
		// 		startTime: Date.now (),
		// 		id: gameId,
		// 		creator: socket,
		// 		creationDate: Date.now (),
		// 		status: 'waiting',
		// 		started: false,
		// 		turn: {
		// 			player: null,
		// 			interval: MULLIGAN_INTERVAL,
		// 			type: 'MULLIGAN',
		// 			start: null
		// 		},
		// 		timers: {
		// 			active: null,
		// 			main: null,
		// 			defense: null,
		// 			mulligan: null
		// 		},
		// 		onEnd: []
		// 	};
		// 	games[gameId].onEnd.push(function () {
		// 		currentGame = null;
		// 	});
		// 	return games[gameId];
		// }
		//
		// function joinQueue() {
		// 	if (currentGame)return;
		// 	currentGame = checkForOpenGame ();
		// 	if (currentGame) {
		// 		joinGame (currentGame);
		// 	} else {
		// 		currentGame = createGame ();
		// 		socket.join (currentGame.id);
		// 	}
		// }
		//
		// function handleQueueCancel() {
		// 	removeGame ();
		// }
		//
		// function removeGame() {
		// 	currentPlayer = null;
		// 	var game = getGame();
		// 	if (currentGame && game) {
		// 		var gameId = '' + currentGame.id;
		// 		Object.keys(games[gameId].timers).forEach(timer => {
		// 			var timer = game.timers[timer];
		// 			if(timer && typeof timer.clear === 'function') {
		// 				timer.clear();
		// 			}
		// 		});
		// 		setTimeout (function () {
		// 			if (currentGame) {
		// 				games[gameId].onEnd.forEach(cb => cb());
		// 				delete games[gameId];
		// 				currentGame = null;
		// 			}
		// 		});
		// 	}
		// }
		//
		// function handleGameActionSubmit(data) {
		// 	var action = data.action;
		// 	var game = getGame();
		// 	if (action.name === 'Attack') {
		// 		startDefenseTimer (game);
		// 	}
		//
		// 	socket.broadcast.to (game.id).emit ('game:action:submit', {action: action});
		// }
		//
		// function handleGameChatSubmit(data) {
		// 	socket.broadcast.to (currentGame.id).emit ('game:chat:submit', data);
		// }
		//
		// function handleGameEnd(data) {
		// 	socket.emit ('game:end', {
		// 		type: 'NORMAL',
		// 		status: data.status
		// 	});
		//
		// 	socket.broadcast.to (currentGame.id).emit ('game:end', {
		// 		type: 'NORMAL',
		// 		status: data.status === 'DEFEAT' ? 'VICTORY' : 'DEFEAT'
		// 	});
		//
		// 	removeGame ();
		// }
		//
		// function handleSwitchTurn (e) {
		// 	var game = getGame();
		// 	if (currentPlayer === game.turn.player) {
		// 		game.timers.active.flush();
		// 	}
		// }
		//
		// function getGame () {
		// 	if(currentGame && currentGame.id) {
		// 		return games[currentGame.id];
		// 	}
		// }
	}

	function checkForOpenGame() {
		var result = false;
		var keys = Object.keys (games);
		for (var i = 0; i < keys.length; i++) {
			var game = games[keys[i]];
			if (game.status === 'waiting') {
				result = game;
				break;
			}
		}
		return result;
	}
};