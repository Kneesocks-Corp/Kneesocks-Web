<?php
$mode = $_GET['mode'];
$type = $_GET['type'];
error_reporting(0);
// MongoDB wird bald noch hinzugefügt für random pics und etc
if($type === "Upper" and $mode === "RKS"){
    echo file_get_contents('https://www.elsetge.cat/myimg/f/131-1316976_anime-girl-in-knee-high-socks.png');
}elseif($type === "Lower" and $mode === "RKS"){
    $output['type'] = $type;
    echo json_encode($output, JSON_PRETTY_PRINT);
}else{
	header('Content-Type: application/json');
    $output['type'] = "N/A";
    echo json_encode($output, JSON_PRETTY_PRINT);
}