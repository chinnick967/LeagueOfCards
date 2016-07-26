function startTimer(core) {
	var info = core.information;

	socket.on('game:turnTimer:change', function (data) {

		// send defenders for defense turn before changing turn
		senddefenders(core);

		if (info.turnType == 'defense') {
			var defendflag = true;
		} else {
			var defendflag = false;
		}

		info.turn = data.player;
		info.turnType = data.type;
		info.turntimestart = (Date.now() - data.start) / 1000;
		info.turnstart = data.start;
		info.turnlength = data.interval;
		addturnstoboardcards(core, data.player);
		resetturninfo(core);
		turngold(core);
		addanimation(core, 'turn', 2, 43, var1 = core.information.turn, var2 = '', var3 = '');
		if (info.turnType !=' defense' && info.turnType != 'MULLIGAN' && defendflag == false) {
			// add card to the other player's hand
			if (core.information.player != info.turn) {
				if (core['player' + info.turn].handlength != 7) {
				core['player' + info.turn].handlength += 1;
				}
			}
			checkeffects(core, 'turnstart');
		}
		core.mechanics.target = '';

		if (core.information.turn == core.information.player && core.information.turnType == 'TURN') {
			addcardtohand(core, 1);
		}

	});
}

function changeturntime(core) {
	var info = core.information;
	info.turntimer = info.turnlength - ((Date.now() - info.turnstart) / 1000);

	if (info.turntimer < 0) {
		info.turntimer = 0;
	}

}

function defenseturn(core, starttime) {
	
	// if (core.information.turn == 1) {
	// 	core.information.turn = 4;
	// } else {
	// 	core.information.turn = 3;
	// }
	
	// set endtime for resuming previous turn afterwards
	// core.information.endtime = starttime;
	
	// core.information.turntimestart = starttime;
	// core.information.turnlength = 25;
	
}

function checkturn(core) {
	
	if (core.information.turn == core.information.player) {
		return true;
	} else {
		return false;
	}
	
}