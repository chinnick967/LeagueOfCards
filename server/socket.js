const socketIo = require ('socket.io');
const uuid = require ('node-uuid');

module.exports = function (server) {
	var io = socketIo.listen (server);
	var games = {};
	var users = 0;


	io.sockets.on ('connection', handleConnection);

	function handleConnection(socket) {
		var userId = Math.round(Math.random() * 10000);
		users++;

		//socket.on('queue:cancel', handleQueueCancel);
		socket.on('queue:join', joinQueue);
		socket.on('disconnect', handleDisconnect);
		var currentGame = null;


		function handleDisconnect () {
			users--;
			if(currentGame) {
				delete games[currentGame.id];
			}
		}

		function joinGame(game) {
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

			socket.broadcast.emit('game:found', message);
			socket.emit('game:found', message);
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