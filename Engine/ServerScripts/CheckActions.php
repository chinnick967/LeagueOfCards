<?php

// connect to the database
require 'Connect.php';
require 'Response.php';

// Get the game ID
$gameID = (int)$_POST["gameID"];
// Get the player number
$player = $_POST["player"];

	// search for new actions
	$getactions = mysql_query("
		
		SELECT	*
		FROM	Actions
		WHERE	Actions.ReceivingPlayer = '$player' AND Actions.ReceivedFlag = 0 AND Actions.GameID = $gameID
					
	");
	
	$updatereceivedactions = mysql_query("
	
	     UPDATE	Actions
		 SET	ReceivedFlag = 1
		 WHERE	Actions.ReceivingPlayer = '$player' AND Actions.ReceivedFlag = 0 AND Actions.GameID = $gameID

	");
	$json = array();
	if (mysql_num_rows($getactions) > 0) {
			while ($row = mysql_fetch_assoc($getactions)) {
			
				$json[] = array(
					'actionID' => $row['ActionID'],
					'GameID' => $row['gameID'],
					'action' => $row['Action'],
					'sendingplayer' => $row['SendingPlayer'],
					'receivingplayer' => $row['ReceivingPlayer'],
					'var1' => $row['Var1'],
					'var2' => $row['Var2'],
					'var3' => $row['Var3'],
					'var4' => $row['Var4'],
					'var5' => $row['Var5'],
					'var6' => $row['Var6']
				);
			
			}
	}

	echo generateSuccessResponse($json);

?>