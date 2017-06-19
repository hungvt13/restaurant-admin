<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$sql = "SELECT id, active FROM tableList";

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
        //echo "id: " . $row["id"]. " - isAvailable: " . $row["active"]. "<br>";
       $product_item=array(
            "id" => $id,
            "active" => $active,
        );
       array_push($products_arr, $product_item);
    }
    echo json_encode($products_arr);
} else {
    echo "0 results";
}
?>