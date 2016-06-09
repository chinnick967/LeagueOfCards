// global variable for games loading percentage
loadpercent = 0;
loadedassets = 0;
totalload = 0;

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
'Assets/fullscreen.png',
'Assets/magicresist.png',
'Assets/armor.png',
'Assets/towericon.png',
'Assets/inhibicon.png',
'Assets/goldicon2.png',
'Assets/goldstack.png',
'Assets/yellowcard.png'
];
// assets array plus one for loading the player information and plus 8 for loading cards plus 1 for each hand plus one for setting gold plus 1 for gameinfo/settings plus 1 for loading towers plus 1 for actions array
totalload += gamecomponents.length + 1 + 8 + 2 + 1 + 1 + 1 + 1;

	for (var i = 0; i < gamecomponents.length; i++) {
		
		var img = new Image();
		
		img.onload = function() {
			loadedassets++;
		}
		
		img.src = gamecomponents[i];
		
		addtoassets(core, i, img);
		
	}
	
	loadplayer(core, playerID, gamecomponents);
	
	// prepare the game board
	boardprep(core);
	
	// set the player gold amount
	setgold(core);
	
	// set players hands count
	sethandamount(core);
	
	// set the player's towers
	settowers(core);
	
	// actions array
	createactionsarray(core);
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
	if (current == 8) {core.assets.magicresist = img;}
	if (current == 9) {core.assets.armor = img;}
	if (current == 10) {core.assets.tower = img;}
	if (current == 11) {core.assets.nexus = img;}
	if (current == 12) {core.assets.gold = img;}
	if (current == 13) {core.assets.goldincome = img;}
	if (current == 14) {core.assets.cardsicon = img;}
	
}

function loadplayer(core, playerID, gamecomponents) {
	
	$.post('Engine/ServerScripts/GetPlayerNumber.php', {playerID: playerID}, function(result){
	
		jsonresult = JSON.parse(result);
		core.information.gameid = jsonresult.gameid;
		core.information.player = jsonresult.player;
		loadedassets++;
		
			// get game info
			getgameinfo(core);
			
			// load the game cards
			loadcards(core);
		
	});

}

function getgameinfo(core) {
	
	$.post('Engine/ServerScripts/GameInfo.php', {gameID: core.information.gameid}, function(result){
		
		jsonresult = JSON.parse(result);
		core.information.player1ID = jsonresult.player1;
		core.information.player2ID = jsonresult.player2;
		core.information.starttime = jsonresult.starttime;
		loadedassets++;
		
	});
	
}

function loadprogress(core) {

	loadpercent = loadedassets / totalload * 100;
	
	if (loadpercent == 100) {
	
		core.information.loaded = true;
	
	}

}

function loadcards(core) {

	$.get('Engine/ServerScripts/GetCards.php', function(result){
	
		core.information.loadedcards = 0;
	
		core.assets.cards = result.split('---');
		
		for (var i = 0; i < core.assets.cards.length - 1; i++) {
		
			core.assets.cards[i] = JSON.parse(core.assets.cards[i]);
			
			core.assets.cards[i].asset = new Image();
			
			core.assets.cards[i].asset.onload = function() {

				loadedassets++;
				core.information.loadedcards += 1;
				
				// get the deck when the final card has loaded
				if (core.information.loadedcards == core.assets.cards.length - 1) {
				
					getdeck(core);
				
				}
			
			}
			
			core.assets.cards[i].asset.src = core.assets.cards[i].Image;
			
		}
		
	});

}

function getdeck(core) {

// temporarily give both players the same decks
core.player1.deck = [];
core.player2.deck = [];

	var counter = 0;
	for (var i = 0; i <= 60; i++) {
	
		var card = {};
		card.cardID = core.assets.cards[counter].cardID;
		card.attack = core.assets.cards[counter].attack;
		card.defense = core.assets.cards[counter].defense;
		card.magicresist = core.assets.cards[counter].magicresist;
		card.armor = core.assets.cards[counter].armor;
		card.cost = core.assets.cards[counter].cost;
		card.type = core.assets.cards[counter].type;
		card.name = core.assets.cards[counter].name;
		card.asset = core.assets.cards[counter].asset;
		card.damagetype = core.assets.cards[counter].damagetype;
		
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
			core.player1.hand.push(deck[topcard]);
		} else {
			core.player2.hand.push(deck[topcard]);
		}
	
		deck.splice(topcard, 1);
	}
	
	loadedassets++;
	
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

	core.player1.gold = 3;
	core.player2.gold = 3;
	
	core.player1.goldincome = 1;
	core.player2.goldincome = 1;
	
	loadedassets++;

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
	
	loadedassets++;
	
}

function createactionsarray(core) {
	
	core.actions.actionarray = [];
	
	loadedassets++;
	
}