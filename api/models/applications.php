<?php
class Applications
{
    private $con;
    private $table = "applications";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $job_id, $freelancer_id, $message)
    {
        $sql = "INSERT INTO " . $this->table . " (id, job_id, freelancer_id, message) VALUES (?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ssss", $id, $job_id, $freelancer_id, $message);

        return $stmt->execute();
    }

    public function get_application_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_applications_by_job_id($job_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE job_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $job_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_application_by_freelancer_id($freelancer_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE freelancer_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_application_by_freelancer_id_and_job_id($freelancer_id, $job_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE freelancer_id = ? AND job_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $freelancer_id, $job_id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_application_by_status($status)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE status = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $status);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_application_by_freelancer_id_and_status($freelancer_id, $status)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE status = ? AND freelancer_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $status, $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_active_proposals($freelancer_id)
    {
        $sql = "SELECT u.id AS user_id, u.first_name AS fname, u.last_name AS lname, j.title AS title, a.message AS message, a.status AS status 
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        JOIN clients c ON j.client_id = c.id 
        JOIN users u ON c.user_id = u.id 
        WHERE a.freelancer_id = ? AND a.status = 'pending'";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_all_proposals($freelancer_id)
    {
        $sql = "SELECT u.id AS user_id,u.user_name as uname, u.first_name AS fname, u.last_name AS lname, j.title AS title, j.id as job_id, a.message AS message, a.status AS status FROM applications a JOIN jobs j ON a.job_id = j.id JOIN clients c ON j.client_id = c.id JOIN users u ON c.user_id = u.id WHERE a.freelancer_id = ? AND a.status = 'pending'";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_all_proposals_client($client_id)
    {
        $sql = "SELECT 
        u.id AS user_id,u.user_name as uname, u.first_name AS fname, u.last_name AS lname, 
        uf.id AS fuser_id,uf.user_name as funame, uf.first_name AS ffname, uf.last_name AS flname, 
        j.title AS title, j.id as job_id, a.message AS message, a.status AS status 
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        JOIN clients c ON j.client_id = c.id 
        JOIN users u ON c.user_id = u.id 
        JOIN freelancers f ON a.freelancer_id = f.id  
        JOIN users uf ON f.user_id = uf.id 
        WHERE c.id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $client_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_applys_by_client_id($client_id)
    {
        $sql = "SELECT 
        uf.id AS fuser_id,uf.user_name as funame, uf.first_name AS ffname, uf.last_name AS flname, f.headline as headline, uf.profile as fprofile,
        j.title AS title, j.id as job_id, a.message AS message, a.status AS status 
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        JOIN clients c ON j.client_id = c.id 
        JOIN users u ON c.user_id = u.id 
        JOIN freelancers f ON a.freelancer_id = f.id  
        JOIN users uf ON f.user_id = uf.id 
        WHERE c.id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $client_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_active_jobs($freelancer_id)
    {
        $sql = "SELECT u.id AS user_id, u.first_name AS fname, u.last_name AS lname, j.title AS title, j.description AS message, j.status AS status FROM applications a JOIN jobs j ON a.job_id = j.id JOIN clients c ON j.client_id = c.id JOIN users u ON c.user_id = u.id WHERE a.freelancer_id = ? AND a.status = 'approve'";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_applications()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>