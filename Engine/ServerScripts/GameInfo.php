<?php

// connect to the database
require 'Connect.php';
$gameid = $_POST["gameID"];

$gameinfo = mysql_query("
	
<<<<<<< HEAD
	     SELECT	Games.Player1, Games.Player2, Games.starttime
=======
	     SELECT	Games.Player1, Games.Player2
>>>>>>> origin/master
		 FROM	Games
		 WHERE	Games.GameID = $gameid

	");

	while ($row = mysql_fetch_assoc($gameinfo)) {
	
<<<<<<< HEAD
		$gamejson = array('player1' => $row['Player1'], 'player2' => $row['Player2'], 'starttime' => $row['starttime']);
=======
		$gamejson = array('player1' => $row['Player1'], 'player2' => $row['Player2']);
>>>>>>> origin/master
	
	}
	
	echo json_encode($gamejson);

?>