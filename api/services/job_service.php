<?php
require_once "../index.php";

function job_list_constructor($jobs){
    $data = [];
    foreach($jobs as $job) {
        $item = [
            "id" => $job["id"],
            "title" => $job["title"],
            "post_date" => date("Y-m-d", strtotime($job["post_date"])),
            "deadline" => date("Y-m-d", strtotime($job["deadline"])),
            "salary" => $job["salary"],
            "job_type" => $job["job_type"],
            "address" => $job["address"],
            "description" => $job["description"],
        ];
        array_push($data, $item);
    }

    return $data;
}

?>