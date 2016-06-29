(function () {

	$(function () {
		Api.getLoggedInStatus()
			.then(handleGetLoggedInStatus);
	});

	function handleGetLoggedInStatus(res) {
		res = res || {isLoggedIn: true};
		if(res.isLoggedIn) {
			var socket = io('http://localhost:8080/');
			start(socket);
			$('body').removeClass('loading');
		} else {
			window.location.assign('http://lol.cards/LeagueOfCards/create-account/');
		}
	}

} ());