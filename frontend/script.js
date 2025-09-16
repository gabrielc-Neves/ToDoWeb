async function loadTasks() {
  const response = await fetch("../backend/get_tasks.php");
  const tasks = await response.json();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.done == 1 ? "done" : ""}">${task.title}</span>
            <div>
                <button onclick="toggleTask(${task.id}, ${task.done})">${
      task.done == 1 ? "Desfazer" : "Concluir"
    }</button>
                <button onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
    taskList.appendChild(li);
  });
}

async function addTask() {
  const taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim() === "") return;
  await fetch("../backend/add_task.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "title=" + encodeURIComponent(taskInput.value),
  });
  taskInput.value = "";
  loadTasks();
}

async function toggleTask(id, done) {
  await fetch("../backend/toggle_task.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${id}&done=${done}`,
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch("../backend/delete_task.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "id=" + id,
  });
  loadTasks();
}

window.onload = loadTasks;
