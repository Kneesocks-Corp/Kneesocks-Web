<?php
$type = $_GET['type'];
error_reporting(0);
header('Content-Type: application/json');
if($type === "Upper"){
    $output['type'] = $type;
    echo json_encode($output, JSON_PRETTY_PRINT);
}elseif($type === "Lower"){
    $output['type'] = $type;
    echo json_encode($output, JSON_PRETTY_PRINT);
}else{
    $output['type'] = "N/A";
    echo json_encode($output, JSON_PRETTY_PRINT);
}