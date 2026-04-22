<?php
require_once "../utils/validation.php";
require_once "../utils/responce.php";
require_once "../index.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "POST") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $email = $data["email"];
    $password = $data["password"];

    if (!emailValidator($email)) {
        $data = [
            "status" => "error",
            "message" => "Invalid Cridentials"
        ];

        response($data, 401);
        exit;
    }

    $email = htmlspecialchars(trim($email));

    $user = $users->get_user_by_email($email);
    if (!$user) {
        $data = [
            "status" => "error",
            "message" => "Invalid Cridentials"
        ];

        response($data, 401);
        exit;
    }

    if (!password_verify($password, $user["password"])) {
        $data = [
            "status" => "error",
            "message" => "Invalid Cridentials"
        ];

        response($data, 401);
        exit;
    }

    $_SESSION["user"] = $user["user_name"];

    $data = [
        "status" => "success",
        "message" => [
            "roll" => $user["roll"]
        ]
    ];

    response($data, 200);
    exit;
}

?>