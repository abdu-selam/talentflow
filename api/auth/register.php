<?php
require_once "../utils/validation.php";
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../utils/cookie.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "POST") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $fname = $data["fname"];
    $lname = $data["lname"];
    $email = $data["email"];
    $password = $data["password"];
    $roll = $data["roll"];

    if (!nameValidator($fname) || !emailValidator($email) || !passwordValidator($password)) {
        $data = [
            "status" => "error",
            "message" => "Invalid Inputs"
        ];

        response($data, 400);
        exit;
    }

    $email = htmlspecialchars(trim($email));

    $isExist = $users->get_user_by_email($email);
    if ($isExist) {
        $data = [
            "status" => "error",
            "message" => "User Exists"
        ];

        response($data, 409);
        exit;
    }

    $fname = htmlspecialchars(trim($fname));
    $lname = isset($lname) ? htmlspecialchars(trim($lname)) : "";
    $pass_hash = password_hash($password, PASSWORD_DEFAULT);

    $roll = in_array(strtolower($roll), ["freelancer", "client"]) ? strtolower($roll) : "freelancer";

    do {
        $id = idGenerator("user");
        $user = $users->get_user_by_id($id);
    } while ($user);

    $prefix = $roll === "freelancer" ? "free" : "clie";

    do {
        $fid = idGenerator($prefix);
        $user_data = "";
        if ($roll === "freelancer") {
            $user_data = $freelancers->get_freelancer_by_id($fid);
        } else {
            $user_data = $clients->get_client_by_id($fid);
        }
    } while ($user_data);

    do {
        $uname = unameGenerator();
        $user = $users->get_user_by_username($uname);
    } while ($user);

    $isCreated = $users->create($id, $fname, $lname, $uname, $email, $pass_hash, $roll);

    if ($isCreated) {
        if ($roll === "freelancer") {
            $freelancers->create($fid, $id);
        } else {
            $clients->create($fid, $id);
        }

        $_SESSION["user"] = $uname;
        if ($data["remember"]) {
            cookie_setter($uname);
        }

        $data = [
            "status" => "success",
            "message" => [
                "roll" => $roll
            ]
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal Server Error"
    ];

    response($data, 500);
    exit;
}

?>