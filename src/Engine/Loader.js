function setupPlayer(core) {

	// set the player gold amount
	setgold(core);

	// create effects
	createeffects(core);

	//load deck
	getdeck(core);
	// prepare the game board
	boardprep(core);

	//// load game sounds
	//loadsounds(core);

	// set players hands count
	sethandamount(core);

	// set the player's towers
	settowers(core);

	core.information.mulligans = 3;

	// create a graveyard array for each player
	core.player1.graveyard = [];
	core.player2.graveyard = [];

	core.mechanics.auras = [];
}

function processCards (cards, core) {
	if(typeof cards !== 'object' || cards === null) return;

	if(!Array.isArray(cards)) {
		cards = [cards];
	}

	return cards.map(function (card) {

		var copy = Object.assign({}, card);

		copy.back = core.sprites.icons.cardback;
		copy.activated = 0;
		copy.turns = 0;
		copy.maxhealth = card.defense;
		copy.cardID = card.cardID;
		copy.attack = card.attack;
		copy.defense = card.defense;
		copy.magicresist = card.magicresist;
		copy.armor = card.armor;
		copy.cost = card.cost;
		copy.type = card.type;
		copy.name = card.name;
		
		copy.damagetype = card.damagetype;
		copy.refName = card.refName;
		copy.back = core.sprites.icons.cardback;
		copy.activated = 0;
		copy.turns = 0;

		// lowercase name and delete space
		var imagename = card.name.toLowerCase();
		imagename = imagename.replace(/ /g,'');
		imagename = imagename.replace(/'/g, '');

		copy.asset = core.sprites['cards'][imagename];
		return copy;
	});
}

function getdeck(core) {

// temporarily give both players the same decks
	core.player1.deck = [];
	core.player2.deck = [];
	var counter = 0;

	var availablecards = [0, 7, 25, 9, 30, 6, 21, 37, 35, 36, 38, 16, 5, 24, 13, 28, 29, 11, 49, 44, 17, 3];

	for (var i = 0; i < 40; i++) {

		var rand;

		rand = Math.floor(Math.random() * availablecards.length);

		var card = Object.assign({}, core.assets.cards[availablecards[rand]]);

		//card.asset = savedCard.asset;
		//console.log(savedCard);
			if (counter != 39) {
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
			deck.pop();
		} else {
			core.player2.hand.push(deck[topcard]);
			deck.pop();
		}
		deck.splice(topcard, 1);
	}
	
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

	core.player1.gold = 10;
	core.player2.gold = 10;
	
	core.player1.goldincome = 1;
	core.player2.goldincome = 1;

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

}