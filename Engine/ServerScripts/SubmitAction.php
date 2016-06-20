<?php

// connect to the database
require 'Connect.php';

// Get the game ID
$gameID = (int)$_POST["gameID"];
// action
$action = $_POST["action"];
			
		$submitaction = mysql_query("
		
			INSERT INTO Actions (ActionID, GameID, Action, SendingPlayer, ReceivingPlayer, ReceivedFlag, Var1, Var2, Var3, Var4, Var5, Var6)
			SELECT		   	  COALESCE(MAX(ActionID) + 1, 0), $gameID, '$action[name]', '$action[sendingplayer]', '$action[receivingplayer]', 0, '$action[var1]', '$action[var2]', '$action[var3]', '$action[var4]', '$action[var5]', '$action[var6]'
			FROM	Actions
		
		");
	
?>