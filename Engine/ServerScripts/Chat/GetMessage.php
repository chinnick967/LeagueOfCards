<?php
	require '../Connect.php';
	require '../Response.php';

	$GameID = (int)$_POST["gameId"];
	$CurrentPlayer = $_POST["playerId"];
	$Timestamp = (int)$_POST["timestamp"];

	// Get messages not viewed by current player
	$messageList = mysql_query("
		SELECT *
		FROM chat
		WHERE
			GameID = $GameID AND
			Viewed NOT LIKE '%$CurrentPlayer%'
	");

	mysql_query("
        UPDATE chat
        SET Viewed=CONCAT_WS(Viewed, '-', '$CurrentPlayer', '-')
        WHERE
			GameID = $GameID AND
			Viewed NOT LIKE '%$CurrentPlayer%'
	");

	$res = array();

	while ($r = mysql_fetch_assoc($messageList)) {

		$res[] = Array(
			'message' => $r["Message"],
			'data' => json_decode($r["Data"]),
			'id' => $r["ID"],
			'timestampMs' => (int)$r["TimestampMS"]
		);

	}

	echo generateSuccessResponse($res);
?>