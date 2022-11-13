const fs = require("fs");
module.exports.saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("db.json", stringifyData);
};
//get the user data from json file
module.exports.getUserData = () => {
  const jsonData = fs.readFileSync("db.json");
  return JSON.parse(jsonData);
};
