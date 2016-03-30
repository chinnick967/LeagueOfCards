function mouseinit(core) {

	$('#GameCanvas').mousemove(function(m) {
		
		var c = document.getElementById('GameCanvas');
		var ctx = c.getContext("2d");
		var width = c.width;
		var height = c.height;
		
		core.information.xoffset = (m.offsetX / core.information.pwidth);
		core.information.yoffset = (m.offsetY / core.information.pheight);
		
		});

	$('#GameCanvas').css( 'cursor', 'url(Assets/cursor.png), auto' );

}