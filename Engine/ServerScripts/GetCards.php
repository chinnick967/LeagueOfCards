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
	
		$json = array('cardID' => $row['CardID'], 'name' => $row['Name'], 'cost' => $row['Cost'], 'attack' => $row['Attack'], 'defense' => $row['Defense'], 'magicresist' => $row['MagicResist'], 'armor' => $row['Armor'], 'Image' => $row['Image'], 'type' => $row['Type'], 'damagetype' => $row['DamageType']);
		
		
		echo json_encode($json).('---');
	
	}

?>