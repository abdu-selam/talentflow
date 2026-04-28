<?php
require_once __DIR__ . "/index.php";
require_once __DIR__ . "/utils/validation.php";

$usersData = [
    ["Abel", "abel", "abel@mail.com", "Abc@1234", "freelancer"],
    ["John", "john", "john@mail.com", "Abc@1234", "freelancer"],
    ["Mike", "mike", "mike@mail.com", "Abc@1234", "freelancer"],
    ["Noah", "noah", "noah@mail.com", "Abc@1234", "freelancer"],
    ["Sam", "sam", "sam@mail.com", "Abc@1234", "freelancer"],
    ["Alex", "alex", "alex@mail.com", "Abc@1234", "freelancer"],
    ["Dan", "dan", "dan@mail.com", "Abc@1234", "freelancer"],
    ["Chris", "chris", "chris@mail.com", "Abc@1234", "freelancer"],
    ["Ben", "ben", "ben@mail.com", "Abc@1234", "freelancer"],
    ["Tom", "tom", "tom@mail.com", "Abc@1234", "freelancer"],
    ["Leo", "leo", "leo@mail.com", "Abc@1234", "freelancer"],
    ["Max", "max", "max@mail.com", "Abc@1234", "freelancer"],

    ["Sara", "sara", "sara@mail.com", "Abc@1234", "client"],
    ["Liya", "liya", "liya@mail.com", "Abc@1234", "client"],
    ["Eden", "eden", "eden@mail.com", "Abc@1234", "client"],
    ["Ruth", "ruth", "ruth@mail.com", "Abc@1234", "client"],
    ["Zara", "zara", "zara@mail.com", "Abc@1234", "client"],

    ["Admin", "Root", "admin@mail.com", "Admin@123", "admin"]
];

$jobsData = [
    [
        "client_id" => "user-5iioot",
        "title" => "Frontend Developer",
        "description" => "Build modern UI using React and ensure responsive design.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["React", "HTML", "CSS", "JavaScript"],
        "responsibilities" => ["Develop UI", "Fix bugs", "Collaborate with backend team"],
        "deadline" => "2026-06-01 23:59:59",
        "salary" => 1200,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "user-9ga50q",
        "title" => "Backend Developer",
        "description" => "Design APIs and manage server-side logic.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["Node.js", "Express", "MongoDB"],
        "responsibilities" => ["Build APIs", "Database design", "Optimize performance"],
        "deadline" => "2026-06-10 23:59:59",
        "salary" => 1500,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "user-9ri9sv",
        "title" => "UI/UX Designer",
        "description" => "Design intuitive user interfaces and experiences.",
        "address" => "Adama, Ethiopia",
        "status" => "active",
        "requirements" => ["Figma", "Adobe XD", "Creativity"],
        "responsibilities" => ["Design wireframes", "User research", "Prototype testing"],
        "deadline" => "2026-06-05 23:59:59",
        "salary" => 1000,
        "job_type" => "full",
        "category" => "Design"
    ],
    [
        "client_id" => "user-h069rq",
        "title" => "Digital Marketer",
        "description" => "Manage social media campaigns and SEO strategies.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["SEO", "Content Marketing", "Analytics"],
        "responsibilities" => ["Run campaigns", "Analyze data", "Improve reach"],
        "deadline" => "2026-06-15 23:59:59",
        "salary" => 900,
        "job_type" => "part",
        "category" => "Marketing"
    ],
    [
        "client_id" => "user-rhshly",
        "title" => "Mobile App Developer",
        "description" => "Develop Android applications using modern frameworks.",
        "address" => "Bahir Dar, Ethiopia",
        "status" => "active",
        "requirements" => ["Kotlin", "Android Studio"],
        "responsibilities" => ["Build apps", "Debug issues", "Publish to Play Store"],
        "deadline" => "2026-06-20 23:59:59",
        "salary" => 1400,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "user-5iioot",
        "title" => "Data Analyst",
        "description" => "Analyze business data and generate insights.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["SQL", "Excel", "Python"],
        "responsibilities" => ["Data cleaning", "Reporting", "Visualization"],
        "deadline" => "2026-06-12 23:59:59",
        "salary" => 1100,
        "job_type" => "full",
        "category" => "Data"
    ],
    [
        "client_id" => "user-9ga50q",
        "title" => "Intern Web Developer",
        "description" => "Assist in building web applications.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Basic HTML", "CSS", "JavaScript"],
        "responsibilities" => ["Support dev team", "Learn codebase"],
        "deadline" => "2026-05-30 23:59:59",
        "salary" => 300,
        "job_type" => "intern",
        "category" => "Software Development"
    ],
    [
        "client_id" => "user-9ri9sv",
        "title" => "Graphic Designer",
        "description" => "Create visual content for branding.",
        "address" => "Mekelle, Ethiopia",
        "status" => "active",
        "requirements" => ["Photoshop", "Illustrator"],
        "responsibilities" => ["Design posters", "Brand assets"],
        "deadline" => "2026-06-18 23:59:59",
        "salary" => 800,
        "job_type" => "part",
        "category" => "Design"
    ],
    [
        "client_id" => "user-h069rq",
        "title" => "Project Manager",
        "description" => "Manage software development lifecycle.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Agile", "Scrum", "Leadership"],
        "responsibilities" => ["Plan tasks", "Manage team", "Track progress"],
        "deadline" => "2026-06-25 23:59:59",
        "salary" => 1600,
        "job_type" => "full",
        "category" => "Management"
    ],
    [
        "client_id" => "user-rhshly",
        "title" => "Content Writer",
        "description" => "Write blog posts and marketing content.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["Writing", "SEO"],
        "responsibilities" => ["Create content", "Edit drafts"],
        "deadline" => "2026-06-08 23:59:59",
        "salary" => 700,
        "job_type" => "part",
        "category" => "Marketing"
    ],
    [
        "client_id" => "user-5iioot",
        "title" => "DevOps Engineer",
        "description" => "Manage CI/CD pipelines and cloud infrastructure.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Docker", "AWS", "CI/CD"],
        "responsibilities" => ["Deploy apps", "Monitor systems"],
        "deadline" => "2026-06-22 23:59:59",
        "salary" => 1700,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "user-9ga50q",
        "title" => "Customer Support",
        "description" => "Handle customer inquiries and issues.",
        "address" => "Dire Dawa, Ethiopia",
        "status" => "active",
        "requirements" => ["Communication", "Problem Solving"],
        "responsibilities" => ["Answer queries", "Resolve issues"],
        "deadline" => "2026-06-14 23:59:59",
        "salary" => 600,
        "job_type" => "part",
        "category" => "Support"
    ],
    [
        "client_id" => "user-9ri9sv",
        "title" => "QA Tester",
        "description" => "Test applications for bugs and issues.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Testing", "Attention to detail"],
        "responsibilities" => ["Write test cases", "Report bugs"],
        "deadline" => "2026-06-09 23:59:59",
        "salary" => 900,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "user-h069rq",
        "title" => "AI Engineer",
        "description" => "Develop machine learning models.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Python", "ML", "TensorFlow"],
        "responsibilities" => ["Train models", "Optimize algorithms"],
        "deadline" => "2026-06-30 23:59:59",
        "salary" => 2000,
        "job_type" => "full",
        "category" => "AI"
    ],
    [
        "client_id" => "user-rhshly",
        "title" => "System Administrator",
        "description" => "Maintain IT infrastructure and servers.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["Linux", "Networking"],
        "responsibilities" => ["Monitor systems", "Ensure uptime"],
        "deadline" => "2026-06-28 23:59:59",
        "salary" => 1300,
        "job_type" => "full",
        "category" => "IT"
    ]
];

foreach ($usersData as $u) {
    $first = $u[0];
    $last = $u[1];
    $email = $u[2];
    $roll = $u[4];

    $user = $users->get_user_by_email($email);
    if ($user) {
        continue;
    }

    $password = password_hash($u[3], PASSWORD_DEFAULT);

    do {
        $id = idGenerator("user");
        $user = $users->get_user_by_id($id);
    } while ($user);

    $prefix = ($roll === "freelancer") ? "free" : ($roll === "client" ? "clie" : "admn");

    do {
        $fid = idGenerator($prefix);
        $user_data = "";
        if ($roll === "freelancer") {
            $user_data = $freelancers->get_freelancer_by_id($fid);
        } else if ($roll === "client") {
            $user_data = $clients->get_client_by_id($fid);
        } else {
            break;
        }
    } while ($user_data);

    do {
        $uname = unameGenerator();
        $user = $users->get_user_by_username($uname);
    } while ($user);

    $users->create($id, $first, $last, $uname, $email, $password, $roll);
    if ($roll === "freelancer") {
        $freelancers->create($fid, $id);
    } else if ($roll === "client") {
        $clients->create($fid, $id);
    }
}

foreach ($jobsData as $job) {
    do {
        $id = idGenerator("job");
        $job_check = $jobs->get_job_by_id($id);
    } while ($job_check);

    $client = $clients->get_client_by_userid($job["client_id"]);

    $jobs->create($id, $client["id"], $job["title"], $job["description"], $job["status"], json_encode($job["requirements"]), json_encode($job["responsibilities"]), 0, $job["deadline"], $job["salary"], $job["job_type"], $job["category"]);
}
?>