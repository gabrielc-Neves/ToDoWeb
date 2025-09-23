<?php
session_start();
$estaLogado = isset($_SESSION['user_id']);
?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To-Do List - Organize sua Vida</title>
    <link rel="stylesheet" href="frontend/styles/style.css" />
  </head>
  <body>
<header>
  <nav class="navbar">
    <h1 class="logo">To-Do List</h1>

    <!-- Botão Hamburguer (fora de .nav-links) -->
    <button id="menuToggle" class="hamburger">☰</button>

    <div class="nav-links">
      <?php if ($estaLogado): ?>
        <a href="frontend/pages/tarefas.html" class="btn">Tarefas</a>
        <a href="backend/logout.php" class="btn btn-outline">Logout</a>
      <?php else: ?>
        <a href="frontend/pages/login.html" class="btn">Login</a>
        <a href="frontend/pages/cadastro.html" class="btn btn-outline">Cadastro</a>
      <?php endif; ?>
    </div>
  </nav> 
</header>


    <main class="hero">
      <div class="hero-content">
        <h2>Organize suas tarefas de forma simples e eficiente</h2>
        <p>
          Nosso sistema ajuda você a manter o foco, concluir suas atividades e
          aumentar sua produtividade. Tudo em uma interface intuitiva e
          acessível em qualquer dispositivo.
        </p>
        <div class="cta">
          <?php if ($estaLogado): ?>
            <a href="frontend/pages/tarefas.html" class="btn">Começar Agora</a>
          <?php else: ?>
            <a href="frontend/pages/login.html" class="btn">Começar Agora</a>
          <?php endif; ?>
        </div>
      </div>
      <div class="hero-image"><img src="frontend/resources/8161203.png" /></div>
    </main>
    

    <footer>
      <p>© 2025 To-Do List | Todos os direitos reservados.</p>
    </footer>
    <script src=frontend/scripts/ButtonH.js></script>
  </body>
</html>
