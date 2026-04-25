<?php
require_once __DIR__ . "/../index.php";
require_once __DIR__ . "/../utils/responce.php";
require_once __DIR__ . "/../services/freelancer_service.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "GET") {
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

    $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);


    $proposal_stat = proposalStat($freelancer["id"]);
    $active_proposals = array_slice(activeProposals($freelancer["id"]), 0, 4);

    $job_stat = jobStat($freelancer["id"]);
    $active_jobs = array_slice(activeJobs($freelancer["id"]), 0, 4);

    $latest_ratings = array_slice(rating_constructor($user["id"]), 0, 4);

    $profile_stat = profileStat($freelancer["id"], $user["id"]);

    $portfolio_sample = array_slice(portfolio_constructor($freelancer["id"]), 0, 4);

    $data = [
        "status" => "success",
        "message" => [
            "proposal_stat" => $proposal_stat,
            "active_proposals" => $active_proposals,
            "job_stat" => $job_stat,
            "active_jobs" => $active_jobs,
            "latest_ratings" => $latest_ratings,
            "profile_stat" => $profile_stat,
            "portfolio_sample" => $portfolio_sample,
        ]
    ];

    response($data, 200);
    exit;
}
?>