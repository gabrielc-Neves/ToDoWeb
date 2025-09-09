<?php
include 'db.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

// Verifica se o usuário já existe
$check = $conn->query("SELECT * FROM usuarios WHERE email='$email'");
if ($check->num_rows > 0) {
    echo "E-mail já cadastrado!";
    exit;
}

// Insere usuário
$sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', MD5('$senha'))";
if ($conn->query($sql) === TRUE) {
    header("Location: ../frontend/login.html");
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}
?>
