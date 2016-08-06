'use strict';
const uuid = require('node-uuid');

module.exports = Timeout;

function Timeout (callback, duration) {
	var callcount = 0;
	this.uuid = uuid.v4();
	this.callback = function () {
		callback()
	};
	this.duration = duration;
	// this.callcount = 0;
	this.timeout = null;
	this.startTime = null;
	this.stopTime = null;
	this.timeleft = null;
	this.started = false;
	this.paused = false;
	this.finished = false;
	this.cleared = false;
	this.totalDuration = 0;

}

Object.assign(Timeout.prototype, {
	start() {
		var self = this;
		if(!this.started) {
			this.startTime = Date.now();
			this.timeout = setTimeout(() => execute.call(this), this.duration || 0);
		}
		return this;
	},
	pause () {
		if(this.started) {
			this.paused = true;
			this.stopTime = Date.now();
			this.totalDuration += this.stopTime - this.startTime;
			this.clear ();
		}
		return this;
	},
	continue () {
		if(this.paused && this.totalDuration < this.duration) {
			this.paused = false;
			var timeLeft = this.duration - this.totalDuration;
			this.timeout = setTimeout(() => execute.call(this), timeLeft);
		}
		return this;
	},
	clear () {
		clearInterval(this.timeout);
		this.cleared = true;
		return this;
	},
	flush () {
		clearInterval(this.timeout);
		execute.call(this);
		this.cleared = true;
		return this;
	},
	call () {
		if(typeof this.callback === 'function') {
			this.callback();
		}
		return this;
	}
});

function execute () {
	if(!this.finished && !this.cleared) {
		this.finished = true;
		this.callback();
	}
}
