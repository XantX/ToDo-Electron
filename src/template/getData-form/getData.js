const ToDoForm = document.getElementById("toDoForm");
const titleTodoForm = document.getElementById("title");
const descriptionToDoForm = document.getElementById("description");
const PriorityToDoForm = document.getElementsByName("group1");

const { remote } = require("electron");
const window = remote.require("./database-functions/data-functions");

ToDoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let priorityTodo;
  for (priorityToDo of PriorityToDoForm) {
    if (priorityToDo.checked) {priorityTodo = priorityToDo.value};
  }

  const newToDo = {
    title: titleTodoForm.value,
    description: descriptionToDoForm.value,
    priority: priorityTodo,
  };

  await window.createToDo(newToDo);

});

let ToDoList = []
const getToDoList = async () => {
  ToDoList = await window.getToDoList();
  return ToDoList;
};

module.exports = {
  getToDoList,
};
