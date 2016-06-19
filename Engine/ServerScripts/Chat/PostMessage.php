<?php
	require '../Connect.php';

	$GameID = (int)$_POST["gameId"];
	$PlayerID = $_POST['playerId'];
	$Message = $_POST["message"];
	$Data = json_encode($_POST["data"]);
	$TimestampMS = (int)$_POST["timestamp"];

	$submitAction = mysql_query("
		INSERT INTO Chat (GameID, PlayerID, ID, Message, Data, TimestampMS, Viewed)
		SELECT              $GameID, '$PlayerID', MAX(ID) + 1, '$Message', '$Data', $TimestampMS, '-$PlayerID-'
		FROM Chat
	");

	mysql_error	($submitAction);
?>