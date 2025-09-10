    // Utilidades
    function formToUrlEncoded(form) {
      const data = new URLSearchParams();
      for (const [k, v] of new FormData(form).entries()) {
        data.append(k, v.toString().trim());
      }
      return data.toString();
    }

    function el(tag, attrs = {}, ...children) {
      const node = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') node.className = v;
        else if (k === 'dataset') Object.assign(node.dataset, v);
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.substring(2), v);
        else if (v !== undefined && v !== null) node.setAttribute(k, v);
      });
      children.flat().forEach(c => node.append(c instanceof Node ? c : document.createTextNode(c)));
      return node;
    }

    // Estado na memória
    let allTasks = [];

    async function fetchTasks() {
      const res = await fetch('../backend/get_tasks.php');
      allTasks = await res.json();
      renderList();
    }

    function renderList() {
      const ul = document.getElementById('taskList');
      ul.innerHTML = '';

      const status = document.getElementById('filterStatus').value;
      const cat = document.getElementById('filterCategoria').value;

      const filtered = allTasks.filter(t => {
        const byStatus = status === 'todas' ||
                         (status === 'abertas' && Number(t.done) !== 1) ||
                         (status === 'concluidas' && Number(t.done) === 1);
        const byCat = cat === 'todas' || t.categoria === cat;
        return byStatus && byCat;
      });

      if (filtered.length === 0) {
        ul.append(el('li', {class: 'empty'}, 'Nenhuma tarefa encontrada.'));
        return;
      }

      filtered.forEach(task => ul.append(renderItem(task)));
    }

    function renderItem(task) {
      const li = el('li', {class: 'task-item', dataset: {id: task.id}});

      const checkbox = el('input', {type: 'checkbox', checked: Number(task.done) === 1, onchange: () => toggleTask(task)});
      const title = el('span', {class: Number(task.done) === 1 ? 'done title' : 'title'}, task.title);

      const meta = el('div', {class: 'meta'},
        task.deadline ? el('span', {class: 'pill'}, 'Prazo: ' + task.deadline) : '',
        task.prioridade ? el('span', {class: 'pill'}, 'Prioridade: ' + task.prioridade) : '',
        task.categoria ? el('span', {class: 'pill'}, task.categoria) : ''
      );

      const desc = el('div', {class: 'desc'}, task.descricao || '');

      const btnEdit = el('button', {class: 'btn btn-small btn-outline', onclick: () => startEdit(task)}, 'Editar');
      const btnDelete = el('button', {class: 'btn btn-small danger', onclick: () => removeTask(task.id)}, 'Excluir');

      const actions = el('div', {class: 'actions'}, btnEdit, btnDelete);

      li.append(el('div', {class: 'left'}, checkbox),
                el('div', {class: 'content'}, title, meta, desc),
                actions);
      return li;
    }

    function startEdit(task) {
      const li = document.querySelector('li.task-item[data-id="' + task.id + '"]');
      if (!li) return;
      li.innerHTML = '';

      const titleInput = el('input', {type: 'text', value: task.title, class: 'input-inline'});
      const descInput = el('textarea', {rows: 3, class: 'input-inline'}, task.descricao || '');
      const deadlineInput = el('input', {type: 'date', value: task.deadline || ''});
      const prioridadeSelect = el('select', {},
        el('option', {value: 'Baixa', selected: task.prioridade === 'Baixa'}, 'Baixa'),
        el('option', {value: 'Média', selected: task.prioridade === 'Média'}, 'Média'),
        el('option', {value: 'Alta', selected: task.prioridade === 'Alta'}, 'Alta'),
      );
      const categoriaSelect = el('select', {},
        el('option', {value: 'Trabalho', selected: task.categoria === 'Trabalho'}, 'Trabalho'),
        el('option', {value: 'Estudo', selected: task.categoria === 'Estudo'}, 'Estudo'),
        el('option', {value: 'Pessoal', selected: task.categoria === 'Pessoal'}, 'Pessoal'),
        el('option', {value: 'Outros', selected: task.categoria === 'Outros'}, 'Outros'),
      );

      const btnSave = el('button', {class: 'btn btn-small', onclick: async () => {
        const payload = new URLSearchParams({
          id: task.id,
          title: titleInput.value,
          descricao: descInput.value,
          deadline: deadlineInput.value,
          prioridade: prioridadeSelect.value,
          categoria: categoriaSelect.value
        });
        await fetch('../backend/update_task.php', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: payload.toString()
        });
        await fetchTasks();
      }}, 'Salvar');

      const btnCancel = el('button', {class: 'btn btn-small btn-outline', onclick: () => renderList()}, 'Cancelar');

      li.append(
        el('div', {class: 'content edit'},
          el('div', {class: 'input-row'},
            el('div', {class: 'input-group'}, el('label', {}, 'Título'), titleInput),
            el('div', {class: 'input-group'}, el('label', {}, 'Prazo'), deadlineInput)
          ),
          el('div', {class: 'input-row'},
            el('div', {class: 'input-group'}, el('label', {}, 'Prioridade'), prioridadeSelect),
            el('div', {class: 'input-group'}, el('label', {}, 'Categoria'), categoriaSelect)
          ),
          el('div', {class: 'input-group'}, el('label', {}, 'Descrição'), descInput),
          el('div', {class: 'actions'}, btnSave, btnCancel)
        )
      );
    }

    async function toggleTask(task) {
      const payload = new URLSearchParams({ id: task.id, done: Number(task.done) });
      await fetch('../backend/toggle_task.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: payload.toString()
      });
      await fetchTasks();
    }

    async function removeTask(id) {
      if (!confirm('Excluir esta tarefa?')) return;
      await fetch('../backend/delete_task.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'id=' + encodeURIComponent(id)
      });
      await fetchTasks();
    }

    // Novo cadastro
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = formToUrlEncoded(e.target);
      await fetch('../backend/add_task.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body
      });
      e.target.reset();
      await fetchTasks();
    });

    // Filtros
    document.getElementById('filterStatus').addEventListener('change', renderList);
    document.getElementById('filterCategoria').addEventListener('change', renderList);

    // Inicialização
    fetchTasks();