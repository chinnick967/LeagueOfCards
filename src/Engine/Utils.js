var utils = (function () {
	// var measureTextContext = document.createElement('canvas').getContext('2d');
	return {
		interpolate: interpolate,
		isBool: isBool,
		loadImage: loadImage,
		parseStyleBorder: parseStyleBorder,
		// measureText: measureText
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

	function parseStyleBorder (str) {
		var list = str.split(' ');
		return {
			size: list[0].trim(),
			color: typeof list[1] === 'string' ? list[1].trim(): null
		};
	}

	// function measureText () {
	// 	ctx.save();
	// 	ctx.font =
	// }

}());