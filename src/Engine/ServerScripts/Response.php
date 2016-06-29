<?php

	function generateSuccessResponse ($data) {

		header('Content-type: application/json');
		return json_encode(array('data' => $data));

	}

?>