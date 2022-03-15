const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const getCustomerInfoByIp = async (ip) => {
  let data = await knex("customer_informations")
    .where("customer_informations.ip", ip)
    .innerJoin("cafes", "customer_informations.cafe_id", "cafes.cafe_id")
    .orderBy("customer_informations.create_date", "desc")
    .select(
      "customer_informations.cafe_id",
      "customer_informations.table_id",
      "customer_informations.create_date",
      "cafes.order"
    )
    .first();

  // return await knex("products")
  //   .where("products.category_id", categoryId)
  //   .innerJoin("categories", "products.category_id", "categories.id")
  //   .select(
  //     "products.product_id",
  //     "products.cafe_id",
  //     { category_name: "categories.name" },
  //     "products.category_id",
  //     "products.product_name",
  //     "products.product_price",
  //     "products.product_description",
  //     "products.product_img_url"
  //   );

  let firstDate = new Date(data.create_date).getTime() + 2 * 60 * 60 * 1000;
  let curentDate = new Date(
    new Date().toISOString().slice(0, 19).replace("T", " ")
  ).getTime();
  data.stil_valid = firstDate > curentDate;
  return {
    cafe_id: data.cafe_id,
    table_id: data.table_id,
    stil_valid: data.stil_valid,
    order: data.order,
  };
};
module.exports = getCustomerInfoByIp;
