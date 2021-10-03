const electron = require("electron"),
  url = require("url"),
  path = require("path");

const { app, Menu, BrowserWindow } = electron;

const { ipcMain } = electron;

let mainWin;

var onData = "";

app.on("ready", () => {
  mainWin = new BrowserWindow({
    icon: path.join(__dirname, "/assets/logo.png"),
    webPreferences: {
      nodeIntegration: false,
    },

    width: 1920,
    height: 1080,
    options: {
      fullscreen: true,
    },
  });
  mainWin.loadURL(
    url.format({
      pathname: path.join(__dirname, "/views/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  mainWin.on("closed", function () {
    mainWindow = null;
  });
  // mainWin.setMenu(null);

  // mainWin.setFullScreen(true);
  mainWin.maximize();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
