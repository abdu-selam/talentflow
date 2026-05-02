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
            "status" => $job["status"],
            "job_type" => $job["job_type"],
            "address" => $job["address"],
            "description" => $job["description"],
        ];
        array_push($data, $item);
    }

    return $data;
}

function fuzzy_constructor($jobs)
{
    $data = [];
    foreach ($jobs as $job) {
        $item = [
            "id" => $job["id"],
            "title" => $job["title"],
            "category" => $job["category"],
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
        if (strtolower($job["category"]) == strtolower($category)) {
            array_push($fitered, $job);
        }
    }

    return $fitered;
}

function job_update_data_constructor($data)
{
    $res = [
        "title" => $data["title"],
        "salary" => $data["salary"],
        "address" => $data["address"],
        "category" => $data["category"],
        "description" => $data["description"],
        "job_type" => $data["jobtype"],
        "requirements" => json_encode($data["requirements"]),
        "responsibilities" => json_encode($data["responsibilities"]),
    ];
    $date_pattern = "/^\d{4}-\d{2}-\d{2}$/";

    $deadline = isset($data["deadline"]) ? $data["deadline"] : "";
    if (preg_match($date_pattern, $deadline)) {
        $date = new DateTime($data["deadline"]);
        $deadline = $date->format("Y-m-d H:i:s");
    } else {
        $deadline = null;
    }

    $res["deadline"] = $deadline;

    return $res;
}

?>