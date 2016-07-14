(function (factory) {
	if(typeof module !== 'undefined') {
		module.exports = factory();
	} else {
		window.EventEmitter = factory();
	}
}(function () {
	function EventEmitter () {
		this.events = {};
	}
	
	Object.assign(EventEmitter.prototype, {

		emit(name) {
			if(Array.isArray(this.events[name])) {
				var args = [].slice.call(arguments);
				args.shift();
				this.events[name].forEach(event => event.apply(null, args));
			}
		},

		on (name, callback) {
			if(typeof name === 'string' || typeof callback === 'function') {
				this.events[name] = this.events[name] || [];
				this.events[name].push(callback);
			}

			return () => this.off(name, callback);
		},

		off (name, callback) {
			if(typeof name === 'string' || typeof callback === 'function') {
				do {
					var index = this.events[name].indexOf(callback);
					if(index > -1) {
						this.events[name].splice(index, 1);
					}
				}while(index > -1)
			}
		},

		clear () {
			this.events = {};
		}

	});

	return EventEmitter;
}));
