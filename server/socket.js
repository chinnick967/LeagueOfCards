const socketIo = require ('socket.io');
const uuid = require ('node-uuid');
const global = require ('./global');
const Interval = require ('./Interval');

const MULLIGAN_INTERVAL = 10;
const TURN_INTERVAL = 10;
const DEFENSE_INTERVAL = 10;

module.exports = function (server) {
	var io = socketIo.listen (server);
	var games = {};
	var users = 0;
	var gamesSocket = io.of ('/games');

	setInterval (emitGamesList, 3000);
	gamesSocket.on ('connection', function (socket) {
		emitGamesList ()
	});

	function emitGamesList() {
		var gameList = Object.keys (games);
		gamesSocket.emit ('games:list', {games: {length: gameList.length}, players:users});
	}

	io.sockets.on ('connection', handleConnection);

	function handleConnection(socket) {
		users++;
		var userId = Math.round (Math.random () * 10000);
		var currentGame = null;

		socket.on ('game:end', handleGameEnd);
		socket.on ('queue:cancel', handleQueueCancel);
		socket.on ('queue:join', joinQueue);
		socket.on ('game:action:submit', handleGameActionSubmit);
		socket.on ('game:chat:submit', handleGameChatSubmit);
		socket.on ('disconnect', handleDisconnect);

		function handleDisconnect() {
			users--;
			if(currentGame && currentGame.id) {
				socket.broadcast.to(currentGame.id).emit('game:end', {
					type: 'OPPONENT_DISCONNECTED',
					status: 'VICTORY'
				});
				removeGame ();
			}
		}

		function startGame(game) {
			var timers = game.timers;
			timers.mulligan = setTimeout (function () {
				startTimer (game);
			}, (MULLIGAN_INTERVAL * 1000));
			game.creator.emit ('game:found', generateGameFoundResponse (true));
			game.creator.broadcast.to (game.id).emit ('game:found', generateGameFoundResponse (false));

			function generateGameFoundResponse(isPlayer1) {
				game.turn.start = Date.now();
				return {
					gameId: game.id,
					player: isPlayer1 ? 1 : 2,
					enemyPlayer: isPlayer1 ? 2 : 1,
					cards: global.cards,
					startTime: game.startTime,
					player1Id: game.players[0].user,
					player2Id: game.players[1].user,
					playerId: userId,
					turn: game.turn
				}
			}
		}

		function startTimer(game) {
			var timers = game.timers;
			sendTurn (game, 'TURN', TURN_INTERVAL);
			timers.main = new Interval (function () {
				sendTurn (game, 'TURN', TURN_INTERVAL);
			}, (TURN_INTERVAL * 1000));
			timers.main.start ();
		}

		function startDefenseTimer(game) {
			var timers = game.timers;
			timers.main.pause ();
			sendTurn (game, 'defense', DEFENSE_INTERVAL);
			setTimeout (function () {
				sendTurn (game, 'turn', Math.round (timers.main.timeLeft / 1000));
				timers.main.continue ();
			}, (DEFENSE_INTERVAL * 1000));
		}

		function sendTurn(game, type, interval, player) {
			if (currentGame) {
				game.turn.player = player || (game.turn.player === 1 ? 2 : 1);
				game.turn.interval = interval;
				game.turn.type = (type || 'turn').toUpperCase (); // TURN | DEFENSE | MULLIGAN
				game.turn.start = Date.now ();
				io.to (game.id).emit ('game:turnTimer:change', game.turn);
			}
		}

		function joinGame(game) {
			game.players[1].socket = socket;
			game.players[1].user = userId;
			game.players[1].status = 'joined';
			game.players[1].data = {};
			game.status = 'full';

			games[game.id].onEnd.push(function () {
				currentGame = null;
			});
			socket.join (game.id);

			startGame (game);
		}

		function createGame() {
			var gameId = uuid.v4 ();
			socket.join (gameId);

			games[gameId] = {
				players: [{
					user: userId,
					status: 'joined',
					socket: socket
				}, {
					user: null,
					status: 'waiting',
					socket: null
				}],
				startTime: Date.now (),
				id: gameId,
				creator: socket,
				creationDate: Date.now (),
				status: 'waiting',
				started: false,
				turn: {
					player: null,
					interval: MULLIGAN_INTERVAL,
					type: 'MULLIGAN',
					start: null
				},
				timers: {
					main: null,
					defense: null,
					mulligan: null
				},
				onEnd: []
			};
			games[gameId].onEnd.push(function () {
				currentGame = null;
			});
			return games[gameId];
		}

		function joinQueue() {
			if (currentGame)return;

			currentGame = checkForOpenGame ();
			if (currentGame) {
				joinGame (currentGame);
			} else {
				currentGame = createGame ();
				socket.join (currentGame.id);
			}
		}

		function handleQueueCancel() {
			removeGame ();
		}

		function removeGame() {
			if (currentGame && games[currentGame.id]) {
				var gameId = '' + currentGame.id;
				if (games[gameId].timers.main) {
					games[gameId].timers.main.stop ();
				}
				setTimeout (function () {
					if (currentGame) {
						games[gameId].onEnd.forEach(cb => cb());
						delete games[gameId];
						currentGame = null;
					}
				});
			}
		}

		function handleGameActionSubmit(data) {
			var action = data.action;
			var game = games[currentGame.id];
			if (action.name === 'Attack') {
				startDefenseTimer (game);
			}
			socket.broadcast.to (game.id).emit ('game:action:submit', {action: action});
		}

		function handleGameChatSubmit(data) {
			socket.broadcast.to (currentGame.id).emit ('game:chat:submit', data);
		}

		function handleGameEnd(data) {
			socket.emit ('game:end', {
				type: 'NORMAL',
				status: data.status
			});

			socket.broadcast.to (currentGame.id).emit ('game:end', {
				type: 'NORMAL',
				status: data.status === 'DEFEAT' ? 'VICTORY' : 'DEFEAT'
			});

			removeGame ();
		}
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