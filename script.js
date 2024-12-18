// Array to store to-do items
let todoItems = [];

// Function to add new to-do item
function addTodo(text) {
  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todoItems.push(todo);
  renderTodoList();
}

// Function to edit existing to-do item
function editTodo(id, newText) {
  const index = todoItems.findIndex(item => item.id === id);

  if (index !== -1) {
    todoItems[index].text = newText;
    renderTodoList();
  }
}

// Function to delete existing to-do item
function deleteTodo(id) {
  todoItems = todoItems.filter(item => item.id !== id);
  renderTodoList();
}

// Function to update the completed status of to-do item
function toggleCompleted(id) {
  const index = todoItems.findIndex(item => item.id === id);

  if (index !== -1) {
    todoItems[index].completed = !todoItems[index].completed;
    renderTodoList();
  }
}

// Function to render the to-do list
function renderTodoList() {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';

  todoItems.forEach(item => {
    const li = document.createElement('li');
    li.setAttribute('class', 'todo-item');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-id', item.id);
    checkbox.checked = item.completed;
    checkbox.addEventListener('click', event => {
      const id = Number(event.target.dataset.id);
      toggleCompleted(id);
    });

    const span = document.createElement('span');
    span.setAttribute('contenteditable', true);
    span.setAttribute('data-id', item.id);
    span.innerText = item.text;
    span.addEventListener('focusout', event => {
      const id = Number(event.target.dataset.id);
      const newText = event.target.innerText;
      editTodo(id, newText);
    });

    const button = document.createElement('button');
    button.setAttribute('class', 'delete-btn');
    button.setAttribute('data-id', item.id);
    button.innerText = 'Delete';
    button.addEventListener('click', event => {
      const id = Number(event.target.dataset.id);
      deleteTodo(id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  });
}

// Handle form submit event
const form = document.querySelector('.add-todo-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.add-todo-input');

  if (input.value.trim() !== '') {
    addTodo(input.value);
    input.value = '';
  }
});

// Initial rendering of to-do list
renderTodoList();
