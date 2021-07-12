const downloadFile = require("./downloadFile");

function saveLogoFile(path) {
  //   alert("save");
  downloadFile(path, `${process.cwd()}/offlineImages`, "resLogo.png");
}

module.exports = saveLogoFile;
