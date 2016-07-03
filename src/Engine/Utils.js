var utils = (function () {

	var time = 0;
	return {
		interpolate: interpolate,
		isBool: isBool,
		loadImage: loadImage,
		runEveryCall: runEveryCall
	};

	function interpolate (str, data) {
		return str.replace(/{{(.*?)}}/g, function (val, $1) {
			var value = $1
				.split(/\.|\[|\]/)
				.filter(function (v) {
					return v;
				})
				.reduce(function (val, key) {
					return typeof val === 'object' && val != null ? val[key]: '';
				}, data);

			return value || '';
		});
	}

	function isBool (val) {
		return typeof val === 'boolean' || val instanceof Boolean;
	}

	function loadImage (url) {
		return new Promise(function (resolve) {
			var image = new Image();
			image.onload = function () {
				resolve(image);
			};
			image.src = url;
		});
	}
	function runEveryCall (cb, interval) {
		time++;
		if(time / interval === Math.floor(time / interval)) {
			cb();
		}
	}

}());