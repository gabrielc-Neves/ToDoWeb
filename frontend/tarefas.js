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
    const url = id ? "../backend/update_task.php" : "../backend/add_task.php";
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

async function loadTasks() {
  const res = await fetch("../backend/get_task.php");
  const tasks = await res.json();
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
            <td class="${task.done == 1 ? "status-done" : "status-pending"}">${
      task.done == 1 ? "Concluída" : "Pendente"
    }</td>
            <td>
                <button class="action-btn edit-btn" onclick="editTask(${
                  task.id
                })">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${
                  task.id
                })">Excluir</button>
                <button class="action-btn toggle-btn" onclick="toggleTask(${
                  task.id
                }, ${task.done})">${
      task.done == 1 ? "Reabrir" : "Concluir"
    }</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

function editTask(id) {
  fetch(`../backend/get_task.php?id=${id}`)
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
  await fetch("../backend/delete_task.php", {
    method: "POST",
    body: new URLSearchParams({ id }),
  });
  loadTasks();
}

async function toggleTask(id, done) {
  await fetch("../backend/toggle_task.php", {
    method: "POST",
    body: new URLSearchParams({ id, done }),
  });
  loadTasks();
}
