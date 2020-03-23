<?php
$mode = $_GET['mode'];
$type = $_GET['type'];
$format = $_GET['format'];
error_reporting(0);
// MongoDB wird bald noch hinzugefügt für random pics und etc
if($type === "high" and $mode === "RKS"){
	$remoteImage = "https://www.elsetge.cat/myimg/f/131-1316976_anime-girl-in-knee-high-socks.png";
	if($format === "json"){
	    $output['url'] = $remoteImage;
		echo json_encode($output, JSON_PRETTY_PRINT);
	}
	$imginfo = getimagesize($remoteImage);
	header("Content-type: {$imginfo['mime']}");
	readfile($remoteImage);
}elseif($type === "low" and $mode === "RKS"){
    $output['type'] = $type;
    echo json_encode($output, JSON_PRETTY_PRINT);
}else{
	header('Content-Type: application/json');
    $output['type'] = "N/A";
    echo json_encode($output, JSON_PRETTY_PRINT);
}