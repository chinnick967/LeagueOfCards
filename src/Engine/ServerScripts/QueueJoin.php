<?php

// die if the player id isn't set
if (!isset($_POST["playerID"])) {

	die();

}

// connect to the database
require 'Connect.php';
require 'QueueFunctions.php';
require 'Response.php';

// Get the player's ID
$playerID = (int)$_POST["playerID"];

	// delete disconnected rows before continuing
	$dctime = time() - 7;
	
	$deletedisconnects = mysql_query("
	
	     	 DELETE FROM	Queue
		 WHERE		Queue.Player1Ping <= $dctime

	");

	// Check if the player is currently queued
	$checkifqueued = mysql_query("
	
	     	 SELECT	Queue.QueueID
		 FROM	Queue
		 WHERE	Queue.player1 = '$playerID' || Queue.player2 = '$playerID'
	
	");
	
	// if not already queued, queue up
	if (mysql_num_rows($checkifqueued) == 0) {
	
		// check if a slot is available
		$checkqueueslots = mysql_query("
	
	     	 SELECT	Queue.QueueID
		 FROM	Queue
		 WHERE	Queue.player2 = 0
	
		");
		
			if (mysql_num_rows($checkqueueslots) != 0) {
				
				// place the results into an array in case more than one result is returned
				$returnedslots = mysql_fetch_array($checkqueueslots);
				// take the first slot from the array
				$selectedslot = $returnedslots[0];
				// add the player to the player 2 column of the queue slot
				$addplayer2 = mysql_query("
				
					UPDATE	Queue
					SET	Player2 = $playerID
					WHERE	QueueID = $selectedslot
				
				");
				
				// echo 2 showing that they found a match
				echo generateSuccessResponse(2);
				
				
			} else {
			
				// get the highest id value
				$getids = mysql_query("
	
				     	 SELECT	MAX(QueueID)
					 FROM	Queue
				
				");
				
				// set the max id value
				$maxid = mysql_result($getids, 0);
				// add one to the max id
				$newid = $maxid + 1;
				// get the Unix time
				$time = time();
				
				// insert a row since no empty queue slots are available
				$joinqueue = mysql_query("
			
			     	 INSERT INTO Queue (QueueID, Player1, Player2, Player1Ping)
			     	 VALUES		   ($newid, $playerID, 0, $time)
			
				");
				
				// echo 1 showing that queueing was successful
				echo generateSuccessResponse(1);
			
			}
	
	}
	
	else {
	
		// delete any rows associated with this player to cancel their queue
		$getqueuerows = mysql_query("
	
				     DELETE FROM Queue
					 WHERE	Player1 = $playerID
				
				");
	
		// echo 0 showing that queueing was not successful
		echo generateSuccessResponse(0);
	
	}

?>