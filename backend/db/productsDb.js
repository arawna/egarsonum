const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const getProductsByCafeId = async (cafeId) => {
  return await knex("products")
    .where("products.cafe_id", cafeId)
    .innerJoin("categories", "products.category_id", "categories.id")
    .select(
      "products.product_id",
      "products.cafe_id",
      { category_name: "categories.name" },
      "products.category_id",
      "products.product_name",
      "products.product_price",
      "products.product_description",
      "products.product_img_url"
    );
};

const getProductsByCategoryId = async (categoryId) => {
  return await knex("products")
    .where("products.category_id", categoryId)
    .innerJoin("categories", "products.category_id", "categories.id")
    .select(
      "products.product_id",
      "products.cafe_id",
      { category_name: "categories.name" },
      "products.category_id",
      "products.product_name",
      "products.product_price",
      "products.product_description",
      "products.product_img_url"
    );
};

const getProductByProductId = async (productId) => {
  return await knex("products").where({ product_id: productId }).first();
};

const addProduct = async (
  cafeId,
  categoryId,
  productName,
  price,
  description,
  imgUrl
) => {
  await knex
    .insert({
      cafe_id: cafeId,
      category_id: categoryId,
      product_name: productName,
      product_price: price,
      product_description: description,
      product_img_url: imgUrl,
    })
    .into("products");
};

const deleteProductByProductId = async (productId) => {
  await knex("products").where({ product_id: productId }).del();
};

const updateProduct = async (
  productId,
  categoryId,
  productName,
  price,
  description,
  imgUrl
) => {
  await knex("products").where({ product_id: productId }).update({
    category_id: categoryId,
    product_name: productName,
    product_price: price,
    product_description: description,
    product_img_url: imgUrl,
  });
};

const productsDb = {
  getProductsByCafeId: getProductsByCafeId,
  getProductByProductId: getProductByProductId,
  addProduct: addProduct,
  deleteProductByProductId: deleteProductByProductId,
  updateProduct: updateProduct,
  getProductsByCategoryId: getProductsByCategoryId,
};

module.exports = productsDb;
