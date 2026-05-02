<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/job_service.php";

if (isset($_GET["t"])) {
    $job_list = $jobs->get_fuzzy($_GET["t"], $_GET["t"]);
    $job_cons = fuzzy_constructor($job_list);

    $data = [
        "status" => "success",
        "message" => $job_cons
    ];

    response($data, 200);
    exit;
}

if (isset($_GET["q"])) {
    $job_list = $jobs->get_fuzzy($_GET["q"], $_GET["q"]);
    $constructed_jobs = job_list_constructor($job_list);

    $data = [
        "status" => "success",
        "message" => $constructed_jobs
    ];

    response($data, 200);
    exit;
}

?>