const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const getAllUsers = async () => {
  return await knex.select().table("users");
};

const getByEmailUser = async (email) => {
  return await knex("users").where({ email: email }).first();
};

const addUser = async (email, pass) => {
  await knex.insert({ email: email, password: pass }).into("users");
};

const userDb = {
  getAllUsers: getAllUsers,
  getByEmailUser: getByEmailUser,
  addUser: addUser,
};

module.exports = userDb;
