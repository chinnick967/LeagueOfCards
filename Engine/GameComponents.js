function drawComponents(core) {
	
	// draw the card slots
	drawCardSlots(core);
	drawHealthBars(core);
	drawTimer(core);
	drawHandIcon(core);
	drawPlayerIcons(core);
	drawSettingsIcon(core);
	drawHand(core);
	
}

function drawCardSlots(core) {
	
	// player 1 back row
	drawSlot(core, 10, 4.5, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 26, 4.5, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 42, 4.5, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 58, 4.5, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 74, 4.5, 'rgba(104, 155, 193, 0.4)');
	
	// player 1 front row
	drawSlot(core, 10, 20, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 26, 20, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 42, 20, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 58, 20, 'rgba(104, 155, 193, 0.4)');
	drawSlot(core, 74, 20, 'rgba(104, 155, 193, 0.4)');
	
	// player 1 back row
	drawSlot(core, 10, 82.5, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 26, 82.5, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 42, 82.5, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 58, 82.5, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 74, 82.5, 'rgba(235, 0, 0, 0.4)');
	
	// player 1 front row
	drawSlot(core, 10, 67, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 26, 67, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 42, 67, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 58, 67, 'rgba(235, 0, 0, 0.4)');
	drawSlot(core, 74, 67, 'rgba(235, 0, 0, 0.4)');
	
	
}

function drawSlot(core, top, left, color) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");
	
	ctx.shadowColor = 'black';
	ctx.shadowBlur = 5;
	ctx.fillStyle = color;
	ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14);
	
	// hover effect
	
	if (core.information.xoffset >= left && core.information.xoffset <= left + 13 && core.information.yoffset >= top && core.information.yoffset <= top + 14) {
		
		ctx.shadowBlur = 15;
		ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14);
		ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14);
		ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14);
		
	}
	
}

function drawHealthBars(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	ctx.shadowColor = 'white';
	ctx.shadowBlur = 0;

	// blue side health bar
	ctx.fillStyle = 'black';
	ctx.fillRect(core.information.pwidth * 7.5, core.information.pheight * 3.6, core.information.pwidth * 24.4, core.information.pheight * 2.1);
	ctx.fillStyle = 'rgba(78, 144, 254, 0.4)';
	ctx.fillRect(core.information.pwidth * 7.7, core.information.pheight * 3.8, core.information.pwidth * 24, core.information.pheight * 1.7);
	ctx.fillStyle = 'rgba(78, 144, 254, 0.8)';
	ctx.shadowBlur = 2;
	ctx.fillRect(core.information.pwidth * 7.7, core.information.pheight * 3.8, core.information.pwidth * 21, core.information.pheight * 1.7);

	ctx.shadowBlur = 0;
	// red side health bar
	ctx.fillStyle = 'black';
	ctx.fillRect(core.information.pwidth * 68.1, core.information.pheight * 3.6, core.information.pwidth * 24.4, core.information.pheight * 2.1);
	ctx.fillStyle = 'rgba(220, 0, 41, 0.4)';
	ctx.fillRect(core.information.pwidth * 68.3, core.information.pheight * 3.8, core.information.pwidth * 24, core.information.pheight * 1.7);
	ctx.fillStyle = 'rgba(220, 0, 41, 0.8)';
	ctx.shadowBlur = 2;
	ctx.fillRect(core.information.pwidth * 68.3, core.information.pheight * 3.8, core.information.pwidth * 11, core.information.pheight * 1.7);

}

function drawTimer(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	ctx.shadowBlur = 0;
	ctx.drawImage(core.assets.bluetimer, core.information.pwidth * 42.5, 0, core.information.pwidth * 15, core.information.pheight * 22);
	
}

function drawHandIcon(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	if (typeof(core.information.threecardstop) == 'undefined') {
			
			core.information.threecardstop = 87;

		}
		
		ctx.drawImage(core.assets.threecards, core.information.pwidth * 45, core.information.pheight * core.information.threecardstop, core.information.pwidth * 10, core.information.pheight * 16);
		
		if (core.information.threecardstop == 87) {
			
			core.information.threecardstopflag = true;
			
		} else if (core.information.threecardstop >= 90) {
			
			core.information.threecardstopflag = false;
			
		}
		
		if (core.information.threecardstopflag == true) {
			
			core.information.threecardstop += .1;
			
		}
		
		else if (core.information.threecardstopflag == false) {
			
			core.information.threecardstop -= .1;
			
		}
	
}

function drawPlayerIcons(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	ctx.drawImage(core.player1.icon, core.information.pwidth * 2, core.information.pheight * 1, core.information.pwidth * 4, core.information.pheight * 7);
	ctx.drawImage(core.player2.icon, core.information.pwidth * 94, core.information.pheight * 1, core.information.pwidth * 4, core.information.pheight * 7);
	
}

function drawSettingsIcon(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

ctx.shadowColor = 'black';	
ctx.shadowBlur = 5;
ctx.drawImage(core.assets.settings, core.information.pwidth * 91, core.information.pheight * 93, core.information.pwidth * 3.5, core.information.pheight * 6);
ctx.drawImage(core.assets.fullscreen, core.information.pwidth * 95.5, core.information.pheight * 93, core.information.pwidth * 3.5, core.information.pheight * 6);
	
}

function drawHand(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

		
	
}