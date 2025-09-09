<?php
include 'db.php';
$id = $_POST['id'];
$done = $_POST['done'] == 1 ? 0 : 1;
$conn->query("UPDATE tasks SET done=$done WHERE id=$id");
?>
