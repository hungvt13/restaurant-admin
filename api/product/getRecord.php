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

// DYNAMIC LOAD

//{"command":"1", "year": "input_year","month:"input_month","date":"input_date"}

//{"command":"2", "year": "input_year","month:"input_month","date":"input_date" ,
// "year_end": "input_year","month_end:"input_month","date_end":"input_date"}


// get posted data
$data = json_decode(file_get_contents("php://input"));
$year = "year".$data->year;
$sql;

if($data->command == 1){
    $sql = "SELECT * FROM ".$year." WHERE month = '".$data->month."' AND day = '".$data->day."'";
}
elseif($data-> command == 2){
    $sql = "SELECT * FROM ".$year." WHERE (month BETWEEN '".$data->month."' AND '".$data->month_end."') AND (day BETWEEN '".$data->day."' AND '".$data->day_end."')";
}



//----------------------------------------------

 $stmt = $db->prepare($sql);
 $stmt->execute();
 $num = $stmt->rowCount();

 if ($num > 0) {
    // products array
    $products_arr=array();
    //$products_arr["records"]=array();
    // output data of each row
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
       $product_item=array(
            "uid" => $uid,
            "quantity" => $quantity,
            "month" => $month,
            "day" => $day,
            "created" => $created,
        );
       array_push($products_arr, $product_item);
    }
    echo json_encode($products_arr);
} else {
    echo '{';
        echo '"message": "Thất bại"';
    echo '}';
}


?>