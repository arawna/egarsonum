const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const getCustomerInfoByIp = async (ip) => {
  let data = await knex("customer_informations")
    .where({ ip: ip })
    .orderBy("create_date", "desc")
    .first();
  // data.stil_valid =
  //   new Date(
  //     new Date(data.create_date).setHours(
  //       new Date(data.create_date).getHours() + 2
  //     )
  //   ).getTime() > new Date().getTime();

  let firstDate = new Date(data.create_date).getTime() + 2 * 60 * 60 * 1000;
  let curentDate = new Date(
    new Date().toISOString().slice(0, 19).replace("T", " ")
  ).getTime();
  data.stil_valid = firstDate > curentDate;
  return {
    cafe_id: data.cafe_id,
    table_id: data.table_id,
    stil_valid: data.stil_valid,
  };
};
module.exports = getCustomerInfoByIp;
