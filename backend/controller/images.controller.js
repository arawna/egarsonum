const express = require("express");
const imagesController = express.Router();
const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const imagesDb = require("../db/imagesDb");
// knex.migrate.latest();

// imagesController.post("/api/imgupload", async (req, res) => {
//   const { name, data } = req.files.pic;
//   if (name && data) {
//     await knex.insert({ name: name, img: data }).into("images");
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(400);
//   }
// });

// imagesController.get("/api/img/:id", async (req, res) => {
//   const id = req.params.id;
//   const img = await knex("images").where({ id: id }).first();
//   if (img) {
//     // const contentType = await FileType.fromBuffer(img.img); // get the mimetype of the buffer (in this case its gonna be jpg but can be png or w/e)
//     // res.type(contentType.mime); // not always needed most modern browsers including chrome will understand it is an img without this
//     res.end(img.img);
//   } else {
//     res.end("No Img with that Id!");
//   }
// });
imagesController.post("/api/imgupload", async (req, res) => {
  const { name, data } = req.files.pic;
  if (name && data) {
    imagesDb.addImage(name, data).then((result) => {
      res.status(200).json({
        textId: result,
      });
    });
    // await knex.insert({ name: name, img: data }).into("images");
  } else {
    res.sendStatus(400);
  }
});

imagesController.get("/api/img/:id", async (req, res) => {
  const id = req.params.id;

  imagesDb.getImageByTextId(id).then((result) => {
    if (result) {
      res.end(result);
    } else {
      res.end("No Img with that Id!");
    }
  });
});

// export default imagesController;
module.exports = imagesController;
