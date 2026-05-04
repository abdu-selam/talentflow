<?php
require_once "../utils/validation.php";
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../utils/cookie.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "POST") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $email = $data["email"];
    $password = $data["password"];

    if (!emailValidator($email)) {
        $data = [
            "status" => "error",
            "message" => "Invalid Cridentials 1"
        ];

        response($data, 401);
        exit;
    }

    $email = htmlspecialchars(trim($email));

    $user = $users->get_user_by_email($email);
    if (!$user) {
        $data = [
            "status" => "error",
            "message" => "Invalid Cridentials 2"
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

    if ($user["isVerified"] == 0) {
        $diff = (time() - strtotime($user["created_at"])) / 60;
        if ($diff > 30) {
            // $users->delete($user["id"]);
            $data = [
                "status" => "error",
                "message" => "Invalid Cridentials 3 " . $diff
            ];

            response($data, 401);
            exit;
        }
    }

    $_SESSION["user"] = $user["user_name"];
    if ($data["remember"]) {
        cookie_setter(cookieTokenGenerator($user["id"]));
    }

    if ($user["isVerified"] == 0) {
        $data = [
            "status" => "error",
            "message" => "Verify email"
        ];

        response($data, 409);
        exit;
    }

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