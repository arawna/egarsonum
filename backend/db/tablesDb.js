const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const addTable = async (cafeId, tableNo) => {
  await knex.insert({ cafe_id: cafeId, table_no: tableNo }).into("tables");
};

const getTablesByCafeId = async (cafeId) => {
  return await knex("tables").where({ cafe_id: cafeId });
};

const deleteTableById = async (tableId) => {
  await knex("tables").where({ id: tableId }).del();
};

const tablesDb = {
  addTable: addTable,
  getTablesByCafeId: getTablesByCafeId,
  deleteTableById: deleteTableById,
};

module.exports = tablesDb;
