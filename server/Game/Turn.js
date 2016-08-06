'use strict';
const Utils = require('./Utils');
const Timeout = require('../Timeout');
const EventEmitter = require('./EventEmitter'); 
const Log = require('../Log');



module.exports = Turn;

function Turn (player1, player2) {
	EventEmitter.call(this);
	this.players = [player1, player2];
	this.currentPlayer = null;
	this.currentTurn = null;
	this.type = null;
	this.currentTurnDuration = 0;
	this.timers = {
		mulligan: null,
		main: null,
		defense: null
	};
}

Object.assign(Turn.prototype, EventEmitter.prototype, {
	start: start,
	getTurn: getTurn,
	endTurn: endTurn,
	startMainTurn: startMainTurn,
	startDefenseTurn: startDefenseTurn,
	startMulliganTurn: startMulliganTurn,
	cleanup: cleanup
});

// Starts mulligan timer
function start () {
	// TODO: Start mulligan (VERIFY)
	this.type = C.TURN_TYPE_MULLIGAN;
	this.startMulliganTurn();
}

// Get's current uuid Turn
function getTurn () {

}

// Ends current player turn
function endTurn (requestingPlayerId) {
	// Block if isn't user's turn or if mulligan phase
	if(this.currentPlayer.uuid !== requestingPlayerId || this.type === C.TURN_TYPE_MULLIGAN) {
		return;
	}

	if (this.type === C.TURN_TYPE_TURN) {
		this.timers.main.flush();
	} else if(this.type === C.TURN_TYPE_DEFENSE) {
		this.timers.defense.flush();
	}
}

function startMainTurn (interval) {
	this.currentTurnDuration = typeof interval === 'number' ? interval: C.TURN_TYPE_TURN_INTERVAL;
	this.type = C.TURN_TYPE_TURN;
	toggleTurn.call(this);
	this.timers.main = new Timeout(() => {
		this.timers.main.clear();
		this.timers.main = null;
		// run again
		this.startMainTurn ();
	}, this.currentTurnDuration);
	this.timers.main.start();
	// TODO: Change Player (VERIFY)
	emitTurnChange.call(this);
}

function startDefenseTurn () {
	this.type = C.TURN_TYPE_DEFENSE;
	this.currentTurnDuration = C.TURN_TYPE_DEFENSE_INTERVAL;
	var main = this.timers.main;
	toggleTurn.call(this);
	// Save time left rounded up to next second 
	var timeLeft = Utils.ceilTo(main.duration - main.totalDuration, 1000);
	main.clear();
	this.timers.main = null;
	
	var defenseTimer = new Timeout(() => {
		this.timers.defense.clear();
		this.timers.defense = null;

		this.startMainTurn(timeLeft);
	}, this.currentTurnDuration);
	defenseTimer.start();
	this.timers.defense = defenseTimer;
	// TODO: Change Player (VERIFY)
	emitTurnChange.call(this);
}

function startMulliganTurn () {
	this.type = C.TURN_TYPE_MULLIGAN;
	this.currentPlayer = 0;
	this.currentTurnDuration = C.TURN_TYPE_MULLIGAN_INTERVAL; 
	this.timers.mulligan = new Timeout(() => {
		this.timers.mulligan.clear();
		this.timers.mulligan = null;
		this.startMainTurn();
	}, this.currentTurnDuration);
	this.timers.mulligan.start();
	// TODO: Change Player (VERIFY)
	emitTurnChange.call(this);
}

function cleanup () {
	return new Promise ((resolve) => {
		clearTimeout(this.timers.mulligan);
		clearTimeout(this.timers.main);
		clearTimeout(this.timers.defense);
		this.clearEvents();
		resolve();
	}).catch(Log.logErrorException);
}

function toggleTurn () {
	this.currentTurn = this.currentTurn === 1 ? 2: 1;
	this.currentPlayer = this.players[this.currentTurn - 1];
}

function emitTurnChange () {
	this.emit('change', {
		player: this.currentTurn,
		interval: this.currentTurnDuration / 1000,
		type: this.type,
		start: Date.now()
	});
}

function clearTimeout (timeout) {
	if(timeout instanceof Timeout) {
		timeout.clear();
	}
}

function flushTimeout (timeout) {
	if(timeout instanceof Timeout) {
		timeout.flush();
	}
}