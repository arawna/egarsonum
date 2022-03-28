const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const userDb = require("./userDb");

const getAllCafes = async () => {
  return await knex
    .select("*")
    .from("cafes")
    .innerJoin("users", "cafes.cafe_id", "users.id");
};

const getByIdCafe = async (cafeId) => {
  return await knex("cafes").where({ cafe_id: cafeId }).first();
};

const getCafeByEmail = async (email) => {
  let data = await knex
    .select("*")
    .from("cafes")
    .innerJoin("users", "cafes.cafe_id", "users.id")
    .where("users.email", email)
    .first();
  return data;
};

const addCafe = async (
  email,
  pass,
  cafeName,
  tableAmount,
  createDate,
  lastDate,
  order
) => {
  userDb.addUser(email, pass).then(async () => {
    userDb.getByEmailUser(email).then(async (res) => {
      await knex
        .insert({
          cafe_id: res.id,
          name: cafeName,
          table_amount: tableAmount,
          create_date: createDate,
          last_date: lastDate,
          order: order,
        })
        .into("cafes");
    });
  });
};

const cafesDb = {
  getAllCafes: getAllCafes,
  getByIdCafe: getByIdCafe,
  addCafe: addCafe,
  getCafeByEmail: getCafeByEmail,
};

module.exports = cafesDb;
