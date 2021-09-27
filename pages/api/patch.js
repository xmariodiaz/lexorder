import { collectionsRank } from "./dumbHelper.js";
var fs = require("fs");
var collections = [];

export default function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).send({ message: "Only PATCH requests allowed" });
    return;
  }
  const { prev, next, updateCid } = req.body;
  if (!prev || !next && !updateCid) {
    res.status(400).send({ message: "Information missing Brah!" });
    return;
  }

  fs.readFile(
    __dirname + "/userCollections.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err || !data) {
        console.log(err);
      } else {
        collections = JSON.parse(data); //now it an object

        const newRank = collectionsRank(prev, next);
        const collections1 = collections.map((items) => {
          if (items.cid === updateCid) {
            return {
              cid: items.cid,
              title: items.title,
              description: items.description,
              priority: newRank,
              numVideos: items.numVideos,
            };
          } else {
            return items;
          }
        });

        collections = collections1;
        console.log(collections);
        fs.writeFile(
          __dirname + "/userCollections.json",
          JSON.stringify(collections),
          "utf8"
        );

        res.send(collections);
      }
    }
  );
}
