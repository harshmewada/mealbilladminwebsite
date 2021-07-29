var PouchDB = require("pouchdb");
const axios = require("axios");
async function fetchOfflineData(data) {
  let users = "Empty";
  var db = new PouchDB("offlineData");

  const info = await db.info();
  if (info && info.doc_count === 0 && info.update_seq === 0) {
    return "database does not exist";
  } else {
    const usersData = await axios({
      method: "get",
      url: "https://randomuser.me/api/",
      responseType: "json",
    });
    if (usersData) {
      const userDoc = {
        _id: "users",
        users: usersData.data.results,
      };

      return userDoc;
    } else {
      return "No users found";
    }
  }
  return "opboss bahar";
  db.info().then(async function (info) {
    console.log("info", info);
    if (info.doc_count === 0 && info.update_seq === 0) {
      return "opboss";

      console.log("database does not exist");

      await axios({
        method: "get",
        url: "https://randomuser.me/api/",
        responseType: "json",
      }).then((users) => {
        console.log("users", users.data.results);
        const userDoc = {
          _id: "users",
          users: users.data.results,
        };
        db.put(userDoc).then((userInfo) => {
          db.get("users").then(function (doc) {
            console.log("gotUsers", doc);
            users = doc;

            return doc;
          });
        });
      });

      // testdb.destroy().then(function () {
      //   console.log("test db removed");
      // });
    } else {
      console.log("database exists");

      return users;
    }
  });
}

module.exports = fetchOfflineData;
