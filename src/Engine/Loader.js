// global variable for games loading percentage
var loadpercent = 0;
var loadedassets = 0;
var totalload = 0;

function setupPlayer(core) {

// game assets
//var gamecomponents = [
//	'Assets/SoundBars.png',
//	'Assets/bluetimer.png',
//	'Assets/redtimer.png',
//	'Assets/threecards.png',
//	core.player1.icon,
//	core.player2.icon,
//	'Assets/settings.png',
//	'Assets/fullscreen.png',
//	'Assets/magicresist.png',
//	'Assets/armor.png',
//	'Assets/towericon.png',
//	'Assets/inhibicon.png',
//	'Assets/goldicon2.png',
//	'Assets/goldstack.png',
//	'Assets/yellowcard.png',
//	'Assets/cardback.png',
//	//'Assets/Sprites/buff.png',
//	//'Assets/Sprites/rune6.png',
//	//'Assets/Sprites/coins2.png',
//	'Assets/rengar.png',
//	'Assets/braumshield.png'
//];

// assets array plus one for loading the player information and plus 8 for loading cards plus 1 for each hand plus one for setting gold plus 1 for gameinfo/settings plus 1 for loading towers plus 1 for actions array
//totalload += gamecomponents.length + 1 + 8 + 2 + 1 + 1 + 1 + 1;

	//for (var i = 0; i < gamecomponents.length; i++) {
	//
	//	var img = new Image();
	//
	//	img.onload = function() {
	//		loadedassets++;
	//	};
	//
	//	img.src = gamecomponents[i];
	//
	//	addtoassets(core, i, img);
	//
	//}
	//
	//loadplayer(core, playerID, gamecomponents);
	getdeck(core);
	// prepare the game board
	boardprep(core);

	//// load game sounds
	//loadsounds(core);

	// set the player gold amount
	setgold(core);

	// set players hands count
	sethandamount(core);

	// set the player's towers
	settowers(core);

	///* ------------------------------- CHAT BOX EXAMPLE ------------------------------- */
	//// Create object
	//core.chat = ChatBox($('chat-box'), core);
	//// start listening for events
	//core.chat.listen();
	//// publish events
	//core.chat.post(ChatBox.msg.DESTROYED_CARD, {
	//	player: 'Master Popo',
	//	card: 'Piccolo\'s bum'
	//});
	//window.chat = core.chat;
	//// show/hide
	/*var show = false;
	setInterval(function () {
		if(show) {
			chat.show();
		} else {
			chat.show(false);
		}
		show = !show;
	}, 1000); */
}

//function addtoassets(core, current, img) {

	//if (current == 4) {core.player1.icon = img;}
	//if (current == 5) {core.player2.icon = img;}
	//if (current == 0) {core.sprites.soundimg = img;}
	//if (current == 1) {core.sprites.bluetimer = img;}
	//if (current == 2) {core.sprites.redtimer = img;}
	//if (current == 3) {core.sprites.threecards = img;}
	//if (current == 6) {core.sprites.settings = img;}
	//if (current == 7) {core.sprites.fullscreen = img;}
	//if (current == 8) {core.sprites.magicresist = img;}
	//if (current == 9) {core.sprites.armor = img;}
	//if (current == 10) {core.sprites.tower = img;}
	//if (current == 11) {core.sprites.nexus = img;}
	//if (current == 12) {core.sprites.gold = img;}
	//if (current == 13) {core.sprites.goldincome = img;}
	//if (current == 14) {core.sprites.cardsicon = img;}
	//if (current == 15) {core.sprites.cardback = img;}
	//if (current == 16) {core.sprites.buffsprite = img;}
	//if (current == 17) {core.sprites.playcardsprite = img;}
	//if (current == 18) {core.sprites.coins = img;}
	//if (current == 19) {core.sprites.rengar = img;}
	//if (current == 20) {core.sprites.shield = img;}
	
//}

//function loadplayer(core, playerID, gamecomponents) {
//
//	Api.getPlayerNumber(playerID).then(function(jsonresult){
//
//		//core.information.gameid = jsonresult.gameid;
//		//core.information.player = jsonresult.player;
//		loadedassets++;
//
//		//if (core.information.player == 1) {
//		//	core.information.enemyplayer = 2;
//		//} else {
//		//	core.information.enemyplayer = 1;
//		//}
//
//			// get game info
//			//getgameinfo(core);
//
//			// load the game cards
//			loadcards(core);
//
//	});
//
//}

//function getgameinfo(core) {
//
//	Api.getGameInfo(core.information.gameid).then(function(jsonresult){
//
//		core.information.player1ID = jsonresult.player1;
//		core.information.player2ID = jsonresult.player2;
//		core.information.starttime = jsonresult.starttime;
//
//		if (core.information.player == 1) {
//			core.information.playerID = core.information.player1ID;
//		} else {
//			core.information.playerID = core.information.player2ID;
//		}
//
//		loadedassets++;
//
//	});
//
//}

function loadprogress(core) {

	loadpercent = loadedassets / totalload * 100;

	if (loadpercent == 100) {

		core.information.loaded = true;

	}

}

function processCards (cards, core) {
	if(typeof cards !== 'object' || cards === null) return;

	if(!Array.isArray(cards)) {
		cards = [cards];
	}

	//console.log(core.sprites.icons);
	return cards.map(function (card) {
		card.back = core.sprites.icons.cardback;
		card.activated = 0;
		card.turns = 0;

		return card;
	});
}

//function loadcards(core) {
//
//	Api.getCards().then(function(result){
//
//		//core.information.loadedcards = 0;
//
//		//core.sprites.cards = result.map(function (card) {
//		//
//		//	card.back = core.sprites.cardback;
//		//	card.activated = 0;
//		//	card.turns = 0;
//		//	//card.asset = core.assets.cards[card.Refname];
//		//
//		//	return card;
//		//});
//		//getdeck(core);
//		//
//		for (var i = 0; i < core.assets.cards.length; i++) {
//
//			core.assets.cards[i].back = core.assets.cardback;
//			core.assets.cards[i].activated = 0;
//			core.assets.cards[i].turns = 0;
//			core.assets.card[i].asset = core.assets.cards[card.Refname]
//			core.assets.cards[i].asset = new Image();
//
//			core.assets.cards[i].asset.onload = function() {
//
//				loadedassets++;
//				core.information.loadedcards += 1;
//
//				// get the deck when the final card has loaded
//				if (core.information.loadedcards == core.assets.cards.length - 1) {
//
//					getdeck(core);
//
//				}
//
//
//			};
//
//			core.assets.cards[i].asset.src = core.assets.cards[i].Image;
//
//		}
//
//	});
//
//}

function getdeck(core) {

// temporarily give both players the same decks
	core.player1.deck = [];
	core.player2.deck = [];
	var counter = 0;
	console.log(core.assets.cards);
	for (var i = 0; i <= 60; i++) {
		var savedCard = core.assets.cards[counter];
		var card = {};
		card.cardID = savedCard.cardID;
		card.attack = savedCard.attack;
		card.defense = savedCard.defense;
		card.magicresist = savedCard.magicresist;
		card.armor = savedCard.armor;
		card.cost = savedCard.cost;
		card.type = savedCard.type;
		card.name = savedCard.name;
		card.asset = savedCard.asset;
		card.damagetype = savedCard.damagetype;
		card.refName = savedCard.refName;
		card.back = core.sprites.icons.cardback;
		card.activated = 0;
		card.turns = 0;
	
			if (counter != 7) {
				counter ++;
			} else {
				counter = 0;
			}

		core.player1.deck[i] = card;
		core.player2.deck[i] = card;
	}
	
	shuffledeck(core.player1.deck);
	shuffledeck(core.player2.deck);
	
	gethand(core, core.player1.deck);
	gethand(core, core.player2.deck);

}

function shuffledeck(deck) {

	for (var i = 0; i < 100; i++) {
	
		var deckslot1 = Math.floor(Math.random() * deck.length);
		var deckslot2 = Math.floor(Math.random() * deck.length);
		
		var val1 = deck[deckslot1];
		var val2 = deck[deckslot2];
		
		deck[deckslot1] = val2;
		deck[deckslot2] = val1;
	}

}

function gethand(core, deck) {

	var amount;

	if (core.information.player == 1) {
		amount = 3;
		core.player1.hand = [];
	} else {
		amount = 4;
		core.player2.hand = [];
	}
	
	for (var i = 0; i < amount; i++) {

		var topcard = deck.length - 1;
		
		if (core.information.player == 1) {
			console.log('Player 1 deck', deck[topcard]);
			core.player1.hand.push(deck[topcard]);
		} else {
			core.player2.hand.push(deck[topcard]);
		}
		deck.splice(topcard, 1);
	}
	
	//loadedassets++;
	
}

function boardprep(core) {
	
	// set the focus to the board
	core.information.focus = 'board';
	
	// set each board slot to equal no value
	core.board.s1 = '';
	core.board.s2 = '';
	core.board.s3 = '';
	core.board.s4 = '';
	core.board.s5 = '';
	core.board.s6 = '';
	core.board.s7 = '';
	core.board.s8 = '';
	core.board.s9 = '';
	core.board.s10 = '';
	core.board.s11 = '';
	core.board.s12 = '';
	core.board.s13 = '';
	core.board.s14 = '';
	core.board.s15 = '';
	core.board.s16 = '';
	core.board.s17 = '';
	core.board.s18 = '';
	core.board.s19 = '';
	core.board.s20 = '';
}

function setgold(core) {

	core.player1.gold = 10000003;
	core.player2.gold = 10000003;
	
	core.player1.goldincome = 1;
	core.player2.goldincome = 1;
	
	//loadedassets++;

}

function sethandamount(core) {
	
	core.player1.handlength = 3;
	core.player2.handlength = 4;
	
}

function settowers(core) {
	
	// player 1
	core.player1.currenttower = 1;
	core.player1.currentmaxhealth = 5;
	core.player1.currenthealth = 5;
	core.player1.tier1health = 5;
	core.player1.tier2health = 10;
	core.player1.tier3health = 15;
	core.player1.nexushealth = 20;
	
	// player 2
	core.player2.currenttower = 1;
	core.player2.currentmaxhealth = 5;
	core.player2.currenthealth = 5;
	core.player2.tier1health = 5;
	core.player2.tier2health = 10;
	core.player2.tier3health = 15;
	core.player2.nexushealth = 20;
	
	//loadedassets++;
	
}


//function componentsinfo(core) {
//
//	// player 1 back row
//	core.information.currentdrawnslot = 1;
//	drawSlot(core, core.board.s1, 10, 4.5, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 2;
//	drawSlot(core, core.board.s2, 26, 4.5, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 3;
//	drawSlot(core, core.board.s3, 42, 4.5, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 4;
//	drawSlot(core, core.board.s4, 58, 4.5, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 5;
//	drawSlot(core, core.board.s5, 74, 4.5, 'rgba(104, 155, 193, 0.4)');
//
//	// player 1 front row
//	core.information.currentdrawnslot = 6;
//	drawSlot(core, core.board.s6, 10, 20, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 7;
//	drawSlot(core, core.board.s7, 26, 20, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 8;
//	drawSlot(core, core.board.s8, 42, 20, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 9;
//	drawSlot(core, core.board.s9, 58, 20, 'rgba(104, 155, 193, 0.4)');
//
//	core.information.currentdrawnslot = 10;
//	drawSlot(core, core.board.s10, 74, 20, 'rgba(104, 155, 193, 0.4)');
//
//	// player 2 back row
//	core.information.currentdrawnslot = 11;
//	drawSlot(core, core.board.s11, 10, 82.5, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 12;
//	drawSlot(core, core.board.s12, 26, 82.5, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 13;
//	drawSlot(core, core.board.s13, 42, 82.5, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 14;
//	drawSlot(core, core.board.s14, 58, 82.5, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 15;
//	drawSlot(core, core.board.s15, 74, 82.5, 'rgba(235, 0, 0, 0.4)');
//
//	// player 2 front row
//	core.information.currentdrawnslot = 16;
//	drawSlot(core, core.board.s16, 10, 67, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 17;
//	drawSlot(core, core.board.s17, 26, 67, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 18;
//	drawSlot(core, core.board.s18, 42, 67, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 19;
//	drawSlot(core, core.board.s19, 58, 67, 'rgba(235, 0, 0, 0.4)');
//
//	core.information.currentdrawnslot = 20;
//	drawSlot(core, core.board.s20, 74, 67, 'rgba(235, 0, 0, 0.4)');
//
//}

//function loadsounds(core) {
//
//	core.sounds.tracks = [];
//
//	core.sounds.tracks[0] = new sound("Assets/Sounds/TheBoyWhoShatteredTime.mp3");
//	core.sounds.playcard = new sound("Assets/Sounds/spell2.wav");
//	core.sounds.attack = new sound("Assets/Sounds/roar.mp3");
//
//}