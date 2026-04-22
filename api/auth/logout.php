<?php
require_once "../utils/responce.php";
require_once "../index.php";

    session_destroy();

    $data = [
        "status" => "success",
        "message" => "user loged out"
    ];

    response($data, 200);
    exit;

?>