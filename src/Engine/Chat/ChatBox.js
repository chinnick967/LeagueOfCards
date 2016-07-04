var ChatBox = function (node, core) {

	var $parent = node instanceof $ ? node : $(node);
	var scrollAtBottom = true;
	var $container = $('<main class="message-container"></main>');
	var $footer = $('<footer class="noselect"></footer>');
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
		$footer.text('Chat Log');
		$footer.on('click', handleFooterClick);
		updateScroll();
		var observer = new MutationObserver(updateScroll);
		observer.observe($container[0], { childList: true });
	}

	function listen () {
		core.socket.on('game:chat:submit', function (data) {
			appendMessage(data);
		});
	}

	function post (msg, data) {
		appendMessage({message: msg, data: data});
		core.socket.emit('game:chat:submit', {message: msg, data: data});
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

	function appendMessage (msg) {
		var message = utils.interpolate(msg.message, msg.data);
		$container.append($(utils.interpolate(MESSAGE_TEMPLATE, {message: message})));
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