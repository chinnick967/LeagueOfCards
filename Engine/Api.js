var Api = (function ($) {
	var BASE_URL = 'Engine/ServerScripts/';
	var GET_LOGGED_IN_STATUS = BASE_URL + 'User/getLoggedInStatus.php';

	return {
		getLoggedInStatus: getLoggedInStatus
	};

	function getLoggedInStatus () {
		return $.get(GET_LOGGED_IN_STATUS)
			.then(returnData);
	}

	function returnData (result) {
		return result.data;
	}

} (jQuery));