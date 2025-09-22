<?php
include 'db.php';
session_start();
$user_id = $_SESSION['user_id'];

// Se veio um id na query string, busca apenas essa tarefa
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT * FROM tasks WHERE id = $id AND user_id = '$user_id' LIMIT 1";
    $result = $conn->query($sql);

    if ($result && $row = $result->fetch_assoc()) {
        echo json_encode($row); // objeto único
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Tarefa não encontrada"]);
    }
} else {
    // Caso contrário, retorna todas as tarefas do usuário
    $result = $conn->query("SELECT * FROM tasks WHERE user_id = '$user_id' ORDER BY id DESC");
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    echo json_encode($tasks); // array de objetos
}
?>

