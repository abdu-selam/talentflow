<?php
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../services/freelancer_profile_services.php";
require_once "../utils/validation.php";

if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "GET") {
    $user = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["user"];
    $user_data = $users->get_user_by_username($user);
    if (!$user_data) {
        $data = [
            "status" => "error",
            "message" => "Unknown user"
        ];

        response($data, 401);
        exit;
    }

    if ($user_data["roll"] != "freelancer") {
        $data = [
            "status" => "error",
            "message" => "Unknown user"
        ];

        response($data, 401);
        exit;
    }

    $freelancer = $freelancers->get_freelancer_by_userid($user_data["id"]);
    $portfolio = $portfolios->get_portfolios_by_freelancer_id($freelancer["id"]);

    $portfolio_data = array_map(function ($item) {

        return [
            "id" => $item["id"],
            "title" => $item["title"],
            "descriptions" => json_decode($item["descriptions"], true),
            "images" => json_decode($item["images"], true),
            "start_date" => [
                "content" => date("Y, M d", strtotime($item['start_date'])),
                "elem" => date("Y-m-d", strtotime($item['start_date'])),
            ],
            "end_date" => [
                "content" => date("Y, M d", strtotime($item['end_date'])),
                "elem" => date("Y-m-d", strtotime($item['end_date'])),
            ],
        ];
    }, $portfolio);

    if (isset($_GET["portfolio-id"])) {
        $id = $_GET["portfolio-id"];
        $needed = null;

        foreach ($portfolio_data as $item) {
            if ($item["id"] == $id) {
                $needed = $item;
                break;
            }
        }


        if (!$needed) {
            $data = [
                "status" => "error",
                "message" => "Invalid portfolio Id provided"
            ];

            response($data, 400);
            exit;
        }

        $data = [
            "status" => "success",
            "message" => $needed
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "success",
        "message" => $portfolio_data
    ];

    response($data, 200);
    exit;
} elseif ($method == "POST") {
    $user_data = $users->get_user_by_username($_SESSION["user"]);
    $freelancer = $freelancers->get_freelancer_by_userid($user_data["id"]);
    $date_pattern = "/^\d{4}-\d{2}-\d{2}$/";

    $title = $_POST["title"];

    $start_date = isset($_POST["startDate"]) ? $_POST["startDate"] : "";
    if (preg_match($date_pattern, $start_date)) {
        $date = new DateTime($_POST["startDate"]);
        $start_date = $date->format("Y-m-d H:i:s");
        ;
    } else {
        $start_date = null;
    }

    $end_date = isset($_POST["endDate"]) ? $_POST["endDate"] : "";

    if (preg_match($date_pattern, $end_date)) {
        $date = new DateTime($_POST["endDate"]);
        $end_date = $date->format("Y-m-d H:i:s");
    } else {
        $end_date = null;
    }

    if ($start_date > $end_date) {
        $start_date = null;
        $end_date = null;
    }

    $description = json_encode(json_decode($_POST["description"], true), JSON_UNESCAPED_UNICODE);

    if (isset($_GET["id"])) {
        $id = $_GET["id"];

        $portfolio = $portfolios->get_portfolio_by_id($id);

        if (!$portfolio) {
            $data = [
                "status" => "error",
                "message" => "Invalid Id"
            ];

            response($data, 409);
            exit;
        }

        $images = [];
        if (isset($_FILES["images"])) {
            $files = $_FILES["images"];
            $images = portfolio_images_uploader($files, $user_data["id"]);
        }

        $imgs = json_decode($portfolio["images"], true);
        foreach ($images as $item) {
            array_push($imgs, $item);
        }

        $images = json_encode($imgs, JSON_UNESCAPED_UNICODE);
        $res = $portfolios->update($portfolio["id"], $title, $description, $images, $start_date, $end_date);

        if ($res) {
            $data = [
                "status" => "success",
                "message" => "Portfolio updated successfully"
            ];

            response($data, 200);
            exit;
        }

        $data = [
            "status" => "error",
            "message" => "Internal server error"
        ];

        response($data, 500);
        exit;
    }

    $images = json_encode([], JSON_UNESCAPED_UNICODE);
    if (isset($_FILES["images"])) {
        $files = $_FILES["images"];
        $images = json_encode(portfolio_images_uploader($files, $user_data["id"]), JSON_UNESCAPED_UNICODE);
    }

    do {
        $id = idGenerator("port");
        $portfolio = $portfolios->get_portfolio_by_id($id);
    } while ($portfolio);

    $res = $portfolios->create($id, $freelancer["id"], $title, $description, $images, $start_date, $end_date);

    if ($res) {
        $data = [
            "status" => "success",
            "message" => "Portfolio created successfully"
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal server error"
    ];

    response($data, 500);
    exit;

} elseif ($method == "DELETE") {
    if (!isset($_GET["name"]) || !isset($_GET["id"])) {
        $data = [
            "status" => "error",
            "message" => "Id required"
        ];

        response($data, 409);
        exit;
    }
    $name = $_GET["name"];
    $id = $_GET["id"];

    $portfolio = $portfolios->get_portfolio_by_id($id);

    if (!$portfolio) {
        $data = [
            "status" => "error",
            "message" => "Invalid Id"
        ];

        response($data, 409);
        exit;
    }

    $imgs = json_decode($portfolio["images"], true);
    $filtered = [];
    foreach ($imgs as $item) {
        if ($item != $name) {
            array_push($filtered, $item);
        }
    }

    $imgs = json_encode($filtered, JSON_UNESCAPED_UNICODE);

    $res = $portfolios->update_portfolio_images($id, $imgs);
    if ($res) {
        response([], 204);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal server error"
    ];

    response($data, 500);
    exit;
}

?>