const todoForm = document.getElementById('todoForm');
const input = document.getElementById('todoText');
const taskTitle = document.getElementById('todoTitle');
const tasks = document.getElementById('taskList');
const removeBtn = document.getElementsByClassName('remove');
const singleTask = document.getElementsByClassName('task');
input.addEventListener('keypress', function (event) {
  if (event.ctrlKey === true && event.key === 'Enter' && input.value !== '') {
    event.preventDefault();
    document.getElementById('addBtn').click();
  }
});
let todos = [];
const renderTodos = (todos) => {
  tasks.innerHTML = '';
  todos.forEach((item, index) => {
    const task = document.createElement('div');
    task.setAttribute('class', 'task slide-in');
    task.setAttribute('data-key', item.id);

    task.innerHTML = `
    <div class="taskText">
    <p class="taskTitle">${item.title}</p>
    <p class="taskDesc">${item.taskDesc}</p>
    </div>
    <div class="priority" style="background-color:var(--priority-color-${todos[index].priority});filter: brightness(150%)">
    </div>
    <span type="button" class="remove">×</span>
    `;
    tasks.append(task);
  });
};
const addTodo = (title, task, priority) => {
  if (title !== '') {
    const todo = {
      id: Date.now(),
      title: title,
      taskDesc: task,
      status: 'todo',
      priority: priority,
    };
    todos.push(todo);
    renderTodos(todos);
  }
  taskTitle.value = '';
  input.value = '';
};
todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  addTodo(taskTitle.value, input.value, priority);
});

removeBtn.addEventListener('click', function (event) {
  // event.preventDefault();
  console.log(event);
});
