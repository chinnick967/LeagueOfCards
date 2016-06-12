<?php

// die if the player id isn't set
if (!isset($_POST["playerID"])) {

	die();

}

// connect to the database
require 'Connect.php';
require 'QueueFunctions.php';
require 'Response.php';

$playerID = $_POST["playerID"];

// will create a game if one doesn't exist
creategame($playerID);

	// get the game id
	$getgameid = mysql_query("
	
	     	 SELECT	Queue.GameID
		 FROM	Queue
		 WHERE	Queue.Player1 = '$playerID' OR Queue.Player2 = '$playerID'

	");
	
	// check if player 1
	$getplayernumber = mysql_query("
	
	     	 SELECT	Games.GameID
		 FROM	Games
		 WHERE	Games.Player1 = '$playerID'

	");
	//echo mysql_num_rows($getplayernumber);
	// if not player one, then they are player 2
	if (mysql_num_rows($getplayernumber) == 1) {
		$playernumber = 1;
	} else {
		$playernumber = 2;
	}
	
	// set the game id
	$gameid = mysql_result($getgameid, 0);
	
	// echo out a json with the gameid and player number
	$arr = array(
		'gameid' => $gameid,
		'player' => $playernumber
	);

	echo generateSuccessResponse($arr);

?>