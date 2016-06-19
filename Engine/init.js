(function () {

	$(function () {
		Api.getLoggedInStatus()
			.then(handleGetLoggedInStatus);
	});

	function handleGetLoggedInStatus(res) {
		if(res.isLoggedIn) {
			start();
			$('body').removeClass('loading');
		} else {
			window.location.assign('http://lol.cards/LeagueOfCards/create-account/');
		}
	}

} ());