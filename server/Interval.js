
module.exports = Interval;

function Interval (callback, interval) {
	this.isPaused = false;
	this.startingTime = null;
	this.continueTimeAt = null;
	this.callback = callback;
	this.interval = interval || 0;
	this.intervalId = null;
}

Interval.prototype = Object.assign(Interval.prototype, {

	start () {
		this.startingTime = Date.now();
		this.intervalId = setInterval(() => {
			this.startingTime = Date.now();
			this.callback()
		}, this.interval || 0);
		return this;
	},

	pause () {
		if(!this.isPaused) {
			this.isPaused = true;
			this.continueTimeAt = Date.now() - this.startingTime();
			clearInterval(this.intervalId);
		}
		return this;
	},

	continue () {
		if(this.isPaused) {
			this.isPaused = false;
			setTimeout(() => this.start(), this.continueTimeAt);
		}
		return this;
	},

	stop () {
		clearInterval(this.intervalId);
		return this;
	},

	reset (runCallback) {
		if(runCallback === true) {
			this.callback();
		}
		clearInterval(this.intervalId);
		this.start();
		return this;
	}

});