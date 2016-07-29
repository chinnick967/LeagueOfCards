var utils = (function () {

	return {
		interpolate: interpolate,
		isBool: isBool,
		loadImage: loadImage,
		slice: slice,
		drawImage: drawImage,
		maxMin: maxMin
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

	function slice (args) {
		return [].slice.call(args);
	}

	function drawImage (ctx) {
		if(!ctx) return;
		let args = slice(arguments);
		args.shift();
		let image = args[0];
		if(image instanceof HTMLImageElement || image instanceof HTMLVideoElement || image instanceof HTMLVideoElement) {
			ctx.drawImage.apply(ctx, args);
		}
	}
	
	function maxMin (num, max, min) {
		return Math.max(min || 0, Math.min(num, max));
	}

}());