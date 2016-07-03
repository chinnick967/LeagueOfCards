const socketIo = require ('socket.io');
const uuid = require ('node-uuid');
const global = require('./global');
const Interval = require('./Interval');


module.exports = function (server) {
	var io = socketIo.listen (server);
	var games = {};
	var users = 0;

	io.sockets.on ('connection', handleConnection);

	function handleConnection(socket) {
		users++;
		var userId = Math.round(Math.random() * 10000);
		var currentGame = null;

		socket.on('queue:cancel', handleQueueCancel);
		socket.on('queue:join', joinQueue);
		socket.on('game:action:submit', handleGameActionSubmit);
		socket.on('game:chat:submit', handleGameChatSubmit);
		socket.on('disconnect', handleDisconnect);


		function handleDisconnect () {
			users--;
			removeGame();
		}

		function startTimer (game) {
			game.timers.main = new Interval(function () {
				if(currentGame) {
					game.turn.player = game.turn.player === 1 ? 2: 1;
					game.turn.interval = 10;
					game.turn.type = 'TURN'; // ATTACK | TURN | DEFENSE | 'MULLIGAN'
					game.turn.start = Date.now();
					io.to(game.id).emit('game:turnTimer:change', game.turn);
				}
			}, 10000);
			game.timers.main.start();
		}

		function joinGame (game) {
			game.players[1].socket = socket;
			game.players[1].user = userId;
			game.players[1].status = 'joined';
			game.players[1].data = {};
			game.status = 'full';
			socket.join(game.id);

			startTimer(game);
			game.creator.emit('game:found', generateGameFoundResponse(true));
			game.creator.broadcast.emit('game:found', generateGameFoundResponse(false));


			function generateGameFoundResponse (isPlayer1) {
				return {
					gameId: game.id,
					player: isPlayer1 ? 1: 2,
					enemyPlayer: isPlayer1 ? 2: 1,
					cards: global.cards,
					startTime: game.startTime,
					player1Id: game.players[0].user,
					player2Id: game.players[1].user,
					playerId: userId,
					turn: game.turn
				}
			}
		}

		function createGame() {
			var gameId = uuid.v4 ();
			socket.join(gameId);

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
				startTime: Date.now(),
				id: gameId,
				creator: socket,
				creationDate: Date.now (),
				status: 'waiting',
				ready: 0,
				started: false,
				turn: {
					player: null,
					interval: 10,
					type: 'TURN',
					start: Date.now()
				},
				timers: {
					main: null
				}
			};
			return games[gameId];
		}

		function joinQueue () {
			if(currentGame)return;

			currentGame = checkForOpenGame ();
			if (currentGame) {
				joinGame (currentGame);
			} else {
				currentGame = createGame ();
				socket.join(currentGame.id);
			}
		}

		function handleQueueCancel () {
			removeGame();
		}
		function removeGame () {
			if(currentGame) {


				if(games[currentGame.id].turnTimer) {
					games[currentGame.id].turnTimer.end();
				}

				setTimeout(function () {
					if(currentGame) {
						delete games[currentGame.id];
						currentGame = null;
					}
				});
			}
			currentGame = null;
		}
		function handleGameActionSubmit (data) {
			socket.broadcast.emit('game:action:submit', { action: data.action });
		}

		function handleGameChatSubmit (data) {
			socket.broadcast.emit('game:chat:submit', data);
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