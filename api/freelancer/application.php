<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "POST") {

    if (!isset($_GET["job"])) {
        $data = [
            "status" => "error",
            "message" => "Invalid job id"
        ];

        response($data, 409);
        exit;
    }

    $job = $jobs->get_job_by_id($_GET["job"]);

    if (!$job) {
        $data = [
            "status" => "error",
            "message" => "Invalid job id"
        ];

        response($data, 409);
        exit;
    }

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

    if (!$user || $user["roll"] != "freelancer") {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 409);
        exit;
    }

    $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $message = $data["message"];
    if ($message == "") {
        if (!$user || $user["roll"] != "freelancer") {
            $data = [
                "status" => "error",
                "message" => "Message requered"
            ];

            response($data, 401);
            exit;
        }
    }

    do {
        $id = idGenerator("appl");
        $application = $applications->get_application_by_id($id);
    } while ($application);

    $res = $applications->create($id, $job["id"], $freelancer["id"], $message);
    if ($res) {
        $jobs->update_apply_count($job["id"], $job["apply_count"] + 1);
        $data = [
            "status" => "success",
            "message" => $job["apply_count"] + 1
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal server error"
    ];

    response($data, 500);
    exit;


}

?>