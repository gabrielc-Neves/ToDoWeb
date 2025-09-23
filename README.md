# ToDoList ✅

Aplicação web de gerenciamento de tarefas, que permite ao usuário cadastrar, editar, excluir, ordenar e gerenciar suas tarefas de forma prática, estruturada e intuitiva.

---

## 📂 Estrutura do Projeto

```
ToDoWeb/
│── index.php                # Página inicial
│
├── backend/                 # Arquivos PHP responsáveis pela lógica do sistema
│   ├── add_task.php         # Adiciona novas tarefas
│   ├── cadastro.php         # Cadastro de usuários
│   ├── db.php               # Conexão com o banco de dados
│   ├── delete_task.php      # Exclusão de tarefas
│   ├── get_task.php         # Busca de tarefas
│   ├── login.php            # Autenticação de usuários
│   ├── logout.php           # Logout
│   ├── toggle_task.php      # Marca/desmarca tarefas como concluídas
│   └── update_task.php      # Atualiza informações de tarefas
│
├── database/
│   └── todo_app.sql         # Script SQL para criação do banco de dados
│
├── frontend/                # Arquivos visuais e estáticos
│   ├── pages/               # Páginas HTML (login, cadastro, tarefas)
│   │   ├── cadastro.html
│   │   ├── login.html
│   │   └── tarefas.html
│   ├── resources/           # Imagens e ícones
│   ├── scripts/             # Scripts JS
│   │   └── tarefas.js
│   └── styles/              # Arquivos de estilo CSS
│       ├── style.css
│       └── tarefas.css
```

---

## 🚀 Como Executar o Projeto

Para rodar o projeto corretamente, siga os passos abaixo:

### 1. Pré-requisitos

- Instalar o [XAMPP](https://www.apachefriends.org/pt_br/index.html) na sua máquina.
- Ter um navegador de internet atualizado.

### 2. Configuração do Servidor

1. Abra o **XAMPP Control Panel**.
2. Inicie os módulos **Apache** e **MySQL**.
3. Certifique-se de que não há outros serviços rodando nas portas **80** (Apache) e **3306** (MySQL).

### 3. Banco de Dados

1. Acesse o [phpMyAdmin](http://localhost/phpmyadmin/).
2. Importe/execute o arquivo `database/todo_app.sql` para criar a database e as tabelas necessárias.

### 4. Arquivos do Projeto

1. Extraia o conteúdo do projeto.
2. Mova a pasta `ToDoList` para dentro da pasta `htdocs` do XAMPP:

C:\xampp\htdocs\ToDoList

### 5. Acessando a Aplicação

- Abra o navegador e digite:

[http://localhost/ToDoList](http://localhost/ToDoList)

---

## 👥 Funcionalidades

- Cadastro e login de usuários.
- Adição de novas tarefas.
- Edição de tarefas existentes.
- Exclusão de tarefas.
- Marcar e desmarcar tarefas como concluídas.
- Ordenação de tarefas por data, prioridade, etc.
- Interface simples e intuitiva.

---

## 🔧 Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** PHP
- **Banco de Dados:** MySQL
- **Servidor Local:** XAMPP (Apache + MySQL)

---

## 📌 Observações

- O arquivo `backend/db.php` contém as informações de conexão com o banco de dados. Ajuste o **usuário** e **senha** caso necessário (padrão do XAMPP é usuário `root` sem senha).
- Caso utilize outro sistema além do XAMPP, certifique-se de configurar corretamente o servidor web e o banco de dados.
