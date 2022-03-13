const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);

const addCallWaiter = async (tableId, cafeId, date) => {
  await knex
    .insert({ table_id: tableId, cafe_id: cafeId, date: date })
    .into("call_waiter");
};

const getActiveCallWaitersByCafeId = async (cafeId) => {
  return await knex("call_waiter")
    .where("call_waiter.cafe_id", cafeId)
    .where("call_waiter.active", true)
    .innerJoin("tables", "call_waiter.table_id", "tables.id")
    .select(
      "call_waiter.id",
      "call_waiter.table_id",
      "call_waiter.cafe_id",
      "call_waiter.active",
      "tables.table_no",
      "call_waiter.date"
    );
};

const setActiveFalseByCallWaiterId = async (callWaiterId) => {
  await knex("call_waiter")
    .where({ id: callWaiterId })
    .update({ active: false });
};

const callWaiterDb = {
  addCallWaiter: addCallWaiter,
  getActiveCallWaitersByCafeId: getActiveCallWaitersByCafeId,
  setActiveFalseByCallWaiterId: setActiveFalseByCallWaiterId,
};

module.exports = callWaiterDb;
