/**
 * Created by theshoffscouch on 7/24/16.
 */
module.exports = Timeout;

function Timeout (callback, duration) {
	this.callback = callback;
	this.duration = duration;

	this.timeout = null;
	this.startTime = null;
	this.stopTime = null;
	this.started = false;
	this.paused = false;
	this.finished = false;
};

Object.assign(Timeout.prototype, {
	start() {
		var self = this;
		if(!this.started) {
			this.startTime = Date.now();
			this.timeout = setTimeout(function () {
				self.finished = true;
				self.callback();
			}, this.duration || 0);
		}
		return this;
	},
	pause () {
		if(this.started) {
			this.paused = true;
			this.stopTime = Date.now();
			this.clear ();
		}
		return this;
	},
	continue () {
		if(this.paused) {
			this.paused = false;
			var duration = (this.stopTime - this.startTime) - this.duration;
			this.timeout = setTimeout(function () {
				self.finished = true;
				self.callback();
			}, duration);
		}
		return this;
	},
	clear () {
		clearInterval(this.timeout);
		return this;
	},
	flush () {
		this.clear();
		this.finished = true;
		this.callback();
		return this;
	},
	call () {
		if(typeof this.callback === 'function') {
			this.callback();
		}
		return this;
	}
});
