<?php
require_once "../services/freelancer_service.php";
require_once "../index.php";
require_once "../utils/responce.php";

if (isset($_GET["type"])) {
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

        response($data, 401);
        exit;
    }

    if ($_GET["type"] != "active") {
        $data = [
            "status" => "error",
            "message" => "Invalid request"
        ];

        response($data, 401);
        exit;
    }
    $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);

    $active_jobs = activeJobs($freelancer["id"]);

    $data = [
        "status" => "success",
        "message" => $active_jobs
    ];

    response($data, 200);
    exit;
}
?>