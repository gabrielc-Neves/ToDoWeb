<?php
include 'db.php';

session_start();
$user_id = $_SESSION['user_id'];

$id = intval($_POST['id']);
$title = $_POST['title'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$deadline = $_POST['deadline'] ?? null;
$prioridade = $_POST['prioridade'] ?? null;
$categoria = $_POST['categoria'] ?? null;

$title = $conn->real_escape_string($title);
$descricao = $conn->real_escape_string($descricao);
$deadline = $deadline ? $conn->real_escape_string($deadline) : null;
$prioridade = $prioridade ? $conn->real_escape_string($prioridade) : null;
$categoria = $categoria ? $conn->real_escape_string($categoria) : null;

$sql = "UPDATE tasks SET 
            title='{$title}',
            descricao='{$descricao}',
            deadline=" . ($deadline ? "'{$deadline}'" : "NULL") . ",
            prioridade=" . ($prioridade ? "'{$prioridade}'" : "NULL") . ",
            categoria=" . ($categoria ? "'{$categoria}'" : "NULL") . "
        WHERE id={$id} AND user_id='$user_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => $conn->error]);
}
?>
