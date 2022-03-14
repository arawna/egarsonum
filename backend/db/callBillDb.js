const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const addCallBill = async (tableId, cafeId, date) => {
  await knex
    .insert({ table_id: tableId, cafe_id: cafeId, date: date })
    .into("call_bill");
};

const getActiveCallBillsByCafeId = async (cafeId) => {
  return await knex("call_bill")
    .where("call_bill.cafe_id", cafeId)
    .where("call_bill.active", true)
    .innerJoin("tables", "call_bill.table_id", "tables.id")
    .select(
      "call_bill.id",
      "call_bill.table_id",
      "call_bill.cafe_id",
      "call_bill.active",
      "tables.table_no",
      "call_bill.date"
    );
};

const setActiveFalseByCallBillId = async (callBillId) => {
  await knex("call_bill").where({ id: callBillId }).update({ active: false });
};

const callBillDb = {
  addCallBill: addCallBill,
  getActiveCallBillsByCafeId: getActiveCallBillsByCafeId,
  setActiveFalseByCallBillId: setActiveFalseByCallBillId,
};

module.exports = callBillDb;
