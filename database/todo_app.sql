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


