const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const addOrderItem = async (
  productId,
  productName,
  productPrice,
  amount,
  note,
  tableId,
  cafeId,
  orderDate
) => {
  await knex
    .insert({
      product_id: productId,
      product_name: productName,
      product_price: productPrice,
      amount: amount,
      note: note,
      table_id: tableId,
      cafe_id: cafeId,
      order_date: orderDate,
    })
    .into("order_items");
};

const getActiceOrdersByCafeId = async (cafeId) => {
  return await knex("order_items").where({ cafe_id: cafeId, active: true });
};

const orderItemsDb = {
  addOrderItem: addOrderItem,
  getActiceOrdersByCafeId: getActiceOrdersByCafeId,
};

module.exports = orderItemsDb;
