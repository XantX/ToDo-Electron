const { getToDoList } = require("./getData-form/getData");

require("./electron-functions/functions");
require("./getData-form/getData");

const ToDoListRender = document.getElementById("mainListToDo");

function hideSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.className += " hide";
  const mainTodo = document.getElementById("main");
  mainTodo.classList.remove("s8");
  mainTodo.classList.add("s12");
}
function showSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("hide");
  const mainTodo = document.getElementById("main");
  mainTodo.classList.remove("s12");
  mainTodo.classList.add("s8");
}

//window.addEventListener("scroll", () => {
  //let titleBar = document.getElementById("titleBar");

  //titleBar.classList.toggle("sticky", window.screenY > 0);
//});

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
  const ToDoList = await getToDoList();

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
