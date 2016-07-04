function startTimer(core) {
	var info = core.information;

	core.socket.on('game:turnTimer:change', function (data) {
		info.turn = data.player;
		info.turnType = data.type;
		info.turntimestart = (Date.now() - data.start) / 1000;
		info.turnstart = data.start;
		info.turnlength = data.interval;
		addturnstoboardcards(core, data.player);
		resetturninfo(core);
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