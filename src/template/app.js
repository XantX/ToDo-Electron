const { editToDo, deleteById } = require("./getData-form/getData");

require("./electron-functions/functions");
require("./getData-form/getData");


function hideSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("animate__fadeInLeft");
  sidebar.classList.add("animate__fadeOutLeft");
  sidebar.className += " hide";
  const mainTodo = document.getElementById("main");
  mainTodo.classList.remove("s8");
  mainTodo.classList.add("s12");
}
function showSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("hide");
  sidebar.classList.remove("animate__fadeOutLeft");
  sidebar.classList.add("animate__fadeInLeft");

  const mainTodo = document.getElementById("main");
  mainTodo.classList.remove("s12");
  mainTodo.classList.add("s8");
}

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

const showToDoList = (ToDoList) => {
  ToDoListRender.innerHTML = "";
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
          <button class="btn " onclick="deleteById(${ToDo.ID})">Delete</button>
          <button class="btn " onclick="editToDo(${ToDo.ID})">Edit</button>
        </div>
      </div>
    </div>
    
    `;
  });
};

module.exports = {
  hideSideBar,
  showSideBar,
  showToDoList,
};
