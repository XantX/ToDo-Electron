const ToDoForm = document.getElementById("toDoForm");
const titleTodoForm = document.getElementById("title");
const descriptionToDoForm = document.getElementById("description");
const PriorityToDoForm = document.getElementsByName("group1");

const { remote } = require("electron");
const window = remote.require("./database-functions/data-functions");
const { hideSideBar } = require("../app");

ToDoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let priorityTodo;
  for (priorityToDo of PriorityToDoForm) {
    if (priorityToDo.checked) {
      priorityTodo = priorityToDo.value;
    }
  }

  const newToDo = {
    title: titleTodoForm.value,
    description: descriptionToDoForm.value,
    priority: priorityTodo,
  };
  ToDoForm.reset();
  titleTodoForm.focus();
  hideSideBar();
  await window.createToDo(newToDo);
  showToDoList();
});

let ToDoList = [];
const getToDoList = async () => {
  ToDoList = await window.getToDoList();
  return ToDoList;
};

const ToDoListRender = document.getElementById("mainListToDo");

const prioritySelectColor = (ToDoPrio) => {
  if (ToDoPrio === "High") {
    return "white-text red";
  } else if (ToDoPrio === "Medium") {
    return "white-text orange";
  } else {
    return "black-text yellow";
  }
};

const showToDoList = async () => {
  ToDoListRender.innerHTML = "";
  await getToDoList();
  ToDoList.forEach((ToDo) => {
    ToDoListRender.innerHTML += `
    <div class="container">
      <div class="card blue-grey darken-1 animate__animated animate__fadeInRight">
          <div class="card-content white-text">
            <span class="card-title">${ToDo.title}</span>
            <p>${ToDo.description}</p>
            <div class="priority ${prioritySelectColor(ToDo.priority)}">
              <span class="">${ToDo.priority}</span>
            </div>
          </div>
        <div class="card-action">
          <button class="btn ">Delete</button>
          <button class="btn ">Edit</button>
        </div>
      </div>
    </div>
    
    `;
  });
};

showToDoList();
module.exports = {
  getToDoList,
};
