var fs = require("fs");
let collections = [];
export default function handler(req, res) {
fs.readFile(__dirname +"/userCollections.json", "utf8", function readFileCallback(err, data) {
  if (err|| !data) {
    console.log(err);
  } else {

    collections = JSON.parse(data); //now it an object
    collections.sort((a, b) => a.priority.localeCompare(b.priority));
    res.status(200).json({ collections });
  }
});


}