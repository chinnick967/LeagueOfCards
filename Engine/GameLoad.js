function init() {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");
	
	// json object that holds general game information
	var information = {};
	information.width = canvas.width;
	information.height = canvas.height;
	information.pwidth = canvas.width / 100;
	information.pheight = canvas.height / 100;
	
	// json object that holds assets
	var assets = {};
	
	// json object that holds settings
	var settings = {};
	
	// json object that holds animation vars
	var animation = {};
	
	// json objects that holds settings
	var player1 = {};
	var player2 = {};
	
	// json objects that hold board information
	var board = {};

	// json object that holds core json objects
	var core = {};
	core.information = information;
	core.assets = assets;
	core.settings = settings;
	core.player1 = player1;
	core.player2 = player2;
	core.animation = animation;
	core.board = board;
	
	core.information.init = 0;
	core.information.playerID = playerID;
	
	// delete this later
	core.player1.icon = 'Assets/Ekko.png';
	core.player2.icon = 'Assets/teemo.png';
	
	// delete this later
	core.player1.hand1 = 'Assets/Blitz2.png';
	core.player1.hand2 = 'Assets/Blitz2.png';
	core.player1.hand3 = 'Assets/Blitz2.png';
	core.player1.hand4 = 'Assets/Blitz2.png';
	core.player1.hand5 = 'Assets/Blitz2.png';
	core.player1.hand6 = 'Assets/Blitz2.png';
	core.player1.hand7 = 'Assets/Blitz2.png';
	
	// asset loading function
	loadassets(core);

    	// init functions
	core.settings.sound = 4;
	soundinit(core);
	mouseinit(core);
	//setInterval(function(){ redraw(core); }, 16);
	redraw(core);

}

function redraw(core) {

	// checks that are images are loaded
	if (core.information.loaded == true) {
	
		var canvas = document.getElementById('GameCanvas');
		var ctx = canvas.getContext("2d");
		
		// clear canvas for redrawing
		canvas.width = core.information.width;
		
		// draw game components
		drawComponents(core);
		
		// draw sound bars
		drawSound(core);
		
		// temporarily draw card 7.868
		drawhand(core);
		
		// check users current hover position on the board
		//currentboardpositionhover(core);
		
		// draws animation effects
		drawanimations(core);
	
	} else {
	
		loadprogress(core);
	
	}
	
	// post loaded init
	if (core.information.loaded == true && core.information.init == 0) {
	
		core.information.init = 1;
		
		
	
	}
	
	// redraw
	setTimeout(function(){ redraw(core); }, 10);
	
}