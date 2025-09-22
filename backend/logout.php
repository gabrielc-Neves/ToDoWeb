<?php
session_start();
session_unset();    // limpa variáveis da sessão
session_destroy();  // encerra a sessão
header("Location: ../frontend/pages/login.html"); // redireciona para login
exit();
?>
