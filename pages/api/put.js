import { makeid, collectionsRank } from "./dumbHelper.js";
var fs = require("fs");
export default function handler(req, res) {
  const crypto = require("crypto");

  let collections = [];

  const newCollection = req.body ? req.body : null;

  if (!newCollection) {
    fs.readFile(
      __dirname + "/userCollections.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err || !data) {
          console.log(err);
        } else {
          collections = JSON.parse(data); //now it an object

          // check user collections
          const numberOfCollections = collections.length;
          console.log(`====numberOfCollections: ${numberOfCollections}`);
          const prevPriority =
            numberOfCollections > 0
              ? collections[numberOfCollections - 1].priority
              : "";
          console.log(`======prevPriority: ${prevPriority}`);

          const newRank = collectionsRank(prevPriority, "");

          console.log(`=====newRank: ${newRank}`); //
          console.log(`=====newlength: ${newRank.length} \n`); //
          collections.push({
            cid: crypto
              .createHash("sha1")
              .update(new Date().toISOString())
              .digest("hex")
              .toString(),
            title: `${makeid()} Playlist ${makeid()}`,
            description: `My personal vidz ${makeid()}`,
            priority: newRank,
            numVideos: Math.floor(Math.random() * 10) + 0,
          });
          //send response
          collections.sort((a, b) => a.priority.localeCompare(b.priority));
          //

          fs.writeFile(
            __dirname + "/userCollections.json",
            JSON.stringify(collections),
            "utf8"
          );
        }
        res.send(`new Collections:\n${JSON.stringify(collections)}`);
      }
    );
    //

  } else {
    res.status(200).json({ res: "Nothing to see!!" });
  }
}
