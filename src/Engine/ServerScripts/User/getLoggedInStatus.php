<?php
	require '../mock/wordpress.php';
	require '../Response.php';

	if( wp_get_current_user() == 0 ) {
		$isLoggedIn = False;
	} else {
		$isLoggedIn = True;
	}

	echo generateSuccessResponse(array('isLoggedIn' => $isLoggedIn));
?>

