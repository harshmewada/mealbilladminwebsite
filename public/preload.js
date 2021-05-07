// import electronPrintBill from "./elctronfunction/electronPrintBill";

const { contextBridge, ipcRenderer } = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  isElectron: true,
  printSilently: () =>
    new Promise((res, fail) => {
      ipcRenderer.send("silent-print");
      ipcRenderer.once("silent-print-result", (event, result) => {
        result === "success" ? res() : fail(result);
      });
    }),
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
