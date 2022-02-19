const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "1220fb1220",
    database: "egarsonum",
  },
});
const getCustomerInfoByIp = async (ip) => {
  let data = await knex("customer_informations")
    .where({ ip: ip })
    .orderBy("create_date", "desc")
    .first();
  data.stil_valid =
    new Date(
      new Date(data.create_date).setHours(
        new Date(data.create_date).getHours() + 2
      )
    ) > new Date();
  return {
    cafe_id: data.cafe_id,
    table_id: data.table_id,
    stil_valid: data.stil_valid,
  };
};
module.exports = getCustomerInfoByIp;
