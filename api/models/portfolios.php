<?php
class Portfolios
{
    private $con;
    private $table = "portfolios";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $freelancer_id, $title, $descriptions, $images, $start_date, $end_date)
    {
        $sql = "INSERT INTO " . $this->table . " (id, freelancer_id, title, descriptions, images, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("sssssss", $id, $freelancer_id, $title, $descriptions, $images, $start_date, $end_date);

        return $stmt->execute();
    }

    public function update($id, $title, $descriptions, $images, $start_date, $end_date)
    {
        $sql = "UPDATE " . $this->table . " SET title = ?, descriptions = ?, images = ?, start_date = ?, end_date = ?  WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ssssss", $title, $descriptions, $images, $start_date, $end_date, $id);

        return $stmt->execute();
    }

    public function delete($id)
    {
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        return $stmt->execute();
    }

    public function update_portfolio_images($id, $imgs)
    {
        $sql = "UPDATE " . $this->table . " SET images = ? WHERE id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $imgs, $id);

        return $stmt->execute();
    }

    public function get_portfolio_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_portfolios_by_freelancer_id($freelancer_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE freelancer_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $freelancer_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_portfolios()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>