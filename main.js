const todoInput = document.querySelector("#todo-input");
const todoAddBtn = document.querySelector("#todo-add-btn");
const todoItemsUl = document.querySelector(".todo-item");
const filterOption = document.querySelector(".filer-todo");

document.addEventListener('DOMContentLoaded', getTodos);
todoAddBtn.addEventListener("click", addTodo);
todoItemsUl.addEventListener("click", deleteItems);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-list");
  todoDiv.appendChild(newTodo);

  const checkButton = document.createElement("button");
  checkButton.classList.add("check-btn");
  checkButton.innerHTML = '<i class = "fas fa-check"></i>';
  todoDiv.appendChild(checkButton);

  const trashButton = document.createElement("button");
  trashButton.classList.add("delete-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  todoItemsUl.appendChild(todoDiv);

  setLocalStorage(todoInput.value);

  todoInput.value = "";
}

function deleteItems(e) {
  const item = e.target;
  console.log(item);

  if (item.classList[0] === "delete-btn") {
    const deleteItems = item.parentElement;
    deleteItems.remove();
    removeLocalTodos(deleteItems);
  }

  if (item.classList[0] === "check-btn") {
    const checkItems = item.parentElement;
    checkItems.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todo = todoItemsUl.childNodes;
  todo.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function setLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-list");
    todoDiv.appendChild(newTodo);

    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class = "fas fa-check"></i>';
    todoDiv.appendChild(checkButton);

    const trashButton = document.createElement("button");
    trashButton.classList.add("delete-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    todoItemsUl.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
