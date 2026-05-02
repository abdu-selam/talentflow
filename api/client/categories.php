<?php
require_once "../index.php";
require_once "../utils/responce.php";

$category_list = $catagories->get_categories();

$data = [
    "status" => "success",
    "message" => $category_list
];

response($data, 200);
exit;

?>