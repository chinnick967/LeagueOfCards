<?php

    // connect to the database
    require 'Connect.php';

	// get the cards
	$getcards = mysql_query("
	
	     SELECT	Cards.CardID, Cards.Name, Cards.Cost, Cards.Attack, Cards.Defense, Cards.MagicResist, Cards.Armor, Cards.Image, Cards.Type, Cards.DamageType
		 FROM	Cards

	");
	
	$json = array();

	while ($row = mysql_fetch_array($getcards)) {

		$json[] = array(
            'cardID' => $row['CardID'],
            'name' => $row['Name'],
            'cost' => $row['Cost'],
            'attack' => $row['Attack'],
            'defense' => $row['Defense'],
            'magicresist' => $row['MagicResist'],
            'armor' => $row['Armor'],
            'Image' => $row['Image'],
            'type' => $row['Type'],
            'damagetype' => $row['DamageType']
        );
	
	}

    // Content-type header tells browser to convert text to json.
    header('Content-type: application/json');

	echo json_encode($json);

?>