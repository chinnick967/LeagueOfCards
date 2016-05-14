<?php

// connect to the database
require 'Connect.php';
$gameid = $_POST["gameID"];

$gameinfo = mysql_query("
	
	     SELECT	Games.Player1, Games.Player2
		 FROM	Games
		 WHERE	Games.GameID = $gameid

	");

	while ($row = mysql_fetch_assoc($gameinfo)) {
	
		$gamejson = array('player1' => $row['Player1'], 'player2' => $row['Player2']);
	
	}
	
	echo json_encode($gamejson);

?>