const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const randomText = require("../core/randomText");

const addImage = async (name, data) => {
  let randomTextId = randomText(30);
  await knex
    .insert({ name: name, img: data, text_id: randomTextId })
    .into("images");
  return randomTextId;
};

const getImageByTextId = async (textId) => {
  let img = await knex("images").where({ text_id: textId }).first();
  if (img) {
    return img.img;
  } else {
    return null;
  }
};

const imagesDb = {
  addImage: addImage,
  getImageByTextId: getImageByTextId,
};

module.exports = imagesDb;
