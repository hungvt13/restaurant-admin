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
$active;

if($data->isActive == true){
    $active = 1;
}
else{
    $active = 0;
}

 // query to insert record
//$sql = "INSERT INTO Items (name,price,uid) VALUES ('$data->itemName','$data->itemPrice', '$data->itemUID')";

//1 = add | 2 = delete
if($data->command == 1){
    $sql = "INSERT INTO tableList (id,active) VALUES ('$data->tableNo','$active')";
}elseif($data->command == 2){
    $sql = "DELETE FROM Items WHERE id ='$data->tableNo'";
}


//prepare query 
$stmt = $db->prepare($sql);

//execute query
if($stmt->execute()){
    echo '{';
        echo '"message": "Thành công (bàn)"';
    echo '}';
}else{
    echo '{';
        echo '"message": "Thất bại (bàn)"';
    echo '}';
}
?>