<?php
require_once "../index.php";

function job_list_constructor($jobs)
{
    $data = [];
    foreach ($jobs as $job) {
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

function filtered_jobs($jobs, $filters)
{
    $type_filtered = type_filter($jobs, $filters["types"]);
    $category_filtered = category_filter($type_filtered, $filters["category"]);

    return job_list_constructor($category_filtered);
}

function type_filter($jobs, $types)
{
    if (count($types) == 0 || count($types) == 3) {
        return $jobs;
    }

    $fitered = [];
    foreach ($jobs as $job) {
        if (in_array($job["job_type"], $types)) {
            array_push($fitered, $job);
        }
    }

    return $fitered;
}

function category_filter($jobs, $category)
{
    if ($category == "") {
        return $jobs;
    }

    $fitered = [];
    foreach ($jobs as $job) {
        if (strtolower($job["job_type"]) == strtolower($category)) {
            array_push($fitered, $job);
        }
    }

    return $fitered;
}


?>