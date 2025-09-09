<?php
include 'db.php';

$title = $_POST['title'];
$descricao = $_POST['descricao'];
$deadline = $_POST['deadline'];
$prioridade = $_POST['prioridade'];
$categoria = $_POST['categoria'];

// Insere com os novos campos
$sql = "INSERT INTO tasks (title, descricao, deadline, prioridade, categoria, done) 
        VALUES ('$title', '$descricao', '$deadline', '$prioridade', '$categoria', 0)";

if ($conn->query($sql) === TRUE) {
    header("Location: ../frontend/index.html");
} else {
    echo "Erro ao cadastrar tarefa: " . $conn->error;
}
?>
