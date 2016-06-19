var Api = (function ($) {
	var BASE_URL = 'Engine/ServerScripts/';
	var GET_LOGGED_IN_STATUS = BASE_URL + 'User/getLoggedInStatus.php';
	var GET_CARDS = BASE_URL + 'GetCards.php';
	var GET_MESSAGE = BASE_URL + 'Chat/GetMessage.php';
	var POST_MESSAGE = BASE_URL + 'Chat/PostMessage.php';
	var CHECK_ACTIONS = BASE_URL + 'CheckActions.php';
	var SUBMIT_ACTIONS = BASE_URL + 'SubmitAction.php';
	var GET_PLAYER_NUMBER = BASE_URL + 'GetPlayerNumber.php';
	var GET_GAME_INFO = BASE_URL + 'GameInfo.php';
	var QUEUE_JOIN = BASE_URL + 'QueueJoin.php';
	var CHECK_QUEUE = BASE_URL + 'CheckQueue.php';

	return {
		getLoggedInStatus: getLoggedInStatus,
		getCards: getCards,
		getMessage: getMessage,
		postMessage: postMessage,
		checkActions: checkActions,
		submitActions: submitActions,
		getPlayerNumber: getPlayerNumber,
		getGameInfo: getGameInfo,
		queueJoin: queueJoin,
		checkQueue: checkQueue
	};

	/**
	 * Checks if a user is logged in.
	 * @returns {Promise}
	 */
	function getLoggedInStatus () {
		return $.get(GET_LOGGED_IN_STATUS)
			.then(returnData, returnReject);
	}

	/**
	 * Gets a list of all cards.
	 * @returns {Promise}
	 */
	function getCards () {
		return $.get(GET_CARDS)
			.then(returnData, returnReject);
	}

	/**
	 * Retrieves unread messages submitted by opponent.
	 * @param {Number} gameId
	 * @param {String} playerId
	 * @returns {Promise}
	 */
	function getMessage (gameId, playerId) {
		return $.post(GET_MESSAGE, { gameId: gameId, playerId: playerId })
			.then(returnData, returnReject);
	}

	/**
	 * Sends a message.
	 * @param {Number} gameId
	 * @param {String} message
	 * @param {String} playerId
	 * @param {Object} data - state for message
	 * @returns {Promise}
	 */
	function postMessage (gameId, message, playerId, data) {
		return $.post(POST_MESSAGE, {
			gameId: gameId,
			message: message,
			playerId: playerId,
			data: data,
			timestamp: Date.now()
		}).then(returnData, returnReject);
	}

	/**
	 * Checks if any actions have been submitted by opponent.
	 * @param gameId
	 * @param player
	 * @returns {Promise}
	 */
	function checkActions (gameId, player) {
		return $.post(CHECK_ACTIONS, {gameID: gameId, player: player})
			.then(returnData, returnReject);
	}

	/**
	 * Submits an action.
	 * @param {String} gameId
	 * @param {Object} action - action details.
	 * @returns {Promise}
	 */
	function submitActions (gameId, action) {
		return $.post(SUBMIT_ACTIONS, {gameID: gameId, action: action})
			.then(returnData, returnReject);
	}

	/**
	 * Returns a players number.
	 * @param {String} playerId
	 * @returns {Promise}
	 */
	function getPlayerNumber (playerId) {
		return $.post(GET_PLAYER_NUMBER, {playerID: playerId})
			.then(returnData, returnReject);
	}

	/**
	 * Retrieves game information.
	 * @param {Number} gameId
	 * @returns {Promise}
	 */
	function getGameInfo (gameId) {
		return $.post(GET_GAME_INFO, {gameID: gameId})
			.then(returnData, returnReject);
	}

	/**
	 * Joins the game queue
	 * @param playerId
	 * @returns {Promise}
	 */
	function queueJoin (playerId) {
		return $.post(QUEUE_JOIN, {playerID: playerId})
			.then(returnData, returnReject);
	}

	/**
	 * Checks to see if a game has been found.
	 * @param {String} playerId
	 * @returns {Promise}
	 */
	function checkQueue (playerId) {
		return $.post(CHECK_QUEUE, {playerID: playerId})
			.then(returnData, returnReject);
	}

	function returnData (result) {
		return result.data;
	}

	function returnReject (result) {
		return $.reject(result);
	}

} (jQuery));