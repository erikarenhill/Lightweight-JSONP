<?php
/***
* An extremely simple sample of a callback handler
***/

$response = array();

for ( $i = 1; $i <= 10; ++$i ) {
	$response[] = array('title' => "Sample item - $i", 'description' => "Description - $i");
}

echo $_GET['callback'] . '(' . json_encode($response) . ');';