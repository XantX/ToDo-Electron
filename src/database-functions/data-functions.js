const { getConnection } = require("../database");
const { Notification } = require("electron");
async function getToDoList() {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM ToDoList");
  return result;
}

async function createToDo(ToDo) {
  try {
    const conn = await getConnection();
    await conn.query("INSERT INTO ToDoList SET ?", ToDo);

    new Notification({
      title: "Saved ToDo",
      icon: "../to-do-list.ico",
      body: "New ToDo saved Successfully",
    }).show();
  } catch (error) {
    console.log(error);
  }
}
async function deleteToDo(id) {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM ToDoList WHERE ID = ?", id);
}
module.exports = {
  createToDo,
  getToDoList,
  deleteToDo,
};
