<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/freelancer_profile_services.php";
require_once "../services/client_profile_service.php";
require_once "../utils/validation.php";

$method = $_SERVER["REQUEST_METHOD"];
if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

if ($method == "GET") {
    $needed_user = "";
    if (isset($_GET["uname"])) {
        $needed_user = $users->get_user_by_username($_GET["uname"]);
        if (!$needed_user) {
            $needed_user = $users->get_user_by_username($_SESSION["user"]);
        }
    } else {
        $needed_user = $users->get_user_by_username($_SESSION["user"]);
    }


    $data = [
        "status" => "success",
        "message" => $needed_user["roll"] == "freelancer" ? profileDataConstructor($needed_user) : profileDataConstructorClient($needed_user)
    ];

    response($data, 200);
    exit;
} else if ($method == "POST") {
    $user = $users->get_user_by_username($_SESSION["user"]);

    $type = isset($_GET["type"]) ? $_GET["type"] : "";
    if ($type == "pp") {
        if (!isset($_FILES["profile"])) {
            $data = [
                "status" => "error",
                "message" => "No file provided"
            ];

            response($data, 403);
            exit;
        }

        $file = $_FILES["profile"];
        $result = ppValidator($file);
        if (!$result["status"]) {
            response($result["message"], 403);
            exit;
        }

        $newName = $user["id"] . "-profile-" . time() . "." . $result['ext'];

        $uploadDir = "../../uploads/profiles";
        $destination = $uploadDir . "/" . $newName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($file["tmp_name"], $destination)) {
            $previous = $user["profile"];
            if ($previous) {
                if (file_exists("../../uploads/profiles/$previous")) {
                    unlink("../../uploads/profiles/$previous");
                }
            }

            $users->update_profile($user["id"], $newName);
            $data = [
                "status" => "success",
                "message" => $newName
            ];

            response($data, 200);
            exit;
        }
        $data = [
            "status" => "error",
            "message" => "Internal Server Error"
        ];

        response($data, 500);
        exit;

    } else {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);
        if ($type == "about") {
            $texts = $data["texts"];
            if (count($texts) == 0) {
                $data = [
                    "status" => "success",
                    "message" => "No data provided"
                ];

                response($data, 100);
                exit;
            }

            $text_to_db = json_encode($texts, JSON_UNESCAPED_UNICODE);
            $res = $user["roll"] == "freelancer" ?
                $freelancers->update_about($user["id"], $text_to_db) :
                $clients->update_about($user["id"], $text_to_db);
            if ($res) {
                $updated_roll = $user["roll"] == "freelancer" ?
                    $freelancers->get_freelancer_by_userid($user["id"]) :
                    $clients->get_client_by_userid($user["id"]);
                $data = [
                    "status" => "success",
                    "message" => json_decode($updated_roll["about"], true)
                ];

                response($data, 200);
                exit;
            }

            $data = [
                "status" => "error",
                "message" => "Internal Server Error"
            ];

            response($data, 500);
            exit;

        } else if ($type == "skill") {
            do {
                $id = idGenerator("user");
                $skill = $skills->get_skill_by_id($id);
            } while ($skill);
            $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);

            $res = $skills->create($id, $freelancer["id"], $data["name"], $data["level"], $data["type"]);
            if ($res) {
                $data = [
                    "status" => "success",
                    "message" => $skills->get_skill_by_id($id)
                ];

                response($data, 200);
                exit;
            }

            $data = [
                "status" => "error",
                "message" => "Internal Server Error"
            ];

            response($data, 500);
            exit;

        } else if ($type == "resume") {
            if (!isset($_FILES["resume"])) {
                $data = [
                    "status" => "error",
                    "message" => "No file provided"
                ];

                response($data, 403);
                exit;
            }

            $file = $_FILES["resume"];
            $result = resumeValidator($file);
            if (!$result["status"]) {
                response($result["message"], 403);
                exit;
            }

            $newName = $user["id"] . "-resume-" . time() . "." . $result['ext'];

            $uploadDir = "../../uploads/resumes";
            $destination = $uploadDir . "/" . $newName;

            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            if (move_uploaded_file($file["tmp_name"], $destination)) {
                $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);
                $previous = $freelancer["resume"];
                if ($previous) {
                    if (file_exists("../../uploads/resumes/$previous")) {
                        unlink("../../uploads/resumes/$previous");
                    }
                }

                $freelancers->update_resume($user["id"], $newName);
                $data = [
                    "status" => "success",
                    "message" => $newName
                ];

                response($data, 200);
                exit;
            }
            $data = [
                "status" => "error",
                "message" => "Internal Server Error"
            ];

            response($data, 500);
            exit;

        } else {
            $fname = nameValidator($data["firstName"]) ? $data["firstName"] : $user["first_name"];
            $lname = nameValidator($data["lastName"]) ? $data["lastName"] : $user["last_name"];

            $users->update_names($user["id"], $fname, $lname);
            if ($user["roll"] == "freelancer") {
                $freelancers->update_address_headline($user["id"], $data["address"], $data["headline"]);
            } else if ($user["roll"] == "client") {
                $clients->update_address_headline($user["id"], $data["address"], $data["headline"]);
            }

            $user = $users->get_user_by_username($_SESSION["user"]);
            $updated_roll = null;
            if ($user["roll"] == "freelancer") {
                $updated_roll = $freelancers->get_freelancer_by_userid($user["id"]);
            } elseif ($user["roll"] == "client") {
                $updated_roll = $clients->get_client_by_userid($user["id"]);
            }

            $data = [
                "status" => "success",
                "message" => [
                    "fname" => $user["first_name"],
                    "lname" => $user["last_name"],
                    "address" => $updated_roll ? $updated_roll["address"] : null,
                    "headline" => $updated_roll ? $updated_roll["headline"] : null,
                ]
            ];

            response($data, 200);
            exit;
        }
    }
} else if ($method == "DELETE") {
    $type = isset($_GET["type"]) ? $_GET["type"] : null;
    if ($type == "skill") {
        $id = isset($_GET["id"]) ? $_GET["id"] : null;
        if ($id) {
            $res = $skills->delete($id);
            if ($res) {

                response([], 204);
                exit;
            }

        }
        $data = [
            "status" => "error",
            "message" => "Internal Server Error"
        ];

        response($data, 500);
        exit;
    }
}

?>