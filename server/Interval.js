
module.exports = Interval;

function Interval (callback, interval) {
	this.isPaused = false;
	this.startingTime = null;
	this.timeLeft = null;
	this.callback = callback;
	this.interval = interval || 0;
	this.intervalId = null;
	this.timeoutId = null;
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
			this.timeLeft = (this.interval) - (Date.now() - this.startingTime);
		}
		clearInterval(this.intervalId);
		clearTimeout(this.timeoutId);
		return this;
	},

	continue () {
		if(this.isPaused) {
			this.isPaused = false;
			this.startingTime = Date.now();
			this.timeoutId = setTimeout(() => {
				this.callback();
				this.start()
			}, this.timeLeft);
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
	},

	flush () {
		this.reset(true);
		return this;
	}

});
