const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const printBill = require("./elctronfunction/electronPrintBill");
const path = require("path");
const {
  createPrintWindow,
} = require("simple-electron-printer-and-thermalprinter");
const isDev = require("electron-is-dev");

let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    title: "Mealbill",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
      nativeWindowOpen: true,
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });
  win.removeMenu();

  win.webContents.on(
    "new-window",
    function (e, url, frameName, disposition, options) {
      options.show = false;
    }
  );
  // win.webContents.on('did-create-window', (childWindow) => {
  //   // For example...
  //   console.log('')
  //   childWindow.webContents('will-navigate', (e) => {
  //     e.preventDefault()
  //   })
  // })
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.on("closed", () => (win = null));

  // Open the DevTools.
  isDev && win.webContents.openDevTools();
}
ipcMain.on("silent-print", (event) => {
  console.log("silent printing", event.sender);
  // Print the window silently
  event.sender.print({ silent: true }, (success, failureReason) => {
    // Signal that the print is finished
    event.reply("silent-print-result", success ? "success" : failureReason);
  });
});
ipcMain.on("printPage", async (_, data) => {
  let printers = win.webContents.getPrinters(); //list the printers

  console.log("printres", printers);
  createPrintWindow({
    html: data,

    cssUrl: "../../resources/css/tablas-printer.css",

    mainWindow: win,

    sheetSize: "A3",
    printerName: "pos",

    config: ["timePrinter", "hiddenWindow"],
  });

  // new Notification({ title: "Notifiatddion", body: message }).show();
});
ipcMain.on("notify", (_, message) => {
  console.log("notify");
  // let printers = win.webContents.getPrinters(); //list the printers
  // var options = {
  //   silent: false,
  //   deviceName: "pos",
  //   printBackground: true,
  //   color: false,
  //   margin: {
  //     marginType: "printableArea",
  //   },
  //   landscape: false,
  //   pagesPerSheet: 1,
  //   collate: false,
  //   copies: 1,
  //   header: "Header of the Page",
  //   footer: "Footer of the Page",
  // };
  // console.log("print ", printers);
  // win.webContents.printSilently()(options, (success, failureReason) => {
  //   if (!success) console.log("print failed", failureReason);
  //   console.log("Print Initiated");
  // });
  new Notification({ title: "Notifiatddion", body: message }).show();
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ipcMain.on("toMain", (event, args) => {
//   // Do something with file contents

//   // Send result back to renderer process
//   win.webContents.send("fromMain", "hehe");
// });
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
