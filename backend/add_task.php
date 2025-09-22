<?php
include 'db.php';

$title = $_POST['title'];
$descricao = $_POST['descricao'];
$deadline = $_POST['deadline'];
$prioridade = $_POST['prioridade'];
$categoria = $_POST['categoria'];

// Insere com os novos campos
session_start();
$user_id = $_SESSION['user_id'];

$sql = "INSERT INTO tasks (title, descricao, deadline, prioridade, categoria, done, user_id) 
        VALUES ('$title', '$descricao', '$deadline', '$prioridade', '$categoria', 0, '$user_id')";


if ($conn->query($sql) === TRUE) {
    header("Location: ../frontend/tarefas.html");
} else {
    echo "Erro ao cadastrar tarefa: " . $conn->error;
}
?>
