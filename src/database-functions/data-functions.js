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
      title: "Save ToDo",
      body: "New ToDo saved Succelfully",
    }).show();

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createToDo,
  getToDoList,
};
