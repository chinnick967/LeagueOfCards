function getframe(time, timelength, frames) {
	var framelength = timelength / frames;
	return parseInt(time / framelength);
}

function getclipx(framesize, framesacross, frame) {
	return framesize * (frame % framesacross);
}

function getclipy(framesize, framesacross, frame) {
	return framesize * parseInt(frame / framesacross);
}

function shieldsprite(core, animation, time) {

	// 960 wide (5 across) x 768 height (4 down)
	// Math: each is 192 wide, 192 tall

	var frame = getframe(time, animation.animationlength, 20);
	var clipx = getclipx(192, 5, frame);
	var clipy = getclipy(192, 5, frame);

	ctx.save();

	// translate to the center
	ctx.translate(core.information.pwidth * (animation.left + 19.2/2), core.information.pheight * (animation.top + 32/2));
	// rotate the canvas
	ctx.rotate(animation.var1 * Math.PI/180);
	// translate back
	ctx.translate(-core.information.pwidth * (animation.left + 19.2/2), -core.information.pheight * (animation.top + 32/2));

	// utils.drawImage(ctx, image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	utils.drawImage(ctx, core.sprites.icons.buffsprite, clipx, clipy, 192, 192, core.information.pwidth * animation.left, core.information.pheight * animation.top, core.information.pwidth * 15, core.information.pheight * 25);

	ctx.restore();

}

function explodesprite(core, animation, time) {

	var frame = getframe(time, animation.animationlength, 30);
	var clipx = getclipx(192, 5, frame);
	var clipy = getclipy(192, 5, frame);

	// utils.drawImage(ctx, image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	utils.drawImage(ctx, core.sprites.sprites.blast, clipx, clipy, 192, 192, core.information.pwidth * animation.left, core.information.pheight * animation.top, core.information.pwidth * 15, core.information.pheight * 25);
}

function attacksprite(core, animation, time) {

	var frame = getframe(time, animation.animationlength, 30);
	var clipx = getclipx(192, 5, frame);
	var clipy = getclipy(192, 5, frame);

	// utils.drawImage(ctx, image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	utils.drawImage(ctx, core.sprites.sprites.swipe3, clipx, clipy, 192, 192, core.information.pwidth * animation.left, core.information.pheight * animation.top, core.information.pwidth * 15, core.information.pheight * 25);
}

function playcardsprite(core, animation, time){

	var frame = getframe(time, animation.animationlength, 20);
	var clipx = getclipx(192, 5, frame);
	var clipy = getclipy(192, 5, frame);

	// utils.drawImage(ctx, image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	utils.drawImage(ctx, core.sprites.sprites.playcardsprite, clipx, clipy, 192, 192, core.information.pwidth * animation.left, core.information.pheight * animation.top, core.information.pwidth * 25, core.information.pheight * 45);

}

function goldcoinsprite(core, animation, time) {

	var frame = getframe(time, animation.animationlength, 8);

	if (frame == 8) {
		frame -= 1;
	}

	var clipx = getclipx(40, 4, frame);
	var clipy = getclipy(40, 4, frame);

	// adjust top and left positions cause sprite designer sucks
	if (frame == 0) {
		var adjusttop = -.4;
		var adjustleft = -.3;
	} else if (frame == 1) {
		var adjusttop = -.4;
		var adjustleft = -.1;
	} else if (frame == 2) {
		var adjusttop = -.4;
		var adjustleft = 0;
	} else if (frame == 3) {
		var adjusttop = -.4;
		var adjustleft = .2;
	} else if (frame == 4) {
		var adjusttop = -.1;
		var adjustleft = -.3;
	} else if (frame == 5) {
		var adjusttop = -.1;
		var adjustleft = -.1;
	} else if (frame == 6) {
		var adjusttop = -.1;
		var adjustleft = 0;
	} else if (frame == 7) {
		var adjusttop = -.1;
		var adjustleft = .2;
	} else {
		var adjusttop = 0;
		var adjustleft = -.3;
	}

	// utils.drawImage(ctx, image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	utils.drawImage(ctx, core.sprites.sprites.coins, clipx, clipy, 40, 40, core.information.pwidth * (animation.left + adjustleft), core.information.pheight * (animation.top + adjusttop), core.information.pwidth * 2.5, core.information.pheight * 4);
	
}

function silvercoinsprite(core, animation, time) {

	var frame = getframe(time, animation.animationlength, 8);

	if (frame == 8) {
		frame -= 1;
	}

	var clipx = getclipx(40, 4, frame + 8);
	var clipy = getclipy(40, 4, frame + 8);

	// adjust top and left positions cause sprite designer sucks
	if (frame == 0) {
		var adjusttop = -.4;
		var adjustleft = -.3;
	} else if (frame == 1) {
		var adjusttop = -.4;
		var adjustleft = -.1;
	} else if (frame == 2) {
		var adjusttop = -.4;
		var adjustleft = 0;
	} else if (frame == 3) {
		var adjusttop = -.4;
		var adjustleft = .2;
	} else if (frame == 4) {
		var adjusttop = -.1;
		var adjustleft = -.3;
	} else if (frame == 5) {
		var adjusttop = -.1;
		var adjustleft = -.1;
	} else if (frame == 6) {
		var adjusttop = -.1;
		var adjustleft = 0;
	} else if (frame == 7) {
		var adjusttop = -.1;
		var adjustleft = .2;
	} else {
		var adjusttop = 0;
		var adjustleft = -.3;
	}

	// utils.drawImage(ctx, image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	utils.drawImage(ctx, core.sprites.sprites.coins, clipx, clipy, 40, 40, core.information.pwidth * (animation.left + adjustleft), core.information.pheight * (animation.top + adjusttop), core.information.pwidth * 2.5, core.information.pheight * 4);

}