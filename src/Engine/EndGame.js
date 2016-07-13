var EndGame = (function () {
	'use strict';
	var $EndGameContainer = $('#EndGameContainer');
	var $CloseButton = $EndGameContainer.find('.close');
	$CloseButton.click(hideGameTab);
	/**
	 * Type: END_GAME | OPPONENT_LEFT | OPPONENT_DISCONNECTED
	 * status: VICTORY | DEFEAT
	 */
	return {
		trackGameEnd: trackGameEnd,
		untrackGameEnd: untrackGameEnd,
		fireEndGame: fireEndGame,
		handleGameEnd: handleGameEnd
	};

	function trackGameEnd(core) {
		socket.on ('game:end', data => handleGameEnd (core, data));
	}

	function untrackGameEnd () {
		socket.removeAllListeners('game:end');
	}
	
	function handleGameEnd(core, data) {
		clearGameData (core, data);
		renderTab (core, data);
	}
	
	function clearGameData(core) {
		core.animateTimerActive = false;
	}
	
	function renderTab(core, data) {
		$('#EndGameContainer')
			.css('zIndex', 5)
			.removeClass ('hidden victory defeat')
			.addClass (data.status.toLowerCase ());
	}
	
	function hideGameTab () {
		closeGameSockets();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		GameQueue.reset();
		$('#QueueContainer').show();
		$('#EndGameContainer')
			.addClass('hidden')
			.removeClass('victory defeat');
		setTimeout(() => $EndGameContainer.css('zIndex', -5), 500);
	}
	
	function fireEndGame (core, loser) {
		var status = 'VICTORY';
		if(core.information.player === loser) {
			status = 'DEFEAT';
		}
		socket.emit('game:end', {status: status});
	}

} ());