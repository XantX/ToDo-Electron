const ToDoForm = document.getElementById("toDoForm");
const titleTodoForm = document.getElementById("title");
const descriptionToDoForm = document.getElementById("description");
const PriorityToDoForm = document.getElementsByName("group1");

const { remote } = require("electron");
const window = remote.require("./database-functions/data-functions");
const { showToDoList, hideSideBar, showSideBar } = require("../app");
let ToDoList = [];
let EditingEstatus = false;
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
  if (!EditingEstatus) {
    await window.createToDo(newToDo);
  } else {
    console.log("Editando");
  }

  getToDoList();
});

const getToDoList = async () => {
  ToDoList = await window.getToDoList();
  showToDoList(ToDoList);
};

async function init() {
  await getToDoList();
}

init();
async function deleteById(id) {
  const response = confirm("Are you sure you want delete it ");
  if (response) {
    window.deleteToDo(id);
    await getToDoList();
  }
  return;
}
async function editToDo(id) {
  const ToDo = await window.editToDo(id);
  showSideBar();
  titleTodoForm.value = ToDo.title;
  descriptionToDoForm.value = ToDo.description;
  EditingEstatus = true;
}
module.exports = {
  getToDoList,
  deleteById,
  editToDo,
};
