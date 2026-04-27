<?php
require_once "../index.php";
require_once "../services/job_service.php";
require_once "../utils/responce.php";

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$job_list = $jobs->get_jobs();
$constructed_jobs = filtered_jobs($job_list, $data);


$data = [
    "status" => "success",
    "message" => $constructed_jobs
];

response($data, 200);
exit;
?>