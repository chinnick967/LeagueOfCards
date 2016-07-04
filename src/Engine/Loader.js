function setupPlayer(core) {
	//load deck
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

	core.player1.gold = 99;
	core.player2.gold = 99;
	
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