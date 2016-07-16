function init(gameInfo) {
	
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
	information.turnstart = gameInfo.turn.start; // Temp fix for initial felay on server.
	information.turnlength = gameInfo.turn.interval;

	// json object that holds assets
	// var assets = ;

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
	core = {};
	core.information = information;
	core.assets = {
		cards: []
	};
	// card effects object
	core.effects = {};

	core.settings = settings;
	core.player1 = player1;
	core.player2 = player2;
	core.animation = animation;
	core.board = board;
	core.actions = actions;
	core.mechanics = mechanics;
	core.actions.actionarray = actionarray;
	core.information.init = 0;
	core.chat = ChatBox($('chat-box'), core);
	core.chat.listen();
	core.animateTimerActive = true;
	core.sprites = ASSETS.SPRITES;
	core.sounds = ASSETS.SOUNDS;
	// init functions
	core.settings.sound = 4;
	core.assets.cards = processCards(gameInfo.cards, core);

	EndGame.trackGameEnd(core);
	
	// setup player info
	setupPlayer(core);


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

	core.information.interval = setInterval(function(){ runactions(core); }, 10);

}

function redraw(core) {
		// clear canvas for redrawing
		//canvas.width = core.information.width;
		ctx.clearRect(0, 0, 1000, 600);
		
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

		// track turn info
		changeturntime(core);

		// check for destroyed cards on the board
		checkfordestroyedcard(core);

		core.animateTimerActive && requestAnimationFrame(function(){ redraw(core); });
	
}


function closeGameSockets () {
	Object.keys(socket._callbacks)
		.filter(eventName => eventName.startsWith('$game:') && eventName !== '$game:found')
		.map(eventName => eventName.substr(1, eventName.length))
		.forEach(eventName => {
			console.log (eventName);
			socket.removeAllListeners(eventName);
		});
}