function mouseinit(core) {

	$('#GameCanvas').mousemove(function(m) {
		var c = document.getElementById('GameCanvas');
		var width = c.width;
		var height = c.height;
		
		core.information.xoffset = (m.offsetX / core.information.pwidth);
		core.information.yoffset = (m.offsetY / core.information.pheight);
		
		});

	$('#GameCanvas').css( 'cursor', 'url(Assets/cursor.png), auto' );
	
	$("#GameCanvas").mousedown(function(){
	    core.information.mousedown = 1;
	    core.information.mouseup = 0;
		
		// click functions
		setattacker(core);
		declareattack(core);
	});
	
	$("#GameCanvas").mouseup(function(){
	    core.information.mousedown = 0;
	    core.information.mouseup = 1;
	});

}