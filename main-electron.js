const { Menu, app, globalShortcut, shortcut } = require('electron');
const electron = require('electron');
//const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1024, height: 768 });
    mainWindow.maximize();
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "www/index.html"),
        protocol: "file:",
        slashes: true
    }));

    //-- turn off menu
    Menu.setApplicationMenu(null);

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function () {
    createWindow();
    // Open the DevTools. F12 does not work as global shortcut
    //globalShortcut.register('F12', function() { mainWindow.webContents.openDevTools(); });
    globalShortcut.register('CmdOrCtrl+shift+I', function () { mainWindow.webContents.openDevTools(); });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    };
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    };
});
