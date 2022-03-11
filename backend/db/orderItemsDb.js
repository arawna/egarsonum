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

const getActiceAndNotSeenOrdersByCafeId = async (cafeId) => {
  // return await knex("order_items").where({
  //   cafe_id: cafeId,
  //   active: true,
  //   seen: false,
  // });
  return await knex("order_items")
    .where("order_items.cafe_id", cafeId)
    .where("order_items.active", true)
    .where("order_items.seen", false)
    .innerJoin("tables", "order_items.table_id", "tables.id")
    .select(
      "order_items.id",
      "order_items.product_id",
      "order_items.product_name",
      "order_items.product_price",
      "order_items.amount",
      "order_items.note",
      "order_items.table_id",
      "order_items.cafe_id",
      "order_items.order_date",
      "order_items.active",
      "order_items.seen",
      "tables.table_no"
    );
};

const getActiveAndSeenOrdersByCafeId = async (cafeId) => {
  return await knex("order_items")
    .where("order_items.cafe_id", cafeId)
    .where("order_items.active", true)
    .where("order_items.seen", true)
    .innerJoin("tables", "order_items.table_id", "tables.id")
    .select(
      "order_items.id",
      "order_items.product_id",
      "order_items.product_name",
      "order_items.product_price",
      "order_items.amount",
      "order_items.note",
      "order_items.table_id",
      "order_items.cafe_id",
      "order_items.order_date",
      "order_items.active",
      "order_items.seen",
      "tables.table_no"
    );
};

const setSeenTrueByOrderId = async (orderId) => {
  await knex("order_items").where({ id: orderId }).update({ seen: true });
};

const orderItemsDb = {
  addOrderItem: addOrderItem,
  getActiceAndNotSeenOrdersByCafeId: getActiceAndNotSeenOrdersByCafeId,
  getActiveAndSeenOrdersByCafeId: getActiveAndSeenOrdersByCafeId,
  setSeenTrueByOrderId: setSeenTrueByOrderId,
};

module.exports = orderItemsDb;
