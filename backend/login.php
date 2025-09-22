<?php
include 'db.php';

$email = $_POST['email'];
$senha = $_POST['senha'];
$sql = "SELECT * FROM usuario WHERE email='$email' AND senha=MD5('$senha')";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc(); // pega os dados do usuário
    session_start();
    $_SESSION['user_id'] = $row['id']; // associa o ID do usuário logado
    header("Location: ../frontend/pages/tarefas.html");
    exit;
} else {
    echo "Usuário ou senha inválidos.";
}
?>

