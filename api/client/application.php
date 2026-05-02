<?php
require_once "../index.php";
require_once "../utils/responce.php";

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

if (isset($_GET["ustat"])) {
    if (!isset($_GET["id"])) {
        $data = [
            "status" => "error",
            "message" => "Id Required"
        ];

        response($data, 401);
        exit;
    }

    $application = $applications->get_application_by_id($_GET["id"]);
    if (!$application) {
        $data = [
            "status" => "error",
            "message" => "Invalid Id"
        ];

        response($data, 401);
        exit;
    }

    $allowed = ["approve", "reject"];
    if ($_GET["ustat"] == "finish") {
        $job = $jobs->get_job_by_id($application["job_id"]);
        if ($job["status"] != "closed") {
            $data = [
                "status" => "error",
                "message" => "Invalid operation"
            ];

            response($data, 401);
            exit;
        }

        $res = $jobs->fininsh_job($application["job_id"]);
        $res = $applications->update_status($application["id"], $_GET["ustat"]);
        if ($res) {
            $data = [
                "status" => "success",
                "message" => [
                    "id" => $application["id"],
                    "status" => ""
                ]
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

    if (!in_array($_GET["ustat"], $allowed)) {
        $data = [
            "status" => "error",
            "message" => "Invalid Type"
        ];

        response($data, 401);
        exit;
    }

    $res = $applications->update_status($application["id"], $_GET["ustat"]);
    if ($res) {
        if ($_GET["ustat"] == "approve") {
            $jobs->update_status($application["job_id"], "closed");
        }

        $data = [
            "status" => "success",
            "message" => [
                "id" => $application["id"],
                "status" => $_GET["ustat"]
            ]
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

if (isset($_GET["job"])) {
    $job = $jobs->get_job_by_id($_GET["job"]);

    if (!$job) {
        $data = [
            "status" => "error",
            "message" => "Invalid Type"
        ];

        response($data, 401);
        exit;
    }

    $res = $applications->get_applications_by_job_id($job["id"]);

    $data = [
        "status" => "success",
        "message" => $res
    ];

    response($data, 200);
    exit;
}

$client = $clients->get_client_by_userid($user["id"]);
$active_proposals = $applications->get_applys_by_client_id($client["id"]);

$data = [
    "status" => "success",
    "message" => $active_proposals
];

response($data, 200);
exit;

?>