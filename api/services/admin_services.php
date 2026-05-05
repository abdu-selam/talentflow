<?php
require_once "../index.php";

function users_stat()
{
    global $users;

    $users_list = $users->get_users();

    $data = [];

    $total = 0;
    $freelancers = 0;
    $clients = 0;
    foreach ($users_list as $user) {
        if ($user["roll"] != "admin") {
            $total++;
        }
        if ($user["roll"] == "freelancer") {
            $freelancers++;
        }
        if ($user["roll"] == "client") {
            $clients++;
        }
    }
    $data["total"] = $total;
    $data["freelancers"] = $freelancers;

    $data["clients"] = $clients;

    return $data;
}

function newest_users()
{
    global $users;

    $users_list = $users->get_users_newest();
    $latest_users = [];
    foreach ($users_list as $each) {
        if ($each["roll"] != "admin") {
            $data = [
                "uname" => $each["user_name"],
                "pp" => $each["profile"],
                "fname" => $each["first_name"],
                "lname" => $each["last_name"],
                "date" => $each["created_at"],
                "roll" => $each["roll"],
            ];
            array_push($latest_users, $data);
        }
    }

    return $latest_users;
}

function jobs_stat()
{
    global $jobs;

    $jobs_list = $jobs->get_jobs();

    $data = [];

    $total = 0;
    $hired = 0;
    $ongoing = 0;
    $finished = 0;
    foreach ($jobs_list as $job) {
        $total++;
        if ($job["status"] != "active") {
            $ongoing++;
        }
        if ($job["status"] == "closed") {
            $hired++;
        }
        if ($job["status"] == "finished") {
            $finished++;
        }
    }
    $data["total"] = $total;
    $data["hired"] = $hired;
    $data["ongoing"] = $ongoing;
    $data["finished"] = $finished;

    return $data;
}

function newest_jobs()
{
    global $jobs;

    $jobs_list = $jobs->get_jobs_newest();
    $latest_jobs = [];
    foreach ($jobs_list as $each) {
        if ($each["status"] == "active") {
            $data = [
                "title" => $each["title"],
                "category" => $each["category"],
                "description" => $each["description"],
                "id" => $each["id"],
            ];
            array_push($latest_jobs, $data);
        }
    }

    return $latest_jobs;
}

function newest_feedbacks()
{
    global $ratings;
    global $users;

    $ratings_list = $ratings->get_ratings();
    $latest_ratings = [];
    foreach ($ratings_list as $each) {
        if ($each["rating_type"] = "system") {
            $user = $users->get_user_by_id($each["giver_id"]);
            $data = [
                "fname" => $user["first_name"],
                "lname" => $user["last_name"],
                "profile" => $user["profile"],
                "message" => $each["message"],
                "amount" => $each["amount"],
            ];
            array_push($latest_ratings, $data);
        }

    }

    return $latest_ratings;
}
?>