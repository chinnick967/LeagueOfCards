var ChatBox = function (node, core) {

	var $parent = node instanceof $ ? node : $(node);
	var scrollAtBottom = true;
	var $container = $('<main class="message-container"></main>');
	var $footer = $('<footer class="noselect"></footer>');
	var BASE_URL = 'Engine/ServerScripts/Chat/';
	var MESSAGE_TEMPLATE = '<div class="message">{{message}}</div>';
	var OPEN_CLASS = 'chat-open';

	$parent.on('scroll', handleScroll);

	init();

	return {
		listen: listen,
		post: post,
		clear: clear,
		show: show
	};

	function init () {
		$parent.empty();
		$parent.addClass('chat-box');
		$parent.append([ $container, $footer ]);
		$footer.text('thing');
		$footer.on('click', handleFooterClick);
		updateScroll();
		var observer = new MutationObserver(updateScroll);
		observer.observe($container[0], {childList: true});
	}

	function listen () {
		listenForMessages();
	}

	function post (msg, data) {
		appendMessage({message: msg, data: data});
		postMessage(core.information.gameid, msg, data);
	}

	function clear () {
		$container.empty();
	}

	function show (bool) {
		if(utils.isBool(bool) ? bool: true) {
			$parent.addClass(OPEN_CLASS);
		} else {
			$parent.removeClass(OPEN_CLASS);
		}
	}

	function updateScroll () {
		if(scrollAtBottom) {
			var maxScroll = Math.max(0, $parent[0].scrollHeight - $parent.height());
			$parent.scrollTop(maxScroll);
		}
	}

	function getUnreadMessages() {
		return $.post(BASE_URL + 'GetMessage.php', {
			gameId: core.information.gameid,
			playerId: getCurrentPlayer(core)
		}).then(function (response) {
			return appendMessage(response.data)
		});
	}

	function postMessage (gameId, message, data) {
		return $.post(BASE_URL + 'PostMessage.php', {
			gameId: gameId,
			message: message,
			playerId: getCurrentPlayer(core),
			data: data,
			timestamp: Date.now()
		});
	}

	function getCurrentPlayer(core){
		return core.information.player === 1 ?
			core.information.player1ID:
			core.information.player2ID;
	}

	function appendMessage (msgs) {
		if(!Array.isArray(msgs)) {
			msgs = [msgs];
		}

		return msgs
			.map(function (msg) {
				return utils.interpolate(msg.message, msg.data);
			})
			.forEach(function (message) {
				$container.append($(utils.interpolate(MESSAGE_TEMPLATE, {message: message})));
			});
	}

	function listenForMessages () {
		getUnreadMessages()
			.then(function () {
				setTimeout(listenForMessages, 1000);
			});
	}

	function handleScroll () {
		var parentNode = $parent[0];
		if(parentNode.scrollHeight === (parentNode.clientHeight + parentNode.scrollTop)) {
			scrollAtBottom = true;
		} else {
			scrollAtBottom = false;
		}
	}

	function handleFooterClick () {
		show(!$parent.hasClass(OPEN_CLASS));
	}
};