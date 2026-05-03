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


$categories_list = ["Software Development", "Design", "Marketing", "Data Entry", "Management", "Arteficial Intelegence", "IT", "Healthcare", "Customer Support", "Engineering"];

foreach ($categories_list as $category) {
    $catagories->create($category);
}

$jobsData = [
    [
        "client_id" => "clie-b68294",
        "title" => "Frontend Developer",
        "description" => "Build modern UI using React and ensure responsive design. You will work closely with designers to transform wireframes into interactive interfaces. The role involves optimizing components for performance and accessibility. You will also debug issues and ensure cross-browser compatibility. Collaboration with backend developers is essential for seamless integration. Staying updated with frontend trends and tools is expected.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["React", "HTML", "CSS", "JavaScript", "Git", "Responsive Design", "REST APIs"],
        "responsibilities" => ["Develop UI", "Fix bugs", "Collaborate with backend team", "Optimize performance", "Ensure accessibility", "Write reusable components"],
        "deadline" => "2026-06-01 23:59:59",
        "salary" => 1200,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "clie-055942",
        "title" => "Backend Developer",
        "description" => "Design APIs and manage server-side logic. You will build scalable backend services that support web and mobile applications. The role includes handling database operations and ensuring data security. You will optimize performance and troubleshoot server issues. Collaboration with frontend developers is required to integrate APIs. Writing clean and maintainable code is essential.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["Node.js", "Express", "MongoDB", "SQL", "API Design", "Authentication", "Git"],
        "responsibilities" => ["Build APIs", "Database design", "Optimize performance", "Handle authentication", "Maintain server", "Write clean code"],
        "deadline" => "2026-06-10 23:59:59",
        "salary" => 1500,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "clie-055942",
        "title" => "UI/UX Designer",
        "description" => "Design intuitive user interfaces and experiences. You will conduct user research to understand needs and behaviors. The role includes creating wireframes, prototypes, and visual designs. You will collaborate with developers to ensure accurate implementation. Testing and iterating on designs based on feedback is required. Maintaining consistency in design systems is also important.",
        "address" => "Adama, Ethiopia",
        "status" => "active",
        "requirements" => ["Figma", "Adobe XD", "Creativity", "User Research", "Prototyping", "Wireframing"],
        "responsibilities" => ["Design wireframes", "User research", "Prototype testing", "Collaborate with developers", "Maintain design system", "Improve UX"],
        "deadline" => "2026-06-05 23:59:59",
        "salary" => 1000,
        "job_type" => "full",
        "category" => "Design"
    ],
    [
        "client_id" => "clie-cidheo",
        "title" => "Digital Marketer",
        "description" => "Manage social media campaigns and SEO strategies. You will plan and execute digital marketing campaigns across platforms. The role includes analyzing performance metrics and optimizing strategies. You will create engaging content and improve brand visibility. Collaboration with content creators and designers is required. Staying updated with digital trends is essential.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["SEO", "Content Marketing", "Analytics", "Social Media", "Google Ads", "Email Marketing"],
        "responsibilities" => ["Run campaigns", "Analyze data", "Improve reach", "Create content", "Optimize SEO", "Manage ads"],
        "deadline" => "2026-06-15 23:59:59",
        "salary" => 900,
        "job_type" => "part",
        "category" => "Marketing"
    ],
    [
        "client_id" => "clie-dneem6",
        "title" => "Mobile App Developer",
        "description" => "Develop Android applications using modern frameworks. You will build user-friendly mobile applications with high performance. The role includes debugging and improving existing apps. You will collaborate with designers and backend developers. Publishing and maintaining apps on app stores is required. Keeping up with mobile development trends is expected.",
        "address" => "Bahir Dar, Ethiopia",
        "status" => "active",
        "requirements" => ["Kotlin", "Android Studio", "Java", "REST APIs", "Git", "UI Design"],
        "responsibilities" => ["Build apps", "Debug issues", "Publish to Play Store", "Optimize performance", "Collaborate with team", "Maintain apps"],
        "deadline" => "2026-06-20 23:59:59",
        "salary" => 1400,
        "job_type" => "full",
        "category" => "Software Development"
    ],
    [
        "client_id" => "clie-b68294",
        "title" => "Data Analyst",
        "description" => "Analyze business data and generate insights. You will collect, clean, and interpret large datasets. The role includes creating reports and dashboards. You will work with teams to understand data needs. Identifying trends and patterns is a key responsibility. Ensuring data accuracy and integrity is essential.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["SQL", "Excel", "Python", "Data Visualization", "Statistics", "Power BI"],
        "responsibilities" => ["Data cleaning", "Reporting", "Visualization", "Analyze trends", "Create dashboards", "Ensure accuracy"],
        "deadline" => "2026-06-12 23:59:59",
        "salary" => 1100,
        "job_type" => "full",
        "category" => "Data Entry"
    ],
    [
        "client_id" => "clie-pzvlj5",
        "title" => "Intern Web Developer",
        "description" => "Assist in building web applications. You will learn and contribute to real-world projects. The role includes writing basic code and fixing minor bugs. You will work under senior developers for guidance. Improving coding skills and understanding workflows is expected. Exposure to modern tools and frameworks will be provided.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Basic HTML", "CSS", "JavaScript", "Git", "Problem Solving"],
        "responsibilities" => ["Support dev team", "Learn codebase", "Fix minor bugs", "Write simple features", "Attend meetings"],
        "deadline" => "2026-05-30 23:59:59",
        "salary" => 300,
        "job_type" => "intern",
        "category" => "Software Development"
    ],

    [
        "client_id" => "clie-pzvlj5",
        "title" => "Graphic Designer",
        "description" => "Create visual content for branding. You will design graphics for digital and print media. The role includes collaborating with marketing teams. You will ensure brand consistency across designs. Editing and improving visual assets is required. Creativity and attention to detail are key.",
        "address" => "Mekelle, Ethiopia",
        "status" => "active",
        "requirements" => ["Photoshop", "Illustrator", "Creativity", "Branding", "Typography"],
        "responsibilities" => ["Design posters", "Brand assets", "Edit graphics", "Collaborate with team", "Maintain style"],
        "deadline" => "2026-06-18 23:59:59",
        "salary" => 800,
        "job_type" => "part",
        "category" => "Design"
    ],

    [
        "client_id" => "clie-cidheo",
        "title" => "Project Manager",
        "description" => "Manage software development lifecycle. You will plan, execute, and oversee projects. The role includes coordinating teams and resources. Tracking progress and ensuring deadlines is essential. You will communicate with stakeholders regularly. Risk management and problem solving are key.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Agile", "Scrum", "Leadership", "Communication", "Planning"],
        "responsibilities" => ["Plan tasks", "Manage team", "Track progress", "Communicate with stakeholders", "Handle risks"],
        "deadline" => "2026-06-25 23:59:59",
        "salary" => 1600,
        "job_type" => "full",
        "category" => "Management"
    ],

    [
        "client_id" => "clie-dneem6",
        "title" => "Content Writer",
        "description" => "Write blog posts and marketing content. You will create engaging and SEO-friendly articles. The role includes researching topics and editing drafts. You will collaborate with marketing teams. Maintaining tone and quality is essential. Meeting deadlines consistently is required.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["Writing", "SEO", "Research", "Editing", "Creativity"],
        "responsibilities" => ["Create content", "Edit drafts", "Research topics", "Optimize SEO", "Meet deadlines"],
        "deadline" => "2026-06-08 23:59:59",
        "salary" => 700,
        "job_type" => "part",
        "category" => "Marketing"
    ],
    [
        "client_id" => "clie-cidheo",
        "title" => "AI Engineer",
        "description" => "Develop machine learning models. You will work on data-driven solutions and AI systems. The role includes training and evaluating models. You will optimize algorithms for performance. Collaboration with data teams is required. Staying updated with AI advancements is essential.",
        "address" => "Addis Ababa, Ethiopia",
        "status" => "active",
        "requirements" => ["Python", "ML", "TensorFlow", "Data Science", "Deep Learning"],
        "responsibilities" => ["Train models", "Optimize algorithms", "Analyze data", "Deploy models", "Research AI"],
        "deadline" => "2026-06-30 23:59:59",
        "salary" => 2000,
        "job_type" => "full",
        "category" => "Arteficial Intelegence"
    ],
    [
        "client_id" => "clie-dneem6",
        "title" => "System Administrator",
        "description" => "Maintain IT infrastructure and servers. You will monitor system performance and security. The role includes troubleshooting technical issues. You will ensure uptime and reliability. Managing backups and updates is required. Supporting internal teams is part of the role.",
        "address" => "Hawassa, Ethiopia",
        "status" => "active",
        "requirements" => ["Linux", "Networking", "Security", "Server Management", "Troubleshooting"],
        "responsibilities" => ["Monitor systems", "Ensure uptime", "Fix issues", "Manage backups", "Support teams"],
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
    $users->verify($id);
}

foreach ($jobsData as $job) {
    do {
        $id = idGenerator("job");
        $job_check = $jobs->get_job_by_id($id);
    } while ($job_check);

    $client = $clients->get_clients();
    $index = random_int(0, count($client) - 1);

    $jobs->create($id, $client[$index]["id"], $job["title"], $job["description"], json_encode($job["requirements"]), json_encode($job["responsibilities"]), $job["deadline"], $job["salary"], $job["job_type"], $job["category"], $job["address"]);
}
?>