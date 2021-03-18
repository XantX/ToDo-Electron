const { createWindow } = require("./main");
const { app } = require("electron");
require("electron-reload")(__dirname);
require("./database");

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);
