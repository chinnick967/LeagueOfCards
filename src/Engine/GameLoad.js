function init(core, gameInfo) {
	
	// json object that holds general game information
	var information = {};
	information.width = canvas.width;
	information.height = canvas.height;
	information.pwidth = canvas.width / 100;
	information.pheight = canvas.height / 100;
	information.player = gameInfo.player;
	information.enemyplayer = gameInfo.enemyPlayer;
	information.gameid = gameInfo.gameId;
	information.player1ID = gameInfo.player1Id;
	information.player2ID = gameInfo.player2Id;
	information.starttime = gameInfo.startTime;
	information.playerID = gameInfo.playerId;

	information.turn = gameInfo.turn.player;
	information.turnType = gameInfo.turn.type;
	information.turnstart = gameInfo.turn.start + 2000; // Temp fix for initial felay on server.
	information.turnlength = gameInfo.turn.interval;

	// json object that holds assets
	var assets = {
		cards: processCards(gameInfo.cards, core)
	};

	// json object that holds settings
	var settings = {};

	// array that holds animation vars
	var animation = [];

	// json objects that holds settings
	var player1 = {
		icon: 'ekko'
	};
	var player2 = {
		icon: 'teemo'
	};

	// json objects that hold board information
	var board = {};

	// json object that holds the actions information
	var actions = {};

	// json that holds sounds
	var sounds = {};

	// json that holds game mechanics
	var mechanics = {};

	// Array that holds game actions
	var actionarray = [];

	// json object that holds core json objects

	// ***NOTE*** Core is created in init.js
	// var core = {};
	//console.log()
	core.information = information;
	core.assets = assets;
	core.settings = settings;
	core.player1 = player1;
	core.player2 = player2;
	core.animation = animation;
	core.board = board;
	core.actions = actions;
	//core.sounds = sounds;
	core.mechanics = mechanics;
	core.actions.actionarray = actionarray;
	core.information.init = 0;
	core.chat = ChatBox($('chat-box'), core);
	core.chat.listen();
	//console.log ('chat thing', core.chat);

	//window.chat2 = core.chat;
	//core.information.playerID = playerID;

	// delete this later
	//core.player1.icon = 'Assets/Ekko.png';
	//core.player2.icon = 'Assets/teemo.png';
	//console.log (core);
	//console.log (core);

	// setup player info
	setupPlayer(core);

    	// init functions
	core.settings.sound = 4;
	soundinit(core);
	mouseinit(core);
	//setInterval(function(){ redraw(core); }, 16);
	redraw(core);
	startTimer(core);
	// adds coin animations
	setTimeout(function(){ addanimation(core, 'goldcoin', 1.8, 34, var1 = '', var2 = '', var3 = ''); }, 1000);
	setTimeout(function(){ addanimation(core, 'goldcoin', 1.8, 61.6, var1 = '', var2 = '', var3 = ''); }, 1000);
	setTimeout(function(){ addanimation(core, 'silvercoin', 2.3, 38.2, var1 = '', var2 = '', var3 = ''); }, 1000);
	setTimeout(function(){ addanimation(core, 'silvercoin', 2.3, 58.2, var1 = '', var2 = '', var3 = ''); }, 1000);

	// start check for actions
	checkactions(core);

	//// set the variable for the first run after loading
	//core.information.firstrun = 1;



}

function redraw(core) {

	// checks that are images are loaded
	//if (core.information.loaded == true) {
		// clear canvas for redrawing
		canvas.width = core.information.width;

		// draw sound bars
		drawSound(core);

		// check users current hover position on the board
		//currentboardpositionhover(core);

		// draw game components
		drawComponents(core);

		// draws animation effects
		drawanimations(core);

		// draws the hand outside the components because the previewcard function has to draw after animations or the coins sit on top of it
		drawhand(core);
		previewboardcard(core);

		// runs actions
		runactions(core);

		// track turn info
		changeturntime(core);

		// if first run, start game
		//if (core.information.firstrun == 1) {
			// run background music (temporarily just for player 1)
			/*if (core.information.player == 1) {
				core.sounds.tracks[0].volume(0.5);
				core.sounds.tracks[0].play();
				core.sounds.tracks[0].loop();
			}*/
		//}
		
		// set first run to 1
		//core.information.firstrun = 0;
		
	//} else {
	//
	//	loadprogress(core);
	//
	//}
	
	// post loaded init
	//if (core.information.loaded == true && core.information.init == 0) {
	//
	//	core.information.init = 1;
	//
	//
	//
	//}
	
	// redraw
	setTimeout(function(){ redraw(core); }, 5);
	
}