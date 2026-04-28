<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";
require_once "../services/freelancer_service.php";

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
        $client = $clients->get_client_by_id($job["client_id"]);

        $client_user = $users->get_user_by_id($client["user_id"]);

        do {
            $id = idGenerator("msg");
            $msg = $messages->get_message_by_id($id);
        } while ($msg);

        $messages->create($id, $user["id"], $client_user["id"], json_encode([$message]));
        $messages->make_proposal($id);

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


} else if ($method == "GET") {
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

    if ($user["roll"] == "freelancer") {
        $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);
        $application_list = $applications->get_all_proposals($freelancer["id"]);

        $data = [
            "status" => "success",
            "message" => [
                "statistic" => proposalStat($freelancer["id"]),
                "applications" => $application_list
            ]
        ];

        response($data, 200);
        exit;
    }
}

?>