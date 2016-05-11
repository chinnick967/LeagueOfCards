<?php

// die if the player id isn't set
if (!isset($_POST["playerID"])) {

	die();

}

// connect to the database
require 'Connect.php';
require 'QueueFunctions.php';

// Get the player's ID
$playerID = (int)$_POST["playerID"];

	// Get the Unix time and update the player's last ping time, and delete rows where players have disconnected
	$time = time();
	
	$deletedisconnects = mysql_query("
	
	     	 DELETE FROM	Queue
		 WHERE		Queue.Player1Ping <= $time - 7

	");

	$updateping = mysql_query("
	
	     	 UPDATE	Queue
		 SET	Player1Ping = $time
		 WHERE	Queue.player1 = '$playerID'

	");

	// Check if an opponent has been found
	$checkformatch = mysql_query("
	
	     	 SELECT	Queue.QueueID
		 FROM	Queue
		 WHERE	(Queue.player1 = '$playerID' OR Queue.player2 = '$playerID') AND Queue.player2 != 0

	");
	
	if (mysql_num_rows($checkformatch) == 1) {
	
		echo 1;
	
	} else {
	
		echo 0;
	
	}


?>