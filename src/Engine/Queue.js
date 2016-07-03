// temporary for generating a player id
var playerID = Math.round (Math.random () * 10000000);
var ping = new Audio ('Assets/ping.wav');

function start(core) {
	var inQueue = false;
	var $playButton = $ ('#playbutton');
	var $timer = $ ('#matchtimer');
	var $loadingBar = $ ('#loadingbar');
	var $queueContainer = $ ('#QueueContainer');
	var $gameContainer = $ ('#GameContainer');
	var timer = null;

	$playButton.on ('click', handleClick);
	core.socket.on ('game:found', handleGameFound);

	function handleClick() {
		if (inQueue) {
			cancelQueue ();
		} else {
			joinQueue ();
		}
	}

	function handleGameFound(gameInfo) {
		if(!inQueue) return;
		// set game info
		init(core, gameInfo);
		timer.cancel();
		$timer.text('Match Found!');
		ping.play();
		$loadingBar.animate({
			width: '100%'
		}, 500);
		setTimeout (function () {
			$gameContainer.show();
			$queueContainer.fadeOut ("slow", function () {
				$gameContainer.show();
			});
		}, 2000);
	}

	function cancelQueue() {
		$playButton
			.text ('Play');
		$timer
			.text ('')
			.hide();
		inQueue = false;
		core.socket.emit ('queue:cancel');
		timer.cancel ();
	}

	function joinQueue() {
		inQueue = true;
		$playButton.text ('Cancel');
		core.socket.emit ('queue:join');
		timer = GameTimer (onTimerChange);
		timer.start ();
		$timer
			.text ('')
			.show();
	}

	function onTimerChange(time) {
		$timer.text (formatTime (time));
	}
}


function GameTimer(onTimeChange) {
	var time = 0;
	var intervalId;
	function onTimer () {
		time++;
		onTimeChange (time);
	}
	return {
		start: function () {
			intervalId = window.setInterval (onTimer, 1000);
		},
		cancel: function () {
			window.clearInterval (intervalId);
		}
	}
}

function formatTime(time) {
	var minutes;
	var seconds;
	if (time >= 60) {
		minutes = (time - (time % 60)) / 60;
		seconds = time % 60;
	} else {
		minutes = 0;
		seconds = time;
	}

	// add leading 0 to seconds if less than 10
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return "Searching... " + minutes + ':' + seconds;
}