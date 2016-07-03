





function startTimer(core) {
	var info = core.information;
	//core.information.turn = 0;
	//core.information.turntimestart = 0;
	//core.information.turnlength = 10;

	core.socket.on('game:turnTimer:change', function (data) {
		console.log('game:turnTimer:change', data);
		info.turn = data.player;
		info.turnType = data.type;
		info.turntimestart = (Date.now() - data.start) / 1000;
		info.turnstart = data.start;
		info.turnLength = data.interval;
		window.time2 = false;
		addturnstoboardcards(core, data.player);
		resetturninfo(core);
	});
}

//function turntracker(core) {
//
//	changeturntime(core);
//
//	if (core.information.turn == 0 && core.information.turntimer == 0) {
//		core.information.turn = 1;
//		core.information.turntimestart = core.information.time;
//		core.information.turnlength = 45;
//	} else if (core.information.turn == 1 && core.information.turn == core.information.player && core.information.turntimer == 0) {
//		changeturn(core);
//	} else if (core.information.turn == 2 && core.information.turn == core.information.player && core.information.turntimer == 0) {
//		changeturn(core);
//	}
//
//}

function changeturntime(core) {
	var info = core.information;
	info.turntimer = info.turnlength - ((Date.now() - info.turnstart) / 1000);
	if(!window.time2) {
		window.time2 = true;
		console.log(Date.now() - info.turnstart, info.turnstart);
	}

	if (info.turntimer < 0) {
		info.turntimer = 0;
	}

}

function changeturn(core) {

	if (core.information.turn == 1) {
		core.information.turn = 2;
		addturnstoboardcards(core, 2);
		resetturninfo(core);
	} else if (core.information.turn == 2) {
		core.information.turn = 1;
		addturnstoboardcards(core, 1);
		resetturninfo(core);
	}

	core.information.turntimestart = core.information.time;
	core.information.turnlength = 45;

	var action = {};
	action.name = 'changeturn', action.sendingplayer = core.information.player, action.receivingplayer = core.information.enemyplayer, action.var1 = core.information.time;
	submitaction(core, action);

}

function defenseturn(core, starttime) {
	
	if (core.information.turn == 1) {
		core.information.turn = 4;
	} else {
		core.information.turn = 3;
	}
	
	// set endtime for resuming previous turn afterwards
	core.information.endtime = starttime;
	
	core.information.turntimestart = starttime;
	core.information.turnlength = 25;
	
}

function checkturn(core) {
	
	if (core.information.turn == core.information.player) {
		return true;
	} else {
		return false;
	}
	
}