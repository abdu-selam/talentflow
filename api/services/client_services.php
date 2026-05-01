<?php
require_once "../index.php";

function proposal_stat($cid)
{
    global $applications;

    $proposals = $applications->get_all_proposals_client($cid);

    $data = [];

    $data["total"] = count($proposals);
    $data["unread"] = count(
        array_filter($proposals, function ($each) {
            return $each["status"] == "pending";
        })
    );

    $data["accepted"] = count(
        array_filter($proposals, function ($each) {
            return $each["status"] == "approve";
        })
    );

    $data["reject"] = count(
        array_filter($proposals, function ($each) {
            return $each["status"] == "reject";
        })
    );

    return $data;
}

function active_proposals($cid)
{
    global $applications;

    $proposals = $applications->get_all_proposals_client($cid);
    $active_proposals = [];
    foreach ($proposals as $each) {
        if ($each["status"] == "pending") {
            $data = [
                "title" => $each["title"],
                "message" => $each["message"],
                "fname" => $each["ffname"],
                "lname" => $each["flname"],
            ];
            array_push($active_proposals, $each);
        }
    }

    return $active_proposals;
}

function jobs_stat($cid)
{
    global $jobs;

    $jobs_list = $jobs->get_jobs_by_clientid($cid);

    $data = [];

    $data["total"] = count($jobs_list);
    $data["ongoing"] = count(
        array_filter($jobs_list, function ($each) {
            return $each["status"] == "active";
        })
    );

    $data["hired"] = count(
        array_filter($jobs_list, function ($each) {
            return $each["status"] == "closed";
        })
    );

    $data["finished"] = count(
        array_filter($jobs_list, function ($each) {
            return $each["status"] == "finished";
        })
    );

    return $data;
}

function active_jobs($cid)
{
    global $jobs;

    $jobs_list = $jobs->get_jobs_by_clientid($cid);
    $active_jobs = [];
    foreach ($jobs_list as $each) {
        if ($each["status"] == "active") {
            $data = [
                "title" => $each["title"],
                "description" => $each["description"],
                "category" => $each["category"],
            ];
            array_push($active_jobs, $each);
        }
    }

    return $active_jobs;
}

?>