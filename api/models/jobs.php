<?php
class Jobs
{
    private $con;
    private $table = "jobs";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create(
        $id,
        $client_id,
        $title,
        $description,
        $status,
        $requirements,
        $responsibilities,
        $apply_count,
        $deadline,
        $salary,
        $job_type,
        $category
    ) {
        $sql = "INSERT INTO " . $this->table . " (id, client_id, title, description, status, requirements, responsibilities, apply_count, deadline, salary, job_type, category) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param(
            "sssssssisdss",
            $id,
            $client_id,
            $title,
            $description,
            $status,
            $requirements,
            $responsibilities,
            $apply_count,
            $deadline,
            $salary,
            $job_type,
            $category
        );

        return $stmt->execute();
    }

    public function get_job_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_jobs_by_clientid($client_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE client_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $client_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_jobs_by_category($category)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE category = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $category);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_jobs_by_max_salary($salary)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE salary >= ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("d", $salary);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_jobs_by_min_salary($salary)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE salary <= ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("d", $salary);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_jobs_by_job_type($job_type)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE job_type = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $job_type);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_jobs_by_status($status)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE status = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $status);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_jobs()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>