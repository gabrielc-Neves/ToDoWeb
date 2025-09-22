<?php
include 'db.php';
session_start();
$user_id = $_SESSION['user_id'];
$result = $conn->query("SELECT * FROM tasks WHERE user_id = '$user_id' ORDER BY id DESC");
$tasks = [];
while($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}
echo json_encode($tasks);
?>
