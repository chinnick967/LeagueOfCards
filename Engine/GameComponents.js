function drawComponents(core) {
	
	// draw the card slots
	drawstats(core);
	drawCardSlots(core);
	drawHealthBars(core);
	drawTimer(core);
	drawHandIcon(core);
	drawPlayerIcons(core);
	drawSettingsIcon(core);
	drawButtons(core);
	drawboard(core);
	drawnames(core);
	
	settime(core);

}

function drawCardSlots(core) {

	// reset the current hovered slot
	core.information.currentslothover = 0;
	
	// player 1 back row
	core.information.currentdrawnslot = 1;
	drawSlot(core, core.board.s1, 10, 4.5, 'rgba(104, 155, 193, 0.4)');

	core.information.currentdrawnslot = 2;
	drawSlot(core, core.board.s2, 26, 4.5, 'rgba(104, 155, 193, 0.4)');

	core.information.currentdrawnslot = 3;
	drawSlot(core, core.board.s3, 42, 4.5, 'rgba(104, 155, 193, 0.4)');
	
	core.information.currentdrawnslot = 4;
	drawSlot(core, core.board.s4, 58, 4.5, 'rgba(104, 155, 193, 0.4)');

	core.information.currentdrawnslot = 5;
	drawSlot(core, core.board.s5, 74, 4.5, 'rgba(104, 155, 193, 0.4)');
	
	// player 1 front row
	core.information.currentdrawnslot = 6;
	drawSlot(core, core.board.s6, 10, 20, 'rgba(104, 155, 193, 0.4)');
	
	core.information.currentdrawnslot = 7;
	drawSlot(core, core.board.s7, 26, 20, 'rgba(104, 155, 193, 0.4)');
	
	core.information.currentdrawnslot = 8;
	drawSlot(core, core.board.s8, 42, 20, 'rgba(104, 155, 193, 0.4)');
	
	core.information.currentdrawnslot = 9;
	drawSlot(core, core.board.s9, 58, 20, 'rgba(104, 155, 193, 0.4)');
	
	core.information.currentdrawnslot = 10;
	drawSlot(core, core.board.s10, 74, 20, 'rgba(104, 155, 193, 0.4)');
	
	// player 2 back row
	core.information.currentdrawnslot = 11;
	drawSlot(core, core.board.s11, 10, 82.5, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 12;
	drawSlot(core, core.board.s12, 26, 82.5, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 13;
	drawSlot(core, core.board.s13, 42, 82.5, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 14;
	drawSlot(core, core.board.s14, 58, 82.5, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 15;
	drawSlot(core, core.board.s15, 74, 82.5, 'rgba(235, 0, 0, 0.4)');
	
	// player 2 front row
	core.information.currentdrawnslot = 16;
	drawSlot(core, core.board.s16, 10, 67, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 17;
	drawSlot(core, core.board.s17, 26, 67, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 18;
	drawSlot(core, core.board.s18, 42, 67, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 19;
	drawSlot(core, core.board.s19, 58, 67, 'rgba(235, 0, 0, 0.4)');
	
	core.information.currentdrawnslot = 20;
	drawSlot(core, core.board.s20, 74, 67, 'rgba(235, 0, 0, 0.4)');
	
	
	
}

function drawSlot(core, boardslot, top, left, color) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

        if (typeof(boardslot) == 'undefined' || boardslot == '') {
	
	ctx.shadowColor = 'black';
	ctx.shadowBlur = 5;
	ctx.fillStyle = color;
	ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14.5);

        }
	
	// hover effect
	
	if (core.information.xoffset >= left && core.information.xoffset <= left + 13 && core.information.yoffset >= top && core.information.yoffset <= top + 14.5 && core.information.focus == 'board') {
		if (typeof(boardslot) == 'undefined' || boardslot == '') {
		ctx.shadowBlur = 15;
		ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14.5);
		ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14.5);
		ctx.fillRect(core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * 13, core.information.pheight * 14.5);
                }
		core.information.currentslothover = core.information.currentdrawnslot;
		
	}
	
}

function drawHealthBars(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

var percentage = 0;
var healthwidth = 0;

	ctx.shadowColor = 'white';
	ctx.shadowBlur = 0;
	
	// get width of healthbar
	percentage = core.player1.currenthealth / core.player1.currentmaxhealth;
	healthwidth = 24 * percentage;

	// blue side health bar
	ctx.fillStyle = 'black';
	ctx.fillRect(core.information.pwidth * 7.5, core.information.pheight * 3.6, core.information.pwidth * 24.4, core.information.pheight * 2.1);
	ctx.fillStyle = 'rgba(78, 144, 254, 0.4)';
	ctx.fillRect(core.information.pwidth * 7.7, core.information.pheight * 3.8, core.information.pwidth * 24, core.information.pheight * 1.7);
	ctx.fillStyle = 'rgba(78, 144, 254, 0.8)';
	ctx.shadowBlur = 2;
	ctx.fillRect(core.information.pwidth * 7.7, core.information.pheight * 3.8, core.information.pwidth * healthwidth, core.information.pheight * 1.7);
	
	// get width of healthbar
	percentage = core.player2.currenthealth / core.player2.currentmaxhealth;
	healthwidth = 24 * percentage;

	ctx.shadowBlur = 0;
	// red side health bar
	ctx.fillStyle = 'black';
	ctx.fillRect(core.information.pwidth * 68.1, core.information.pheight * 3.6, core.information.pwidth * 24.4, core.information.pheight * 2.1);
	ctx.fillStyle = 'rgba(220, 0, 41, 0.4)';
	ctx.fillRect(core.information.pwidth * 68.3, core.information.pheight * 3.8, core.information.pwidth * 24, core.information.pheight * 1.7);
	ctx.fillStyle = 'rgba(220, 0, 41, 0.8)';
	ctx.shadowBlur = 2;
	ctx.fillRect(core.information.pwidth * 68.3, core.information.pheight * 3.8, core.information.pwidth * healthwidth, core.information.pheight * 1.7);
	
	// draw health text
	var healthtext1 = core.player1.currenthealth + '/' + core.player1.currentmaxhealth;
	var healthtext2 = core.player2.currenthealth + '/' + core.player2.currentmaxhealth;
	
	ctx.fillStyle = 'white';
	ctx.font = core.information.pwidth * 1 + "px myFont";
	
	var adjust = ctx.measureText(healthtext1).width / 2;
	ctx.fillText(healthtext1, core.information.pwidth * 19.5 - adjust, core.information.pheight * 5.25);
	
	adjust = ctx.measureText(healthtext2).width / 2;
	ctx.fillText(healthtext2, core.information.pwidth * 80.5 - adjust, core.information.pheight * 5.25);

}

function drawTimer(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	ctx.shadowBlur = 0;
	
	// timer background
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.beginPath();
	ctx.arc(core.information.pwidth * 50, core.information.pheight * 11.3, core.information.pwidth * 4.3, 0, 2 * Math.PI);
	ctx.fill();
	
	ctx.shadowColor = 'black';
	ctx.shadowBlur = 20;
	
	if (core.information.turn == 1 || core.information.turn == 0) {
		ctx.drawImage(core.assets.bluetimer, core.information.pwidth * 42.5, 0, core.information.pwidth * 15, core.information.pheight * 22);
	} else {
		ctx.drawImage(core.assets.redtimer, core.information.pwidth * 42.5, 0, core.information.pwidth * 15, core.information.pheight * 22);
	}
	ctx.shadowBlur = 0;
	
	// timer background
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.beginPath();
	ctx.arc(core.information.pwidth * 50, core.information.pheight * 11.3, core.information.pwidth * 4.3, 0, 2 * Math.PI);
	ctx.fill();
	
	ctx.shadowColor = 'black';
	ctx.shadowBlur = 20;
	
	if (core.information.turn == 1 || core.information.turn == 0) {
		ctx.drawImage(core.assets.bluetimer, core.information.pwidth * 42.5, 0, core.information.pwidth * 15, core.information.pheight * 22);
	} else if (core.information.turn == 2) {
		ctx.drawImage(core.assets.redtimer, core.information.pwidth * 42.5, 0, core.information.pwidth * 15, core.information.pheight * 22);
	}
	ctx.shadowBlur = 0;

	ctx.globalAlpha = .7;
	// set the font values
	ctx.fillStyle = 'white';
	ctx.font = core.information.pwidth * 4 + "px comicFont";

	// measure text length
	var textlength = ctx.measureText(parseInt(core.information.turntimer)).width;
	
	// draw the timer text
	ctx.fillText(parseInt(core.information.turntimer), core.information.pwidth * 49.6 - textlength / 2, core.information.pheight * 14.5);

	ctx.globalAlpha = 1;
}

function drawHandIcon(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	if (typeof(core.information.threecardstop) == 'undefined') {
			
			core.information.threecardstop = 87;

		}
		
		if (core.information.focus != 'hand') {
		
		ctx.drawImage(core.assets.threecards, core.information.pwidth * 45, core.information.pheight * core.information.threecardstop, core.information.pwidth * 10, core.information.pheight * 16);
		
		}
		
		if (core.information.threecardstop == 87) {
			
			core.information.threecardstopflag = true;
			
		} else if (core.information.threecardstop >= 90) {
			
			core.information.threecardstopflag = false;
			
		}
		
		if (core.information.threecardstopflag == true) {
			
			core.information.threecardstop += .05;
			
		}
		
		else if (core.information.threecardstopflag == false) {
			
			core.information.threecardstop -= .05;
			
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

function drawButtons(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	// End Turn Button
	ctx.shadowBlur = 5;
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = '#862D63';
	ctx.fillRect(core.information.pwidth * 79, core.information.pheight * 92.5, core.information.pwidth * 10, core.information.pheight * 6);
	ctx.shadowBlur = 5;
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#897BAF';
	ctx.font= core.information.pwidth * 2 + "px lifecraft";
	ctx.fillText("End Turn", core.information.pwidth * 80.8, core.information.pheight * 96.8);
	ctx.fillText("End Turn", core.information.pwidth * 80.8, core.information.pheight * 96.8);
	ctx.fillText("End Turn", core.information.pwidth * 80.8, core.information.pheight * 96.8);
	
	// Surrender Button
	ctx.shadowBlur = 5;
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = '#862D63';
	ctx.fillRect(core.information.pwidth * 67, core.information.pheight * 92.5, core.information.pwidth * 10, core.information.pheight * 6);
	ctx.globalAlpha = 1;
	ctx.shadowBlur = 5;
	ctx.fillStyle = '#897BAF';
	ctx.font= core.information.pwidth * 2 + "px lifecraft";
	ctx.fillText("Surrender", core.information.pwidth * 68.3, core.information.pheight * 96.7);
	ctx.fillText("Surrender", core.information.pwidth * 68.3, core.information.pheight * 96.7);
	ctx.fillText("Surrender", core.information.pwidth * 68.3, core.information.pheight * 96.7);

}

function drawboard(core) {

var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

var counter = 1;

	for (var key in core.board) {
	  if (core.board.hasOwnProperty(key)) {
	  	if (core.board[key] != '') {
	  		ctx.save();
	  		if (key == 's1') {
					if (core.information.currentslothover == 1) {
						ctx.shadowColor = 'white';
						ctx.shadowBlur = 15;
					}
					if (core.board.s1.type == 'Spell' && core.board.s1.activated == 0) {
						drawcardback(core, core.board.s1, 6.6, 5.5, 8.7, 23.142, 90);
					} else {
						drawcard(core, core.board.s1, 8.7, 6.6, 5.5, 90, 0);
					}
	    		} else if (key == 's2') {
                                if (core.information.currentslothover == 2) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s2.type == 'Spell' && core.board.s2.activated == 0) {
									drawcardback(core, core.board.s2, 6.6, 21.5, 8.7, 23.142, 90);
								} else {
									drawcard(core, core.board.s2, 8.7, 6.6, 21.5, 90, 0);
								}
	    		} else if (key == 's3') {
                                if (core.information.currentslothover == 3) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s3.type == 'Spell' && core.board.s3.activated == 0) {
									drawcardback(core, core.board.s3, 6.6, 37.5, 8.7, 23.142, 90);
								} else {
									drawcard(core, core.board.s3, 8.7, 6.6, 37.5, 90, 0);
								}
	    		} else if (key == 's4') {
                                if (core.information.currentslothover == 4) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s4.type == 'Spell' && core.board.s4.activated == 0) {
									drawcardback(core, core.board.s4, 6.6, 53.5, 8.7, 23.142, 90);
								} else {
									drawcard(core, core.board.s4, 8.7, 6.6, 53.5, 90, 0);
								}
	    		} else if (key == 's5') {
                                if (core.information.currentslothover == 5) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s5.type == 'Spell' && core.board.s5.activated == 0) {
									drawcardback(core, core.board.s5, 6.6, 69.5, 8.7, 23.142, 90);
								} else {
									drawcard(core, core.board.s5, 8.7, 6.6, 69.5, 90, 0);
								}
	    		} else if (key == 's6') {
                                if (core.information.currentslothover == 6) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s6, 8.7, 22.1, 5.5, 90, 0);
	    		} else if (key == 's7') {
                                if (core.information.currentslothover == 7) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s7, 8.7, 22.1, 21.5, 90, 0);
	    		} else if (key == 's8') {
                                if (core.information.currentslothover == 8) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s8, 8.7, 22.1, 37.5, 90, 0);
	    		} else if (key == 's9') {
                                if (core.information.currentslothover == 9) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s9, 8.7, 22.1, 53.5, 90, 0);
	    		} else if (key == 's10') {
                                if (core.information.currentslothover == 10) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s10, 8.7, 22.1, 69.5, 90, 0);
	    		} else if (key == 's11') {
                                if (core.information.currentslothover == 11) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s11.type == 'Spell' && core.board.s11.activated == 0) {
									drawcardback(core, core.board.s11, 84.7, 5.5, 8.7, 23.142, -90);
								} else {
									drawcard(core, core.board.s11, 8.7, 84.7, 5.5, -90, 0);
								}
	    		} else if (key == 's12') {
                                if (core.information.currentslothover == 12) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s12.type == 'Spell' && core.board.s12.activated == 0) {
									drawcardback(core, core.board.s12, 84.7, 21.5, 8.7, 23.142, -90);
								} else {
									drawcard(core, core.board.s12, 8.7, 84.7, 21.5, -90, 0);
								}
	    		} else if (key == 's13') {
                                if (core.information.currentslothover == 13) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s13.type == 'Spell' && core.board.s13.activated == 0) {
									drawcardback(core, core.board.s13, 84.7, 37.5, 8.7, 23.142, -90);
								} else {
									drawcard(core, core.board.s13, 8.7, 84.7, 37.5, -90, 0);
								}
	    		} else if (key == 's14') {
                                if (core.information.currentslothover == 14) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s14.type == 'Spell' && core.board.s14.activated == 0) {
									drawcardback(core, core.board.s14, 84.7, 53.5, 8.7, 23.142, -90);
								} else {
									drawcard(core, core.board.s14, 8.7, 84.7, 53.5, -90, 0);
								}
	    		} else if (key == 's15') {
                                if (core.information.currentslothover == 15) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								if (core.board.s15.type == 'Spell' && core.board.s15.activated == 0) {
									drawcardback(core, core.board.s15, 84.7, 69.5, 8.7, 23.142, -90);
								} else {
									drawcard(core, core.board.s15, 8.7, 84.7, 69.5, -90, 0);
								}
	    		} else if (key == 's16') {
                                if (core.information.currentslothover == 16) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
								drawcard(core, core.board.s16, 8.7, 69.2, 5.5, -90, 0);
								
	    		} else if (key == 's17') {
                                if (core.information.currentslothover == 17) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s17, 8.7, 69.2, 21.5, -90, 0);
	    		} else if (key == 's18') {
                                if (core.information.currentslothover == 18) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s18, 8.7, 69.2, 37.5, -90, 0);
	    		} else if (key == 's19') {
                                if (core.information.currentslothover == 19) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s19, 8.7, 69.2, 53.5, -90, 0);
	    		} else if (key == 's20') {
                                if (core.information.currentslothover == 20) {
                                    ctx.shadowColor = 'white';
                                    ctx.shadowBlur = 15;
                                }
	    			drawcard(core, core.board.s20, 8.7, 69.2, 69.5, -90, 0);
	    		}
                        ctx.restore();
	    	}
	  }
	}
	
	previewboardcard(core);

}

function drawstats(core) {

var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");
	// stat container
	ctx.beginPath();
	ctx.moveTo(core.information.pwidth * 34, core.information.pheight * 11);
	ctx.lineTo(core.information.pwidth * 45.2, core.information.pheight * 11);
	ctx.arcTo(core.information.pwidth * 45.2, core.information.pheight * 2.84, core.information.pwidth * 50, core.information.pheight * 2.84, 47);
	ctx.arcTo(core.information.pwidth * 54.8, core.information.pheight * 2.84, core.information.pwidth * 54.8, core.information.pheight * 11, 47);
	ctx.lineTo(core.information.pwidth * 66, core.information.pheight * 11);
	ctx.lineTo(core.information.pwidth * 66, core.information.pheight * 1);
	ctx.lineTo(core.information.pwidth * 34, core.information.pheight * 1);
	ctx.closePath();
	
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(94, 141, 113, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();

	drawtowers(core);
	drawstaticons(core);
	drawstatnumbers(core);

}

function drawtowers(core) {

var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	checkcurrenttower(core);
	
	if (core.player1.currenttower > 1) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.tower, core.information.pwidth * 35.5, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;
	
	if (core.player1.currenttower > 2) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.tower, core.information.pwidth * 37.5, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;
	
	if (core.player1.currenttower > 3) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.tower, core.information.pwidth * 39.5, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;
	
	if (core.player1.currenttower > 4) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.nexus, core.information.pwidth * 42, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;
	
	if (core.player2.currenttower > 1) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.tower, core.information.pwidth * 62.5, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;
	
	if (core.player2.currenttower > 2) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.tower, core.information.pwidth * 60.5, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;

	if (core.player2.currenttower > 3) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.tower, core.information.pwidth * 58.5, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;
	
	if (core.player2.currenttower > 4) {
		ctx.globalAlpha = .4;
	}
	ctx.drawImage(core.assets.nexus, core.information.pwidth * 56, core.information.pheight * 7, core.information.pwidth * 2, core.information.pheight * 3.5);
	ctx.globalAlpha = 1;

}

function drawstaticons(core) {

var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	//ctx.drawImage(core.assets.gold, core.information.pwidth * 34.3, core.information.pheight * 2.5, core.information.pwidth * 2, core.information.pheight * 3.5);
	//ctx.drawImage(core.assets.goldincome, core.information.pwidth * 38, core.information.pheight * 2.5, core.information.pwidth * 1.5, core.information.pheight * 2.8);
        //ctx.drawImage(core.assets.cardsicon, core.information.pwidth * 41.5, core.information.pheight * 2.3, core.information.pwidth * 1.2, core.information.pheight * 3.3);
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 1;

        /*ctx.strokeStyle = 'rgba(215, 227, 44, 0.6)';
        ctx.beginPath();
        ctx.arc(core.information.pwidth * 36, core.information.pheight * 4, core.information.pwidth * 1.2, 0, 2 * Math.PI);
		ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'rgba(116, 227, 173, 0.6)';
        ctx.beginPath();
        ctx.arc(core.information.pwidth * 39, core.information.pheight * 4, core.information.pwidth * 1.2, 0, 2 * Math.PI);
		ctx.fill();
        ctx.stroke(); */

        ctx.strokeStyle = 'rgba(237, 35, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(core.information.pwidth * 44, core.information.pheight * 4, core.information.pwidth * 1.2, 0, 2 * Math.PI);
		ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'rgba(237, 35, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(core.information.pwidth * 64, core.information.pheight * 4, core.information.pwidth * 1.2, 0, 2 * Math.PI);
		ctx.fill();
        ctx.stroke();

        /* ctx.strokeStyle = 'rgba(116, 227, 173, 0.6)';
        ctx.beginPath();
        ctx.arc(core.information.pwidth * 61, core.information.pheight * 4, core.information.pwidth * 1.2, 0, 2 * Math.PI);
		ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'rgba(237, 35, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(core.information.pwidth * 56, core.information.pheight * 4, core.information.pwidth * 1.2, 0, 2 * Math.PI);
		ctx.fill();
        ctx.stroke(); */

}

function drawstatnumbers(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");
		// variable to track text length of stats
		var slength;

		ctx.fillStyle = 'white';

		ctx.font= core.information.pwidth * 1.4 + "px lifecraft";
		
		// player 1 stats
		ctx.fillText(core.player1.gold, core.information.pwidth * 36.5, core.information.pheight * 4.88);
		
		ctx.fillText(core.player1.goldincome, core.information.pwidth * 40.7, core.information.pheight * 4.88);
		
		slength = ctx.measureText(core.player1.handlength).width / 2;
		ctx.fillText(core.player1.handlength, core.information.pwidth * 44 - slength, core.information.pheight * 4.88);
		
		// player 2 stats
		ctx.fillText(core.player2.gold, core.information.pwidth * 56.5, core.information.pheight * 4.88);
		
		ctx.fillText(core.player2.goldincome, core.information.pwidth * 60.7, core.information.pheight * 4.88);
		
		slength = ctx.measureText(core.player2.handlength).width / 2;
		ctx.fillText(core.player2.handlength, core.information.pwidth * 64 - slength, core.information.pheight * 4.88);
	
}

function drawnames(core) {
	
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext("2d");

	var name1 = core.information.player1ID;
	var name2 = core.information.player2ID;
	
	ctx.globalAlpha = .8;
	
		// player 1 name
		ctx.fillStyle = 'white';
		ctx.font= core.information.pwidth * 1.8 + "px myFont";
		var name1adjust = ctx.measureText(name1).width / 2;
		ctx.fillText(name1, core.information.pwidth * 19.5 - name1adjust, core.information.pheight * 3);
		
		// player 2 name
		// player 1 name
		ctx.fillStyle = 'white';

		ctx.font= core.information.pwidth * 1.8 + "px myFont";
		var name2adjust = ctx.measureText(name2).width / 2;
		ctx.fillText(name2, core.information.pwidth * 80.5 - name2adjust, core.information.pheight * 3);
		
	ctx.globalAlpha = 1;
}

function settime(core) {
	
	var date = new Date();
	// time is UTC from start of game to current UTC, javascript date converted to seconds instead of milliseconds
	var time = date.getTime() / 1000 - core.information.starttime;
	time = time.toFixed(2);
	
	core.information.time = time;
	
}