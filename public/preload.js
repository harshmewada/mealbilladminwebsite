// import electronPrintBill from "./elctronfunction/electronPrintBill";

const {
  contextBridge,
  ipcRenderer,
  BrowserWindow,
  ipcMain,
  remote,
  path,
} = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  isElectron: true,
  printSilently: (htmldata) => {
    console.log("htmldata", htmldata);
    var BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({
      width: 1024,
      height: 768,
      show: true,
      webPreferences: {
        nodeIntegration: false,
        webSecurity: true,
        allowEval: false,
        nativeWindowOpen: true,
        allowRunningInsecureContent: false,
        contextIsolation: true,
        enableRemoteModule: true,
      },
      autoHideMenuBar: true,
    });
    var html = [
      `<body>
      <h1>It works</h1>
       ${htmldata}
      </body>`,
    ].join("");
    win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
    win.webContents.on("did-finish-load", function () {
      win.webContents.print({ silent: true });
    });
    //   new Promise((res, fail) => {
    //   ipcRenderer.send("silent-print");
    //   ipcRenderer.once("silent-print-result", (event, result) => {
    //     result === "success" ? res() : fail(result);
    //   });
    // }),
  },
  send: (content, func) => {
    // whitelist channels
    // console.log("isElectron send", data);

    // ipcRenderer.send("printPage", data);
    ipcRenderer.send("printPage", content);
    // ipcRenderer.sendSync("notify", {
    //   message: data,
    // });
  },
  notify: (data, func) => {
    // whitelist channels
    console.log("isElectron send", data);

    ipcRenderer.send("notify", data);
  },
  // receive: (channel, func) => {
  //   let validChannels = ["fromMain"];
  //   if (validChannels.includes(channel)) {
  //     // Deliberately strip event as it includes `sender`
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // },
  // handlePrint: (channel, data) => {
  //   ipcRenderer.send("notify", (event, ...args) => {});
  //   // electronPrintBill(printdata);
  // },
});
