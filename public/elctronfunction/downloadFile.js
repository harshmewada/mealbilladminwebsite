var request = require("request");
var fs = require("fs");

function downloadFile(file_url, targetPath, fileName) {
  // Save variable to know progress
  // var received_bytes = 0;
  // var total_bytes = 0;
  const dir = targetPath;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }
  var req = request({
    method: "GET",
    uri: file_url,
  });

  var out = fs.createWriteStream(targetPath + "/" + fileName);
  req.pipe(out);

  // req.on("response", function (data) {
  //   // Change the total bytes value to get progress later.
  //   total_bytes = parseInt(data.headers["content-length"]);
  // });

  // req.on("data", function (chunk) {
  //   // Update the received bytes
  //   received_bytes += chunk.length;

  //   showProgress(received_bytes, total_bytes);
  // });

  req.on("end", function () {
    // console.log("File succesfully downloaded");
  });
  return null;
}

function showProgress(received, total) {
  var percentage = (received * 100) / total;
  console.log(
    percentage + "% | " + received + " bytes out of " + total + " bytes."
  );
}
module.exports = downloadFile;
