<?php

// connect to the database
require 'Connect.php';

	// get the cards
	$getcards = mysql_query("
	
	     	 SELECT	Cards.CardID, Cards.Name, Cards.Cost, Cards.Attack, Cards.Defense, Cards.MagicResist, Cards.Armor, Cards.Image, Cards.Type, Cards.DamageType
		 FROM	Cards

	");
	
	$arr = array();
	$counter = 0;
	
	while ($row = mysql_fetch_assoc($getcards)) {
	
		$json = array('CardID' => $row['CardID'], 'Name' => $row['Name'], 'Cost' => $row['Cost'], 'Attack' => $row['Attack'], 'Defense' => $row['Defense'], 'MagicResist' => $row['MagicResist'], 'Armor' => $row['Armor'], 'Image' => $row['Image'], 'Type' => $row['Type'], 'DamageType' => $row['DamageType']);
		
		
		echo json_encode($json).('---');
	
	}

?>