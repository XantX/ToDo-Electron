const ToDoForm = document.getElementById("toDoForm");
const titleTodoForm = document.getElementById("title");
const descriptionToDoForm = document.getElementById("description");
const PriorityToDoForm = document.getElementsByName("group1");
const FormTitle = document.getElementById("FormTitle")
const { remote } = require("electron");
const window = remote.require("./database-functions/data-functions");

const { showToDoList, hideSideBar, showSideBar } = require("../app");

let ToDoList = [];

let EditingEstatus = false;
let editToDoId = "";

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

  if (!EditingEstatus) {
    await window.createToDo(newToDo);
  } else {
    await window.updateToDo(editToDoId,newToDo);
    if (EditingEstatus) changesStateEdit(false);
  }
  hideSideBar();
  ToDoForm.reset();
  titleTodoForm.focus();
  getToDoList();
});

const getToDoList = async () => {
  ToDoList = await window.getToDoList();
  showToDoList(ToDoList);
};

async function deleteById(id) {
  const response = confirm("Are you sure you want delete it ");
  if (response) {
    window.deleteToDo(id);
    await getToDoList();
  }
  return;
}

async function editToDo(id) {
  const ToDoEdit = await window.getToDo(id);
  FormTitle.innerHTML = "Edit ToDo";
  showSideBar();
  titleTodoForm.value = ToDoEdit.title;
  descriptionToDoForm.value = ToDoEdit.description;

  for (priorityToDo of PriorityToDoForm) {
    if (ToDoEdit.priority == priorityToDo.value) {
      priorityToDo.checked = true;
    }
  }
  editToDoId = ToDoEdit.ID;
  changesStateEdit(true);
  //EditingEstatus = true;
}

function changesStateEdit (status){
  const newEditingEstatus = status;
  EditingEstatus = newEditingEstatus;
  if(!status) editToDoId = "";
}
async function init() {
  await getToDoList();
}

init();
module.exports = {
  changesStateEdit,
  getToDoList,
  deleteById,
  editToDo,
};
