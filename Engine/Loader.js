function loadassets(core) {

// game assets
var gamecomponents = [
'Assets/SoundBars.png',
'Assets/bluetimer.png',
'Assets/redtimer.png',
'Assets/threecards.png',
core.player1.icon,
core.player2.icon,
'Assets/settings.png',
'Assets/fullscreen.png'
];

var imagesloaded = 0;

	for (var i = 0; i < gamecomponents.length; i++) {
		
		var img = new Image();
		
		img.onload = function() {
			imagesloaded++;
			if (imagesloaded == gamecomponents.length) {
				
				core.information.loaded = true;
				
			}
		}
		
		img.src = gamecomponents[i];
		
		addtoassets(core, i, img);
	
	}

}

function addtoassets(core, current, img) {
	
	if (current == 0) {core.assets.soundimg = img;}	
	if (current == 1) {core.assets.bluetimer = img;}
	if (current == 2) {core.assets.redtimer = img;}
	if (current == 3) {core.assets.threecards = img;}
	if (current == 4) {core.player1.icon = img;}
	if (current == 5) {core.player2.icon = img;}
	if (current == 6) {core.assets.settings = img;}
	if (current == 7) {core.assets.fullscreen = img;}
	
}