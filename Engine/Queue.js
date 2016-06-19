// temporary for generating a player id
var playerID = Math.round(Math.random() * 10000000);
var ping = new Audio('Assets/ping.wav');

function start() {

var queueactive = 0;

	$("#playbutton").click(function(){

		Api.queueJoin(playerID).then(function(result){

	    	if (result == '0') {

	    		queueactive = 0;

	    	} else if (result == '1') {

	    		// clear the play button
			document.getElementById('playbutton').innerHTML = "";
			// append the timer to show the new time/message
			$("#playbutton").append('Cancel');

			// activate the queue canceling variable
			queueactive = 1;

	    		queuetimer(0);

	    	} else if (result == '2') {

	    		// clear the play button
			document.getElementById('playbutton').innerHTML = "";
			// append the timer to show the new time/message
			$("#playbutton").append('Cancel');

	    		startgame();
	    	}

	    });

	});

	function queuetimer(time) {
		// add one second to the timer
		time += 1;

		// make sure that the timer is displayed
		document.getElementById('matchtimer').style.display = 'block';

		if (time == 1) {

			checkqueue();

		}

		// turn the time into seconds/minutes
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

		// clear the timer message
		document.getElementById('matchtimer').innerHTML = "";

		// append the timer to show the new time/message
		$("#matchtimer").append("Searching... " + minutes + ':' + seconds);
		
		if (queueactive == '2') {
		
			document.getElementById('matchtimer').innerHTML = "Match Found!";
			document.getElementById("playbutton").disabled = true;
		
		} else if (queueactive == '0') {
			
			// clear the play button
			document.getElementById('playbutton').innerHTML = "";
			// append the timer to show the new time/message
			$("#playbutton").append('Play');
			// clear match timer
			// clear the play button
			document.getElementById('matchtimer').innerHTML = "";

		} else {

			setTimeout(function(){ queuetimer(time); }, 1000);

		}

	}

	function checkqueue() {
		Api.checkQueue(playerID).then(function(result){

				// if match is found stop the queue and start a match
				if (result == '1') {

					queueactive = '2';
					startgame();

				}

				// run again in one second if queue is active
				if (queueactive == 1) {

					setTimeout(function(){ checkqueue(); }, 1000);

				}

			});

	}

	function startgame() {

		document.getElementById('matchtimer').style.display = 'block';
		document.getElementById('matchtimer').innerHTML = "Match Found!";
		init();
		loadinggame(0);

	}

	function loadinggame(pinged) {

		if (pinged == 0) {
			ping.play();
		}

		document.getElementById('loadingbar').style.display = 'block';
		document.getElementById('loadingbar').style.width = loadpercent * 3;

		if (loadpercent == 100) {
			setTimeout(function(){
				document.getElementById('GameContainer').style.display = 'block';
				$( "#QueueContainer" ).fadeOut( "slow", function() {
				    document.getElementById('GameContainer').style.display = 'block';
				  });

				}, 2000);
		} else {
			setTimeout(function(){ loadinggame(1); }, 10);
		}

	}

}