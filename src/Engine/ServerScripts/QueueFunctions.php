<?php

// connect to the database
require 'Connect.php';

function creategame($playerID) {

	// get the highest id value
	$getids = mysql_query("
	
	     	 SELECT	MAX(GameID)
		 FROM	Games
	
	");
	
	// get player 1
	$p1 = mysql_query("
	
	     	 SELECT	Queue.Player1
		 FROM	Queue
		 WHERE	Queue.Player1 = '$playerID' OR Queue.Player2 = '$playerID'

	");
	
	$player1 = mysql_result($p1, 0);
	
	// get player 2
	$p2 = mysql_query("
	
	     	 SELECT	Queue.Player2
		 FROM	Queue
		 WHERE	Queue.Player1 = '$playerID' OR Queue.Player2 = '$playerID'

	");
	
	$player2 = mysql_result($p2, 0);

	// set the max id value
	$maxid = mysql_result($getids, 0);
	// add one to the max id
	$newid = $maxid + 1;
	// get the Unix time
	$time = time();
	
	// check if gameid has been set in the queue
	$isgameidset = mysql_query("
	
	     	 SELECT	Queue.GameID
		 FROM	Queue
		 WHERE	Queue.Player1 = '$playerID' OR Queue.Player2 = '$playerID'

	");
	
	$gameidset = mysql_result($isgameidset, 0);

	// make sure only one game is created
	if (is_null($gameidset)) {
	
		// update queue with game ID for players
		$queueid = mysql_query("
	
	     	 UPDATE	Queue
		 SET	GameID = $newid
		 WHERE	Queue.player1 = '$playerID' OR Queue.player2 = '$playerID'

		");
	
		// create a game
		$creategame = mysql_query("
	
	     	 INSERT INTO Games (GameID, Player1, Player2, Player1Ping, Player2Ping, starttime)
	     	 VALUES		   ($newid, $player1, $player2, $time, $time, $time)
	
		");
	
	}
 
}


?>