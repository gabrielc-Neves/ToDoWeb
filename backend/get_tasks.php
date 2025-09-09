<?php
include 'db.php';
$result = $conn->query("SELECT * FROM tasks ORDER BY id DESC");
$tasks = [];
while($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}
echo json_encode($tasks);
?>
