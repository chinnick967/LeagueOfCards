const uuid = require('node-uuid');
const queueList = require('./QueueList');

module.exports = Player;

function Player (socket) {
	this.type = C.PLAYER_TYPE;
	this.uuid = uuid.v4();
	this.status = C.PLAYER_IDLE; // waiting inGame.
	this.socket = socket;
	this.game = null;
	this.eventList = {};
	
	// TODO: Add ability for player to input custom name. 
	socket.on('queue:join', this.handleQueueJoin.bind(this));
	socket.on('queue:cancel', this.handleQueueCancel.bind(this));
	socket.on('disconnect', this.handleDisconnect.bind(this));
	socket.on ('game:turn:end', this.handleEndTurn.bind(this));
	socket.on ('game:surrender', this.handleSurrender.bind(this));
	socket.on ('game:action:submit', this.handleGameActionSubmit.bind(this));
	socket.on ('game:chat:submit', this.handleGameChatSubmit.bind(this));
	socket.on('game:end', this.handleGameEnd.bind(this));
}

Object.assign(Player.prototype, {
	isInGame: isInGame,
	setGame: setGame,
	removeGame: removeGame,


	handleQueueJoin: handleQueueJoin,
	handleQueueCancel: handleQueueCancel,
	handleDisconnect: handleDisconnect,
	handleEndTurn: handleEndTurn,
	handleSurrender: handleSurrender,
	handleGameActionSubmit: handleGameActionSubmit,
	handleGameChatSubmit: handleGameChatSubmit,
	handleGameEnd: handleGameEnd
});

function isInGame () {
	return this.game !== null;// && this.status === C.PLAYER_IN_GAME;
}
function setGame (game) {
	if(this.status !== C.PLAYER_IN_GAME) {
		this.status = C.PLAYER_IN_GAME;
		this.game = game;
		
		this.eventList.gameEnd = game.on('end', (data) => {
			console.log ('EMIT GAME END');

			this.socket.emit('game:end', {
				type: data.type,
				status: data.stats.winner === this.uuid ? C.GAME_VICTORY: C.GAME_DEFEAT
			});
			this.removeGame();
		});
	}
}

function removeGame () {
	if(this.status === C.PLAYER_IN_GAME) {
		this.game = null;
		this.status = C.PLAYER_IDLE;
		this.eventList.gameEnd();
	}
}

function handleQueueJoin () {
	// TODO: Add user count
	queueList.add(this);
}

function handleQueueCancel () {
	queueList.remove()
}

function handleDisconnect () {
	// TODO: Subtract from user count
	if(this.isInGame()) {
		// TODO: If Player in game
		// TODO: Handle Loser winner
		this.game.endGame(C.GAME_END_DISCONNECT, this.uuid, C.GAME_DEFEAT)
			.catch(err => console.log('GAME END ERROR:', err));
	} else if(this.status === C.PLAYER_IN_QUEUE) {
		// TODO: If Player in QUEUE
		queueList.remove(this)
			.then(() => console.log('Player Removed from QUEUE'));
	} else {
		// TODO: If Player Idle (Subtract from user count)

	}
}

function handleEndTurn () {
	// TODO: Handle Turn
	if(this.isInGame()) {
		this.game.endTurn(this.uuid);
	}
}

function handleSurrender () {
	// TODO: Handle Surrender
	if(this.isInGame()) {
		this.game.endGame(C.GAME_END_TYPE_SURRENDER, this.uuid, C.GAME_DEFEAT)
			.catch(err => console.log('GAME END ERROR:', err));
	}
}

function handleGameActionSubmit (data) {
	if(this.isInGame()) {
		// TODO: Handle Game Action Submit
		var action = data.action;
		if (action.name === 'Attack') {
			this.game.turn.startDefenseTurn();
		}
		this.socket.broadcast.to (this.game.uuid).emit ('game:action:submit', {action: action});
	}
}

function handleGameChatSubmit (data) {
	if(this.isInGame()) {
		this.socket.broadcast.to (this.game.uuid).emit ('game:chat:submit', data);
	}
}

function handleGameEnd (data) {
	if(this.isInGame()) {
		this.game.endGame('NORMAL', this.uuid, data.status)
			.catch(err => console.log('GAME END ERROR:', err));
	}
}