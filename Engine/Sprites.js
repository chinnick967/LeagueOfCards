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
	
	var canvas = document.getElementById('GameCanvas');
	var ctx = canvas.getContext("2d");
	
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
	
	// ctx.drawimage(image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	ctx.drawImage(core.assets.buffsprite, clipx, clipy, 192, 192, core.information.pwidth * animation.left, core.information.pheight * animation.top, core.information.pwidth * 15, core.information.pheight * 25);
	
	ctx.restore();
	
}

function playcardsprite(core, animation, time){
	
	var canvas = document.getElementById('GameCanvas');
	var ctx = canvas.getContext("2d");
	
	var frame = getframe(time, animation.animationlength, 20);
	var clipx = getclipx(192, 5, frame);
	var clipy = getclipy(192, 5, frame);
	
	// ctx.drawimage(image, clipx, clipy, clipwidth, clipheight, xcoord, ycoord, width, height);
	ctx.drawImage(core.assets.playcardsprite, clipx, clipy, 192, 192, core.information.pwidth * animation.left, core.information.pheight * animation.top, core.information.pwidth * 15, core.information.pheight * 25);
	
}