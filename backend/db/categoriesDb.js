const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const getCategoriesByCafeId = async (cafeId) => {
  return await knex("categories").where({ cafe_id: cafeId });
};

const getCategoryByCategoryId = async (categoryId) => {
  return await knex("categories").where({ id: categoryId }).first();
};

const deleteCategoryByCafeIdAndCategoryId = async (categoryId, cafeId) => {
  await knex("categories").where({ id: categoryId, cafe_id: cafeId }).del();
};

const addCategory = async (cafeId, name, imgUrl) => {
  await knex
    .insert({ cafe_id: cafeId, name: name, img_url: imgUrl })
    .into("categories");
};

const updateCategory = async (categoryId, name, imgUrl) => {
  await knex("categories")
    .where({ id: categoryId })
    .update({ name: name, img_url: imgUrl });
};

const categoriesDb = {
  getCategoriesByCafeId: getCategoriesByCafeId,
  deleteCategoryByCafeIdAndCategoryId: deleteCategoryByCafeIdAndCategoryId,
  addCategory: addCategory,
  updateCategory: updateCategory,
  getCategoryByCategoryId: getCategoryByCategoryId,
};

module.exports = categoriesDb;
