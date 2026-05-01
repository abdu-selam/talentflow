<?php
require_once "../services/freelancer_service.php";
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/job_service.php";

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

if (isset($_GET["job"])) {
    $job = $jobs->get_job_by_id($_GET["job"]);

    if (!$job) {
        $data = [
            "status" => "error",
            "message" => "Invalid request"
        ];

        response($data, 401);
        exit;
    }

    $client = $clients->get_client_by_id($job["client_id"]);
    $user = $users->get_user_by_id($client["user_id"]);
    unset($job["client_id"]);

    $job_count = count($jobs->get_jobs_by_clientid($client["id"]));

    $job["client"] = $user["first_name"] . " " . $user["last_name"];
    $job["count"] = $job_count;

    $uname = isset($_SESSION["user"]) ? $_SESSION["user"] : "";
    $user = $users->get_user_by_username($uname);

    if ($user["roll"] == "freelancer") {
        $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);
        $application = $applications->get_application_by_freelancer_id_and_job_id($freelancer["id"], $job["id"]);
        if (!$application) {
            $job["apllication"] = null;
        } else {
            $job["apllication"] = $application["message"];
        }
    }

    $data = [
        "status" => "success",
        "message" => $job
    ];

    response($data, 200);
    exit;
}

if (isset($_GET["client"])) {
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

    if (!$user || $user["roll"] != "client") {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 401);
        exit;
    }

    $client = $clients->get_client_by_userid($user["id"]);
    $job_list = $jobs->get_jobs_by_clientid($client["id"]);
    $constructed_jobs = job_list_constructor($job_list);

    $data = [
        "status" => "success",
        "message" => $constructed_jobs
    ];

    response($data, 200);
    exit;
}

$job_list = $jobs->get_jobs();
$constructed_jobs = job_list_constructor($job_list);

$data = [
    "status" => "success",
    "message" => $constructed_jobs
];

response($data, 200);
exit;

?>