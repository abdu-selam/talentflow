<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/message_services.php";

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

    $uname = $_SESSION["user"];
    $user = $users->get_user_by_username($uname);

    if (!$user) {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 409);
        exit;
    }

    if (isset($_GET["id"])) {
        $other = $users->get_user_by_id($_GET["id"]);
        if (!$user) {
            $data = [
                "status" => "error",
                "message" => "Un Authenticated"
            ];

            response($data, 409);
            exit;
        }

        $message = messageConstructor($user["id"], $other["id"]);
        $data = [
            "status" => "success",
            "message" => $message
        ];

        response($data, 200);
        exit;
    }

    if (!isset($_GET["uname"])) {
        $messages_list = $messages->get_message_by_userid($user["id"]);
        $data = [
            "status" => "success",
            "message" => messageUsers($messages_list, $user["id"])
        ];

        response($data, 200);
        exit;
    }

}

?>