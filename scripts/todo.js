const form = document.getElementById('todoForm');
const todoTitle = document.getElementById('todoTitle');
const todoText = document.getElementById('todoText');
const submitBtn = document.getElementById('addBtn');
const singleTask = document.getElementsByClassName('task');
const tasks = document.getElementById('taskList');

form.addEventListener('keypress', function (event) {
  if (
    event.ctrlKey === true &&
    event.key === 'Enter' &&
    todoTitle.value !== ''
  ) {
    event.preventDefault();
    document.getElementById('addBtn').click();
  }
});
const setTask = (todoList) => {
  const task = document.createElement('div');
  task.setAttribute('class', 'task slide-in');
  task.setAttribute('data-key', todoList.id);
  const checked = todoList.completed ? ' checked' : '';

  task.innerHTML = `
    <div class="taskText${checked}">
      <p class="taskTitle">${todoList.title}</p>
      <p class="taskDesc">${todoList.text}</p>
    </div>
    <div class="priority" style="background-color:var(--priority-color-${todoList.priority});filter: brightness(150%)">
    </div>
    <span type="button" class="remove">×</span>
    `;

  tasks.append(task);
};

const closeBtn = document.getElementsByClassName('remove');
let todos = [];
const addTodo = (event) => {
  event.preventDefault();
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const todo = {
    id: Date.now(),
    title: todoTitle.value,
    text: todoText.value,
    priority: priority,
    completed: false,
  };
  todos.push(todo);
  addToLocalStorage(todos);
  setTask(todo);
  deleteTask();
  form.reset();
};

const renderTodos = (todos) => {
  tasks.innerHTML = '';
  todos.forEach(function (item) {
    setTask(item);
  });
};

const deleteTask = () => {
  for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', function (event) {
      const div = this.parentElement;
      div.remove();
      const id = event.target.parentElement.getAttribute('data-key');
      todos = todos.filter(function (item) {
        return item.id != id;
      });
      addToLocalStorage(todos);
    });
  }
};

const toggle = (id) => {
  const taskText = document.getElementsByClassName('taskText');
  todos.forEach(function (item, index) {
    if (item.id == id) {
      item.completed = !item.completed;
      const checked = item.completed ? ' checked' : '';
      taskText[index].setAttribute('class', `taskText${checked}`);
    }
  });
  addToLocalStorage(todos);
};

tasks.addEventListener('click', function (e) {
  toggle(e.target.parentElement.parentElement.getAttribute('data-key'));
});

const addToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getFromLocalStorage = () => {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
};
getFromLocalStorage();
form.addEventListener('submit', addTodo);
for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener('click', function (event) {
    const div = this.parentElement;
    div.remove();
    deleteTask();
  });
}
