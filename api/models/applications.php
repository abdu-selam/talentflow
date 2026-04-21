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

    public function get_application_by_status($status)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE status = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $status);

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