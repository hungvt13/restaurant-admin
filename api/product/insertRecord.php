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

$year = date("Y");
$year = "year".$year;
 // query to insert record

//if record not exists create
$sql = "CREATE TABLE IF NOT EXISTS `".$year."`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `month` INT(11) NOT NULL,
    `day` INT(1) NOT NULL,
    `uid` INT(11) NOT NULL,
    `quantity` INT(11) NOT NULL,
    `created` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = MyISAM DEFAULT CHARSET = utf8 AUTO_INCREMENT=0;";

//prepare query 
$stmt = $db->prepare($sql);
$stmt->execute();

//add data to record
 $sql2 = "INSERT INTO year2017 (month, day, uid, quantity, created) VALUES";

 foreach($data as $obj){
     $string = "('".$obj->month."','".$obj->day."','".$obj->itemUID."','".$obj->itemQuantity."','".$obj->itemDate."'),";
     // $string = " ".$obj->itemUID." ";
     $sql2 = $sql2 . $string;
 }
$sql2 = substr($sql2, 0, -1);

 $stmt2 = $db->prepare($sql2);
 
 if($stmt2->execute()){
    echo '{';
        echo '"message": "Nhập dữ liệu thành công."';
    echo '}';
}else{    
    echo '{';
        echo '"message": "Không nhập được dữ liệu."';
    echo '}';
}

?>