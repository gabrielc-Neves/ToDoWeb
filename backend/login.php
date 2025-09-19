<?php
include 'db.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

// Consulta usuário
$sql = "SELECT * FROM usuarios WHERE email='$email' AND senha=MD5('$senha')";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    session_start();
    $_SESSION['usuario'] = $email;
    header("Location: ../frontend/tarefas.html"); 
    echo "Usuário ou senha inválidos.";
}
?>
