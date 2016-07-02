$ (function () {
	var core = {};
	Api.getLoggedInStatus ()
		.then (handleGetLoggedInStatus);

	function handleGetLoggedInStatus(res) {
		res = res || {isLoggedIn: true};
		if (res.isLoggedIn) {
			loadsounds();
			loadAssets ()
				.then (function (res) {
					core.socket = io ('http://localhost:8080/');

					start (core);
					$ ('body').removeClass ('loading');
				}, function (err) {
					console.log ('ERROR');
				});
		} else {
			window.location.assign ('http://lol.cards/LeagueOfCards/create-account/');
		}
	}

	function loadAssets() {
		core.sprites = {};
		var assetsPromise = [];
		$.each (assets, function (key, images) {
			core.sprites[key] = {};
			$.each (images, function (imageName, imagePath) {
				var img = utils.loadImage (imagePath);
				assetsPromise.push (img);
				img.then (function (res) {
					core.sprites[key][imageName] = res;
				});
			});
		});
		return Promise.all (assetsPromise);
	}

	function loadsounds() {
		core.sounds = {};
		core.sounds.tracks = [];

		core.sounds.tracks[0] = new sound("Assets/Sounds/TheBoyWhoShatteredTime.mp3");
		core.sounds.playcard = new sound("Assets/Sounds/spell2.wav");
		core.sounds.attack = new sound("Assets/Sounds/roar.mp3");

	}
});
