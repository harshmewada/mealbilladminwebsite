// import electronPrintBill from "./elctronfunction/electronPrintBill";

const {
  contextBridge,
  ipcRenderer,
  BrowserWindow,
  ipcMain,
  remote,
  path,
} = require("electron");
const fetchOfflineData = require("./elctronfunction/fetchOffflineData");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  isElectron: true,

  updateOnlineStatus: () => {
    ipcRenderer.send(
      "online-status-changed",
      navigator.onLine ? "online" : "offline"
    );
  },

  printBillSilently: (data, func) => {
    ipcRenderer.send("printBill", data);
  },

  printKOTSilently: (data, func) => {
    ipcRenderer.send("printKOT", data);
  },

  fecthOfflineData: async (data, func) => {
    return await ipcRenderer.invoke("fetchOfflineData", data);
    // const result = await ipcRenderer.invoke("fetchOfflineData");
    // console.log("fetc res", result);
    // return result;
    // fetchOfflineData(data, func);
  },

  saveLogo: (data, func) => {
    // new Promise((res, fail) => {
    ipcRenderer.send("saveLogo", data);
    // ipcRenderer.send("silent-print");
    // })
    // ipcRenderer.sendSync("notify", {
    //   message: "notify",
    // });
  },
  // send: (content, func) => {
  //   // whitelist channels
  //   // console.log("isElectron send", data);

  //   // ipcRenderer.send("printPage", data);
  //   ipcRenderer.send("printPage", content);
  //   // ipcRenderer.sendSync("notify", {
  //   //   message: data,
  //   // });
  // },
  notify: (data, func) => {
    // whitelist channels
    // console.log("isElectron send", data);
    // const newCallback = (_, data) => func();
    // ipcRenderer.send("notify", data, newCallback);
  },

  sendData: (channel, data, cb) => {
    // whitelist channels
    let validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      // console.log("called");
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
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
