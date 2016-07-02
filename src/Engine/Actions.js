function checkactions(core) {
	core.socket.on('game:action:submit', handleGameActions);

	function handleGameActions (data) {
		console.log('handle game actions', data);

		//data.actions.forEach(function (action) {
			data.action.complete = 0;
			data.action.running = 0;
			core.actions.actionarray.push(data.action);
		//});
	}

//test
//	if (core.information.loaded == true) {
//		Api.checkActions(core.information.gameid, core.information.player).then(function(actions){
//
//			if (actions.length != 0) {
//
//				for (var i = 0; i < actions.length; i++) {
//
//					var actionobject = actions[i];
//
//					actionobject.complete = 0;
//					actionobject.running = 0;
//					core.actions.actionarray.push(actionobject);
//
//				}
//
//			}
//
//			setTimeout(function(){ checkactions(core); }, 100);
//
//		});
//
//	} else {
//
//		setTimeout(function(){ checkactions(core); }, 100);
//
//	}

}

function submitaction(core, action) {
	core.socket.emit('game:action:submit', {action:action});
	//Api.submitActions(core.information.gameid, action).then(function(result){
	//
	//	});
	//
	/*$.post( "Engine/ServerScripts/SubmitAction.php", {gameID: core.information.gameid, action: action}, function( result ) {
			console.log(result);
	});*/
	
}

/*

- Actions -

Drawn Card: var1 = player that drew card, var2 = number of cards drawn
Play Card: var1 = card id, var2 = board position

*/

function runactions(core) {
	
	for (var i = 0; i < core.actions.actionarray.length; i++) {
		
		// start an action if there are no currently running actions, starting with the first one not completed. Stop the for loop to prevent starting another action
		if (core.actions.actionarray[i].complete == 0 && core.actions.actionarray[i].running == 0) {
			// sort the actions to start the right one
			actionsorter(core, core.actions.actionarray[i], i);
			// stop for loop
			break;
			//i = core.actions.actionarray.length - 1;
			
		} else if (core.actions.actionarray[i].running == 1) {
			// stop for loop
			break;
		}
		
	}
	
}

function actionsorter(core, action, index) {
	//console.log (action);

	if (action.name == 'PlayCard') {
		//console.log (action);

		action_playcard(core, action, index);
		
	} else if (action.name == 'GoldAdjust') {
		
		action_goldadjust(core, action, index);
		
	} else if (action.name == 'HandAdjust') {
		
		action_handadjust(core, action, index);
		
	} else if (action.name == 'changeturn') {
		
		action_changeturn(core, action, index);
		
	} else if (action.name == 'Attack') {
		action_attack(core, action, index);
	}
	
}

function action_changeturn(core, action, index) {
	core.information.turn = action.turn;
	resetturninfo(core);
	addturnstoboardcards(core, action.turn);

	if (core.information.turn == 1) {
		core.information.turn = 2;
		addturnstoboardcards(core, 2);
		resetturninfo(core);
	} else if (core.information.turn == 2) {
		core.information.turn = 1;
		addturnstoboardcards(core, 1);
		resetturninfo(core);
	}
	
	core.information.turntimestart = action.var1;
	core.information.turnlength = 45;
	
	// complete action
	core.actions.actionarray[index].complete = 1;
	core.actions.actionarray[index].running = 0;
	
}

function action_playcard(core, action, index) {
	
	//var card = core.assets.cards[action.refName];

	var card = core.assets.cards.filter(function (card) {
		return card.refName === action.refName;
	})[0];
	console.log (card);

	//console.log(core.assets.cards);
	//alert();
	// add card to position on board
	setTimeout(function(){
		addtoboard(core, card, parseInt(action.var2));
	}, 500);
	
	// get board left and top for the animation and then play the animation
	getboardposition(core, parseInt(action.var2));
	addanimation(core, 'playcard', core.information.topposition - 15, core.information.leftposition - 6, var1 = 90, var2 = '', var3 = '');
	
	// complete action
	core.actions.actionarray[index].complete = 1;
	core.actions.actionarray[index].running = 0;
	
}

function action_goldadjust(core, action, index) {
	
	adjustgold(core, parseInt(action.var2), parseInt(action.var1));
	
	// complete action
	core.actions.actionarray[index].complete = 1;
	core.actions.actionarray[index].running = 0;
	
}

function action_handadjust(core, action, index) {
	
	if (parseInt(action.var2) == 1) {
		core.player1.handlength += parseInt(action.var1);
	} else {
		core.player2.handlength += parseInt(action.var1);
	}
	
	// complete action
	core.actions.actionarray[index].complete = 1;
	core.actions.actionarray[index].running = 0;
	
}

function action_attack(core, action, index) {
	
	// change to defense turn
	defenseturn(core, action.var6);
	
	for (var i = 0; i <= 4; i++) {
		if (action['var' + (i + 1)] != '' && typeof(action['var' + (i + 1)]) != 'undefined') {
			core.board['s' + action['var' + (i + 1)]].attacking = 1;
		}
	}
	
	generateshields(core);
	
	// complete action
	core.actions.actionarray[index].complete = 1;
	core.actions.actionarray[index].running = 0;
	
}