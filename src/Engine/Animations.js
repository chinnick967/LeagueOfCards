function drawanimations(core) {

	for (var i = 0; i < core.animation.length; i++) {
		
		if (core.animation[i].complete == 0) {
			
			animationselector(core, core.animation[i], i);
			
		}
		
	}

}

function animationselector(core, animation, index) {
	
	if (animation.type == 'cardhealth') {
		cardhealthanimation(core, animation, index);
	} else if (animation.type == 'playcard') {
		playcardanimation(core, animation, index);
	} else if (animation.type == 'goldcoin') {
		infinitegoldcoinanimation(core, animation, index);
	} else if (animation.type == 'silvercoin') {
		infinitesilvercoinanimation(core, animation, index);
	} else if (animation.type == 'attack') {
		attackanimation(core, animation, index);
	} else if (animation.type == 'turn') {
		turnanimation(core, animation, index);
	} else if (animation.type == 'drawcard') {
		drawanimation(core, animation, index);
	} else if (animation.type == 'flipcard') {
		cardflipanimation(core, animation, index);
	} else if (animation.type == 'goldincome') {
		goldincomeanimation(core, animation, index);
	} else if (animation.type == 'addgold') {
		addgoldanimation(core, animation, index);
	} else if (animation.type == 'heal') {
		healanimation(core, animation, index);
	} else if (animation.type == 'destroy') {
		destroycardanimation(core, animation, index);
	} else if (animation.type == 'destroytower') {
		destroytoweranimation(core, animation, index);
	} else if (animation.type == 'towerattack') {
		towerattackanimation(core, animation, index);
	} else if (animation.type == 'attackhover') {
		attackhover(core, animation, index);
	} else if (animation.type =='attacking') {
		attackflamesanimation(core, animation, index);
	}

}

function addanimation(core, type, top, left, var1 = 'none', var2 = 'none', var3 = 'none') {
	
	// new animation json
	var animation = {};
	
	// set animation values
	animation.starttime = core.information.time;
	animation.complete = 0;
	animation.type = type;
	animation.top = top;
	animation.left = left;
	animation.var1 = var1;
	animation.var2 = var2;
	animation.var3 = var3;
	
	// add animation to array
	core.animation.push(animation);
	
}

function drawanimation(core, animation, index) {

	var player = animation.var1;
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .4;

	if (typeof(animation.firstrun) == 'undefined') {
		var rand = Math.floor((Math.random() * 3) + 1);

		if (rand == 1) {
			animation.card = core.sprites.icons.bluecard;
		} else if (rand == 2) {
			animation.card = core.sprites.icons.redcard;
		} else {
			animation.card = core.sprites.icons.yellowcard;
		}

		core.sounds.drawcard.play();

		animation.firstrun = 1;

	}

	if (time <= .4) {
		if (player == 1) {
			var x = 38 + (time * 16);
			var y = 77 + (time * 27);
		} else {
			var x = 59.5 - (time * 16);
			var y = 77 + (time * 27);
		}

		ctx.save();
		ctx.globalAlpha = 1 - (time * 2);
		utils.drawImage(ctx, animation.card, core.information.pwidth * x, core.information.pheight * y, core.information.pwidth * 2.5, core.information.pheight * 7);
		ctx.restore();
	}

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}
}

function turnanimation(core, animation, index) {

	var turn = animation.var1;
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .25;

	ctx.save();

	if (turn == 1) {
		ctx.strokeStyle = '#38b4fd';
		ctx.shadowColor = '#38b4fd';
	} else if (turn == 2) {
		ctx.strokeStyle = '#993939';
		ctx.shadowColor = '#993939';
	}

	var radius = .3 + (time * 16);

	ctx.shadowBlur = 5; 
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.arc(core.information.pwidth * 50, core.information.pheight * 11.3, core.information.pwidth * radius, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.restore();

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

function attackhover(core, animation, index) {

	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .25;

	if (time > .25) {
		time = .25;
	}

	ctx.save();

	var radius = .3 + (time * 16);

	ctx.shadowBlur = 5; 
	ctx.shadowColor = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(core.information.pwidth * 50, core.information.pheight * 27, core.information.pwidth * radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fill();
	ctx.strokeStyle = 'rgba(94, 141, 113, 0.9)';
	ctx.shadowColor = '#993939';
	ctx.stroke();

	ctx.restore();

	if (!(core.information.xoffset >= 46.5 && core.information.xoffset <= 55.5 && core.information.yoffset >= 23 && core.information.yoffset <= 35.5) || core.information.turn != core.information.player) {
		core.animation[index].complete = 1;
	}

}

function cardhealthanimation(core, animation, index) {
	
	var amount = animation.var1;
	
	// current animation time
	var time = core.information.time - animation.starttime;
	
	// set settings based off plus or minus
	if (animation.var1 < 0) {
		ctx.fillStyle = '#A11A1A';
	} else if (animation.var1 >0) {
		ctx.fillStyle = '#53A72F';
	} else {
		ctx.fillStyle = '#323776';
	}
	// set the font
	ctx.font = core.information.pwidth * 3 + "px lifecraft";
	
	ctx.save();
	ctx.globalAlpha = 1 - time;

	if (animation.var2 == 'right') {
		ctx.fillText(amount, core.information.pwidth * (animation.left + (time * 5)), core.information.pheight * animation.top);
	} else if (animation.var2 == 'left') {
		ctx.fillText(amount, core.information.pwidth * (animation.left - (time * 5)), core.information.pheight * animation.top);
	}
	
	if (time >= 1) {		
		core.animation[index].complete = 1;		
	}
	
	ctx.restore();
	
}

function destroycardanimation(core, animation, index) {
	var time = core.information.time - animation.starttime;
	animation.animationlength = 1;
	
	getboardposition(core, animation.var1);
	animation.left = core.information.leftposition - 1.3;
	animation.top = core.information.topposition - 4.8;

	if (animation.firstrun != 1) {
		core.sounds.destroycard.play();
	}

	animation.firstrun = 1;
	
	deathsprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}
}

function destroytoweranimation(core, animation, index) {
	var time = core.information.time - animation.starttime;
	animation.animationlength = 1.5;

	if (animation.var1 == 2) {
		if (animation.var2 == 1) {
			animation.left = 61.1;
		} else if (animation.var2 == 2) {
			animation.left = 59.1;
		} if (animation.var2 == 3) {
			animation.left = 57.1;
		}
	} else if (animation.var1 == 1) {
		if (animation.var2 == 1) {
			animation.left = 34.1;
		} else if (animation.var2 == 2) {
			animation.left = 36.1;
		} if (animation.var2 == 3) {
			animation.left = 38.1;
		}
	}

	if (animation.firstrun != 1) {
		core.sounds.destroytower.play();
	}

	animation.firstrun = 1;

	animation.top = 4;
	
	explodesprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}
}

function healanimation(core, animation, index) {
	var time = core.information.time - animation.starttime;
	animation.animationlength = 1;
	
	getboardposition(core, animation.var1);
	animation.left = core.information.leftposition - 1;
	animation.top = core.information.topposition - 5.2;
	
	healsprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}
}

function attackanimation(core, animation, index) {
	var time = core.information.time - animation.starttime;
	animation.animationlength = 1;

	if (animation.firstrun != 1) {
		core.sounds.swipe.play();
	}

	animation.firstrun = 1;
	
	attacksprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}
}

function playcardanimation(core, animation, index) {
	
	/* Notes
	
	*/
	
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;
	
	playcardsprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

function infinitegoldcoinanimation(core, animation, index) {
	
	/* Notes
	
	*/
	
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;
	
	goldcoinsprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		animation.starttime = core.information.time;
	}

}

function infinitesilvercoinanimation(core, animation, index) {
	
	/* Notes
	
	*/
	
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;
	
	if (time >= animation.animationlength) {
		animation.starttime = core.information.time;
	}
	
	silvercoinsprite(core, animation, time);

}

function goldincomeanimation(core, animation, index) {

	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;

	var player = animation.var1;

	ctx.save();
	ctx.globalAlpha = 1 - time;
	animation.top = 7 - (time * 6);

	if (player == 1) {
		animation.left = 38.2;
	} else if (player == 2) {
		animation.left = 58.2;
	}

	silvercoinsprite(core, animation, time);

	ctx.restore();

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

function attackflamesanimation(core, animation, index) {

	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;

	if (time >= animation.animationlength) {
		animation.starttime = core.information.time;
	}
	
	flamessprite(core, animation, time);

	if (animation.var1.attacking != 1) {
		core.animation[index].complete = 1;
	}

}

function addgoldanimation(core, animation, index) {

	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;

	var player = animation.var1;

	ctx.save();
	ctx.globalAlpha = 1 - time;
	animation.top = 7 - (time * 6);

	if (player == 1) {
		animation.left = 34.2;
	} else if (player == 2) {
		animation.left = 61.8;
	}

	if (animation.firstrun != 1) {
		core.sounds.gold.play();
	}

	animation.firstrun = 1;

	goldcoinsprite(core, animation, time);

	ctx.restore();

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

function towerattackanimation(core, animation, index) {

	var time = core.information.time - animation.starttime;
	animation.animationlength = .4;

	var tower = animation.var1;
	var position = animation.var2;

	ctx.save();

	// get start position
	if (tower == 1) {
		animation.startleft = 10;
		animation.starttop = -2;
	} else {
		animation.startleft = 90;
		animation.starttop = -3;
	}

	// get targets position 
	var target = getboardposition(core, position);
	if (position >= 6 && position <= 10) {
		target.top -= 14;
		target.left += 5;
	} else {
		target.top -= 13;
		target.left += -5;
	}

	// calculate time percent
	var progress = time / animation.animationlength;

	// calculate animation top and left based off position of target
	animation.left = animation.startleft + ((target.left - animation.startleft) * progress);
	animation.top = animation.starttop + ((target.top - animation.starttop) * progress);

	// calculate rotation so it faces intended direction
	//var degrees = Math.atan2(target.top - animation.starttop, target.left - animation.startleft) * (180 / Math.PI);

	if (position == 6) {
		degrees = -105;
	} else if (position == 7) {
		degrees = -115;
	} else if (position == 8) {
		degrees = -125;
	} else if (position == 9) {
		degrees = -135;
	} else if (position == 10) {
		degrees = -145;
	} else if (position == 16) {
		degrees = 105;
	} else if (position == 17) {
		degrees = 115;
	} else if (position == 18) {
		degrees = 125;
	} else if (position == 19) {
		degrees = 135;
	} else if (position == 20) {
		degrees = 145;
	}

	
	// rotate canvas
	ctx.translate(core.information.pwidth * (animation.left + 6), core.information.pheight * (animation.top + 15));
	ctx.rotate(degrees * Math.PI/180);
	ctx.translate(-core.information.pwidth * (animation.left + 6), -core.information.pheight * (animation.top + 15));

	towershotsprite(core, animation, time);

	ctx.restore();

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

/*function cardflipanimation(core, animation, index) {

	var time = core.information.time - animation.starttime;
	animation.animationlength = 1;

	var card = animation.var1;

	if (typeof(animation.firstrun) == 'undefined') {
		document.getElementById('cont').style.zIndex = 5;
		//document.querySelector("#cardflip").classList.toggle("hover");

		var flipfront = document.getElementById("FlipFront");
		var flipfrontctx = flipfront.getContext("2d");

		flipfrontutils.drawImage(ctx, card.back, 0, 0, 87, 130);
	}

	animation.firstrun = 1;

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
		//document.getElementById('cont').style.zIndex = -5;
	}

}

function flipcard(core, animation, index) {



}*/

function cardflipanimation(core, animation, index) {
	
	var time = core.information.time - animation.starttime;
	animation.animationlength = 3;

	var card = animation.var1;
	var player = animation.var2;
	var frontCard = card.back;
  	var backCard = card.asset;
	var x = animation.left;
	var y = animation.top;
	var degree = 180 - (time - 1) * 180;

	if (time >= 0 && time < 1) {
		// draw card back
		ctx.save();
		ctx.translate(1000, 0);
		ctx.scale(-1, 1);
		utils.drawImage(ctx, card.back, core.information.pwidth * 42.5, core.information.pheight * 25, core.information.pwidth * 15, core.information.pheight * 15 * 2.66);
		ctx.restore();
	} else if (time >= 1 && time < 2) {

		// flip animation
		var image = degree >= 90 ? frontCard: backCard;
		ctx.save();
		cardfliprender(image, degree, core.information.pwidth * 30.5, core.information.pheight * 23.57, .355, 0);
		ctx.restore();

	} else if (time >= 2 && time <= 4) {
		// draw card front
		drawcard(core, animation.var1, 15, 42.5, 25, 0, 0);
	}

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

  function cardfliprender(img, degree=0, x=0, y=0, scale=1, rotation=0) {
	var toRad = (Math.PI / 180);
    var rad = degree * toRad;
    var rotateRad = rotation * toRad;

    var width = img.width;
    var height = img.height;
    var halfHeight = height / 2;
    
    var widthToHeightRatio = height / width;
    var skewSin = (.2 * Math.sin(rad)) * scale;
    var xScale = Math.cos(rad) * scale;
    var yScale = (1 - (skewSin / (widthToHeightRatio * 2))) * scale;

    var heightOffset = ((skewSin * height) / (widthToHeightRatio * 4));
    var widthOffset = ((width / 2) - (width * xScale / 2));

    for (var i = 0; i <= halfHeight; ++i) {
      var drawHeightTop = halfHeight - i;
      var yskew = skewSin * i / height;
      // Top half
      ctx.setTransform(xScale, -yskew, 0, yScale, widthOffset + x, heightOffset + y);
      utils.drawImage(ctx, 
        img,
        0, drawHeightTop, width, 2,
        0, drawHeightTop, width, 2
      );

      // Bottom Half
      var drawHeightBottom = halfHeight + i;
      ctx.setTransform(xScale, yskew, 0, yScale, widthOffset + x, heightOffset + y);
      utils.drawImage(ctx, img,
        0, drawHeightBottom, width, 2,
        0, drawHeightBottom, width, 2);
    }
  }