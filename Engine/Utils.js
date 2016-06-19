var utils = (function () {

	return {
		interpolate: interpolate,
		isBool: isBool
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

}());