// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions
function addTodo(event) {
  // Prevent from submitting
  event.preventDefault();
  if (todoInput.value.length > 0) {
    // Make todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-container");
    // Make single list item
    const todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
    todoLi.classList.add("todo-item");
    //save to local storage
    saveLocalTodos(todoInput.value);
    todoDiv.appendChild(todoLi);
    // Append div to the todo list
    todoList.appendChild(todoDiv);
    // Complete Button
    const todoComplete = document.createElement("button");
    todoComplete.innerHTML = "<i class='fas fa-check'></i>";
    todoComplete.classList.add("todo-complete");
    todoDiv.appendChild(todoComplete);
    // Trash Button
    const todoTrash = document.createElement("button");
    todoTrash.innerHTML = "<i class='fas fa-trash'></i>";
    todoTrash.classList.add("todo-trash");
    todoDiv.appendChild(todoTrash);
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO

  if (item.classList[0] === "todo-trash") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check Mark Todo
  if (item.classList[0] === "todo-complete") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
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

function saveLocalTodos(todo) {
  // CHECK---HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // CHECK---HEY DO I already have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Make todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-container");
    // Make single list item
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    // Append item to the div
    todoDiv.appendChild(todoLi);
    // Append div to the todo list
    todoList.appendChild(todoDiv);
    // Complete Button
    const todoComplete = document.createElement("button");
    todoComplete.innerHTML = "<i class='fas fa-check'></i>";
    todoComplete.classList.add("todo-complete");
    todoDiv.appendChild(todoComplete);
    // Trash Button
    const todoTrash = document.createElement("button");
    todoTrash.innerHTML = "<i class='fas fa-trash'></i>";
    todoTrash.classList.add("todo-trash");
    todoDiv.appendChild(todoTrash);
  });
}

function removeLocalTodos(todo) {
  // CHECK---HEY DO I already have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoName = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoName), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
