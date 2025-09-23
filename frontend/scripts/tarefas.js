document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const form = document.getElementById("taskForm");
  const modal = document.getElementById("taskModal");
  const openBtn = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeModal");

  openBtn.onclick = () => (modal.style.display = "block");
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const id = formData.get("id");
    const url = id
      ? "../../backend/update_task.php"
      : "../../backend/add_task.php";
    await fetch(url, {
      method: "POST",
      body: formData,
    });
    form.reset();
    document.getElementById("taskId").value = "";
    modal.style.display = "none";
    loadTasks();
  });
});

let tasksData = []; // <- precisa estar no escopo global

async function loadTasks() {
  const res = await fetch("../../backend/get_task.php");
  tasksData = await res.json();
  renderTasks(tasksData);
}

function renderTasks(tasks) {
  const tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = "";
  tasks.forEach((task) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.title}</td>
      <td>${task.descricao || ""}</td>
      <td>${task.deadline || ""}</td>
      <td>${task.prioridade}</td>
      <td>${task.categoria}</td>
      <td class="${task.done == 1 ? "status-done" : "status-pending"}">
        ${task.done == 1 ? "Concluída" : "Pendente"}
      </td>
      <td>
        <button class="action-btn edit-btn" onclick="editTask(${
          task.id
        })">Editar</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${
          task.id
        })">Excluir</button>
        <button class="action-btn toggle-btn" onclick="toggleTask(${task.id}, ${
      task.done
    })">
          ${task.done == 1 ? "Reabrir" : "Concluir"}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});

// --- Função de ordenação ---
function sortTasks(column, asc = true) {
  let sorted = [...tasksData];

  sorted.sort((a, b) => {
    let valA = a[column] ?? "";
    let valB = b[column] ?? "";

    // Se for data
    if (column === "deadline") {
      return asc
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    // Se for prioridade, definimos ordem customizada
    if (column === "prioridade") {
      const order = { Alta: 3, Média: 2, Baixa: 1 };
      return asc ? order[valA] - order[valB] : order[valB] - order[valA];
    }

    // Se for status (done)
    if (column === "done") {
      return asc ? a.done - b.done : b.done - a.done;
    }

    // Para strings normais
    return asc
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });

  renderTasks(sorted);
}

// --- Ativar clique nos cabeçalhos ---
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  document.querySelectorAll("#taskTable th[data-column]").forEach((th) => {
    let asc = true;
    th.addEventListener("click", () => {
      sortTasks(th.dataset.column, asc);
      asc = !asc; // alterna ordem crescente/decrescente
    });
  });
});

function editTask(id) {
  fetch(`../../backend/get_task.php?id=${id}`)
    .then((res) => res.json())
    .then((task) => {
      document.getElementById("taskId").value = task.id;
      document.getElementById("title").value = task.title;
      document.getElementById("descricao").value = task.descricao;
      document.getElementById("deadline").value = task.deadline;
      document.getElementById("prioridade").value = task.prioridade;
      document.getElementById("categoria").value = task.categoria;
      document.getElementById("taskModal").style.display = "block";
    });
}

async function deleteTask(id) {
  await fetch("../../backend/delete_task.php", {
    method: "POST",
    body: new URLSearchParams({ id }),
  });
  loadTasks();
}

async function toggleTask(id, done) {
  await fetch("../../backend/toggle_task.php", {
    method: "POST",
    body: new URLSearchParams({ id, done }),
  });
  loadTasks();
}


document
  .getElementById("formCadastro")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("../../backend/cadastro.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: result.message,
        confirmButtonColor: "#3085d6",
      }).then(() => {
        window.location.href = "login.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: result.message,
        confirmButtonColor: "#d33",
      });
    }
  });
