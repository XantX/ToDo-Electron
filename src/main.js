const { BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
let window;
function createWindow() {
  window = new BrowserWindow({
    frame:false,
    center: true,
    width: 976,
    height: 662,
    minWidth: 976,
    minHeight: 662,
    icon:path.join(__dirname, "./to-do-list.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "template/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  console.log(window);
}

module.exports = {
  createWindow,
};
