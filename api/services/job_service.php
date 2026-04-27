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
    $sorted_jobs = sort_filter($category_filtered, $filters["sortBy"], $filters["order"]);

    return job_list_constructor($sorted_jobs);
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

function sort_filter($jobs, $sort_type, $order)
{
    $types = ["date" => "post_date", "name" => "title", "salary" => "salary"];

    if ($order == "acc") {
        usort($jobs, function ($a, $b) {
            global $types;
            global $sort_type;
            return $a[$types[$sort_type]] <=> $b[$types[$sort_type]];
        });
    } else {
        usort($users, function ($a, $b) {
            global $types;
            global $sort_type;
            return $b[$types[$sort_type]] <=> $a[$types[$sort_type]];
        });
    }

    return $jobs;
}

?>