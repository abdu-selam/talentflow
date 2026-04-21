<?php
class Skills
{
    private $con;
    private $table = "skills";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $freelancer_id, $name, $level, $skill_type)
    {
        $sql = "INSERT INTO " . $this->table . " (id, freelancer_id, name, level, skill_type) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("sssds", $id, $freelancer_id, $name, $level, $skill_type);

        return $stmt->execute();
    }

    public function get_skill_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_skills_by_freelancer_id($freelancer_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE freelancer_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_skills_by_skill_type_and_freelancer_id($skill_type, $freelancer_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE skill_type = ? AND freelancer_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $skill_type, $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_skills()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>