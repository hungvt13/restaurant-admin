<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
 
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));

 // query to insert record
$sql = "DELETE FROM Items WHERE uid='$data->itemUID'";



//prepare query 
$stmt = $db->prepare($sql);

//execute query
if($stmt->execute()){
    echo '{';
        echo '"message": "Thành công"';
    echo '}';
}else{
    echo '{';
        echo '"message": "Thất bại"';
    echo '}';
}
?>