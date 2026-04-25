<?php
require_once __DIR__ . "/../index.php";

function proposalStat($fid)
{
    global $applications;

    $all_prposals = $applications->get_application_by_freelancer_id($fid);

    $data = [];

    $data["total"] = count($all_prposals);
    $data["pending"] = count(
        array_filter($all_prposals, function ($each) {
            return $each["status"] == "pending";
        })
    );

    $data["accepted"] = count(
        array_filter($all_prposals, function ($each) {
            return $each["status"] == "approve";
        })
    );

    $data["reject"] = count(
        array_filter($all_prposals, function ($each) {
            return $each["status"] == "reject";
        })
    );

    return $data;
}

function jobStat($fid)
{
    global $applications;

    $all_jobs = $applications->get_active_jobs($fid);

    $data = [];

    $data["total"] = count($all_jobs);
    $data["finished"] = count(
        array_filter($all_jobs, function ($each) {
            return $each["status"] == "closed";
        })
    );

    $data["on_going"] = count(
        array_filter($all_jobs, function ($each) {
            return $each["status"] == "active";
        })
    );

    return $data;
}

function activeProposals($fid)
{
    global $applications;
    $data = $applications->get_active_proposals($fid);

    return $data;
}

function activeJobs($fid)
{
    global $applications;
    $data = $applications->get_active_jobs($fid);

    return $data;
}

function profile_progress($fid)
{
    global $freelancers;
    global $users;
    global $portfolios;
    global $skills;

    $fdata = $freelancers->get_freelancer_by_id($fid);
    $udata = $users->get_user_by_id($fdata["user_id"]);
    $pdata = $portfolios->get_portfolios_by_freelancer_id($fid);
    $sdata = $skills->get_skills_by_freelancer_id($fid);

    $progress = 7.5;

    if (!is_null($udata["last_name"])) {
        $progress += 2.5;
    }

    if (!is_null($udata["profile"])) {
        $progress += 5;
    }

    if (!is_null($fdata["headline"])) {
        $progress += 5;
    }

    if (!is_null($fdata["address"])) {
        $progress += 5;
    }

    if (!is_null($fdata["about"])) {
        $progress += 15;
    }

    if (!is_null($fdata["resume"])) {
        $progress += 15;
    }

    if (count($pdata) >= 5) {
        $progress += 25;
    } else {
        $progress += count($pdata) * 5;
    }

    if (count($sdata) >= 5) {
        $progress += 20;
    } else {
        $progress += count($pdata) * 5;
    }

    return $progress;
}

function profileStat($fid, $uid)
{
    global $applications;
    global $ratings;

    $all_applys = $applications->get_application_by_freelancer_id($fid);
    $accepted = array_filter($all_applys, function ($each) {
        return $each["status"] == "approve";
    });

    $acceptance_rate = count($all_applys) > 0 ? (count($accepted) / count($all_applys)) * 100 : 0;

    $all_ratings = $ratings->get_ratings_by_reciever_id($uid);
    $rating_sum = array_reduce($all_ratings, function ($carry, $item) {
        return $carry + $item["amount"];
    }, 0);

    $rating_stat = count($all_ratings) > 0 ? $rating_sum / count($all_ratings) : 0;

    $data = [
        "acceptance" => $acceptance_rate,
        "total_rating" => $rating_stat,
        "profile_progress" => profile_progress($fid)
    ];

    return $data;
}

function rating_constructor($uid)
{
    global $ratings;

    $given_ratings = $ratings->get_ratings_by_reciever_id($uid);

    $filtered = array_map(function ($rating) {
        global $users;

        $giver = $users->get_user_by_id($rating["giver_id"]);

        $data = [
            "id" => $giver["id"],
            "name" => $giver["first_name"] . " " . $giver["last_name"],
            "pp" => $giver["profile"],
            "message" => $rating["message"],
            "amount" => $rating["amount"],
        ];
        return $data;
    }, $given_ratings);

    return $filtered;
}

function portfolio_constructor($fid)
{
    global $portfolios;

    $portfolio_list = $portfolios->get_portfolios_by_freelancer_id($fid);
    $data = array_map(function ($item) {
        $imgs = json_decode($item["images"], true);
        $descs = json_decode($item["descriptions"], true);
        $data = [
            "title" => $item["title"],
            "descriptions" => $descs[0],
            "image" => $imgs[0]
        ];

        return $data;
    }, $portfolio_list);

    return $data;
}

?>