function mouseinit(core) {
	var $GameCanvas = $('GameCanvas');
	$GameCanvas.css( 'cursor', 'url(Assets/cursor.png), auto' );

	mouseEmitter.on('move', function(m) {
		var c = document.getElementById('GameCanvas');
		var width = c.width;
		var height = c.height;

		core.information.xoffset = (m.offsetX / core.information.pwidth);
		core.information.yoffset = (m.offsetY / core.information.pheight);

	});
	mouseEmitter.on('down', function(){
		core.information.mousedown = 1;
		core.information.mouseup = 0;

		// click functions
		if (core.information.attacked != 1) {
			setattacker(core);
			declareattack(core);
		}
	});
	mouseEmitter.on('up', function(){
		core.information.mousedown = 0;
		core.information.mouseup = 1;
	});

	$GameCanvas.mousedown(event => mouseEmitter.emit('down', event));
	$GameCanvas.mouseup(event => mouseEmitter.emit('up', event));
	$GameCanvas.mousemove(event => mouseEmitter.emit('move', event));
	$GameCanvas.mouseenter(event => mouseEmitter.emit('enter', new CustomEvent('enter', event)));
	$GameCanvas.mouseleave(event => mouseEmitter.emit('leave', new CustomEvent('leave', event)));
	$GameCanvas.click(event => mouseEmitter.emit('click', new CustomEvent('click', event)));

	function CustomEvent(type, event) {
		var target = event.target;
		this.originalEvent = event;
		this.type = type;
		this.xoffset = event.offsetX / core.information.pwidth;
		this.yoffset = event.offsetY / core.information.pheight;
		this.xrelative = event.offsetX * (target.getAttribute('width') / target.clientWidth);
		this.yrelative = event.offsetY * (target.getAttribute('height') / target.clientHeight);
	}


}