
require("./electron-functions/functions");
require("./getData-form/getData");

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
module.exports = {
  hideSideBar,
  showSideBar,
}


