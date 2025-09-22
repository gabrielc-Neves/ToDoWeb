<?php
include 'db.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

// Verifica se o usuário já existe
$check = $conn->query("SELECT * FROM usuario WHERE email='$email'");
if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "E-mail já cadastrado!"
    ]);
    exit;
}

// Insere usuário
$sql = "INSERT INTO usuario (nome, email, senha) VALUES ('$nome', '$email', MD5('$senha'))";
if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "success" => true,
        "message" => "Cadastro realizado com sucesso!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao cadastrar: " . $conn->error
    ]);
}
