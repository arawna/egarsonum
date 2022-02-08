import express from "express";
const imagesController = express.Router();
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "1220fb1220",
    database: "egarsonum",
  },
});
// knex.migrate.latest();

imagesController.post("/api/imgupload", async (req, res) => {
  const { name, data } = req.files.pic;
  if (name && data) {
    await knex.insert({ name: name, img: data }).into("images");
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

imagesController.get("/api/img/:id", async (req, res) => {
  const id = req.params.id;
  const img = await knex("images").where({ id: id }).first();
  if (img) {
    // const contentType = await FileType.fromBuffer(img.img); // get the mimetype of the buffer (in this case its gonna be jpg but can be png or w/e)
    // res.type(contentType.mime); // not always needed most modern browsers including chrome will understand it is an img without this
    res.end(img.img);
  } else {
    res.end("No Img with that Id!");
  }
});
export default imagesController;
