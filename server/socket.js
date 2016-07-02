const socketIo = require ('socket.io');
const uuid = require ('node-uuid');
const global = require('./global');

module.exports = function (server) {
	var io = socketIo.listen (server);
	var games = {};
	var users = 0;


	io.sockets.on ('connection', handleConnection);

	function handleConnection(socket) {
		var userId = Math.round(Math.random() * 10000);
		users++;

		socket.on('queue:cancel', handleQueueCancel);
		socket.on('queue:join', joinQueue);
		socket.on('game:action:submit', handleGameActionSubmit);
		socket.on('game:chat:submit', handleGameChatSubmit);
		socket.on('disconnect', handleDisconnect);
		var currentGame = null;


		function handleDisconnect () {
			users--;
			removeGame();
		}

		function joinGame (game) {
			game.turn = 1;
			game.players[1].socket = socket;
			game.players[1].user = userId;
			game.players[1].status = 'joined';
			game.players[1].data = {};
			game.status = 'full';

			socket.join(game.id);
			var message = {
				player1: game.players[0].user,
				player2: game.players[1].user
			};
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
					playerId: userId
				}
			}
		}

		function createGame() {
			var gameId = uuid.v4 ();

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
				startTime: null,
				id: gameId,
				creator: socket,
				creationDate: Date.now (),
				status: 'waiting'
			};
			socket.join(gameId);
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
				delete games[currentGame.id];
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