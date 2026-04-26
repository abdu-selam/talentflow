<?php
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../utils/cookie.php";

    session_destroy();
    if (isset($_COOKIE["user"])) {
        cookie_deleter();
    }

    $data = [
        "status" => "success",
        "message" => "user loged out"
    ];

    response($data, 200);
    exit;

?>