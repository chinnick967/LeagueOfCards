var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext('2d');
var socket;
var mouseEmitter = new EventEmitter();
var ASSETS = {
	SPRITES: {},
	SOUNDS: {}
};
$ (AppInit);
function AppInit() {
	Api.getLoggedInStatus ()
		.then (handleGetLoggedInStatus);

	function handleGetLoggedInStatus(res) {
		res = res || {isLoggedIn: true};
		if (res.isLoggedIn) {
			loadsounds();
			loadAssets ()
				.then (function (res) {
					socket = io ('http://localhost:8081/');
					GameQueue.start ();
					$ ('body').removeClass ('loading');
				}, function (err) {
					console.log ('ERROR');
				});
		} else {
			window.location.assign ('http://lol.cards/LeagueOfCards/create-account/');
		}
	}

	function loadAssets() {
		ASSETS.SPRITES = {};
		var assetsPromise = [];
		$.each (assets, function (key, images) {
			ASSETS.SPRITES[key] = {};
			$.each (images, function (imageName, imagePath) {
				var img = utils.loadImage (imagePath);
				assetsPromise.push (img);
				img.then (function (res) {
					ASSETS.SPRITES[key][imageName] = res;
				});
			});
		});
		return Promise.all (assetsPromise);
	}

	function loadsounds() {
		ASSETS.SOUNDS = {};
		ASSETS.SOUNDS.tracks = [];

		ASSETS.SOUNDS.tracks[0] = new sound("Assets/Sounds/TheBoyWhoShatteredTime.mp3");
		ASSETS.SOUNDS.playcard = new sound("Assets/Sounds/spell2.wav");
		ASSETS.SOUNDS.attack = new sound("Assets/Sounds/roar.mp3");

	}
}
