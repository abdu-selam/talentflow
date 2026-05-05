<?php
require_once "../index.php";
require_once "../services/freelancer_service.php";
require_once "../utils/responce.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "GET") {
    if (!isset($_SESSION["user"])) {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 409);
        exit;
    }

    $user = $users->get_user_by_username($_SESSION["user"]);
    $rating_list = $user["roll"] == "freelancer" ? rating_constructor($user["id"]) : rating_constructor_admin();

    $data = [
        "status" => "success",
        "message" => $rating_list
    ];

    response($data, 200);
    exit;
}

?>