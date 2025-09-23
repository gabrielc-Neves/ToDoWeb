CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  descricao TEXT,
  deadline DATE,
  prioridade ENUM('Baixa','Média','Alta') DEFAULT 'Baixa',
  categoria VARCHAR(50),
  done TINYINT(1) DEFAULT 0,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES usuario(id) ON DELETE CASCADE
);

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'Gabriel Camargo Neves', 'gabrielcneves17@gmail.com', 'e10adc3949ba59abbe56e057f20f883e'),
(2, 'joao', 'joao@email.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(3, 'Luan', 'luan@gmail.com', 'c20ad4d76fe97759aa27a0c99bff6710');

INSERT INTO `tasks` (`id`, `title`, `descricao`, `deadline`, `prioridade`, `categoria`, `done`, `user_id`) VALUES
(1, 'Varrer', 'Varrer Casa', '2025-09-23', 'Baixa', 'Pessoal', 0, 1),
(2, 'Lavar', 'Lavar Louça', '2025-09-23', 'Baixa', 'Pessoal', 0, 1),
(3, 'Estudar', 'Estudar para prova de BD', '2025-09-26', 'Média', 'Estudo', 0, 1),
(4, 'Desenvolver', 'Desenvolver funcionalidade ToDoList', '2025-09-30', 'Alta', 'Trabalho', 0, 1),
(5, 'Correr', 'Correr 10km', '2025-09-23', 'Média', 'Pessoal', 0, 2),
(7, 'Ler', 'Ler 10 paginas', '2025-09-23', 'Média', 'Pessoal', 0, 3);



