const express = require("express");
const tablesDb = require("../db/tablesDb");
const tokenService = require("../core/tokkenService");

const tablesController = express.Router();

tablesController.post("/api/tables/getTableByCafeId", async (req, res) => {
  if (req.body.token) {
    if (tokenService.validateToken(req.body.token)) {
      let tokenData = tokenService.getDetailToken(req.body.token);
      tablesDb.getTablesByCafeId(tokenData.cafeId).then((result) => {
        res.status(200).json({
          status: true,
          message: "Data listelendi",
          data: result,
        });
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Son Ödeme Tarihi geçti",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

tablesController.post("/api/tables/addTable", async (req, res) => {
  if (req.body.token && req.body.tableNo) {
    if (tokenService.validateToken(req.body.token)) {
      let tokenData = tokenService.getDetailToken(req.body.token);
      tablesDb.getTablesByCafeId(tokenData.cafeId).then((result) => {
        if (result.length >= tokenData.tableAmount) {
          res.status(400).json({
            status: false,
            message: "Maksimum masa sayısına ulaştınız",
            data: null,
          });
        } else {
          tablesDb.addTable(tokenData.cafeId, req.body.tableNo).then(() => {
            res.status(200).json({
              status: true,
              message: "Masa eklendi",
              data: null,
            });
          });
        }
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Son Ödeme Tarihi Geçti",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

tablesController.post("/api/tables/deleteTable", async (req, res) => {
  if (req.body.token && req.body.tableId) {
    if (tokenService.validateToken(req.body.token)) {
      let tokenData = tokenService.getDetailToken(req.body.token);
      tablesDb
        .deleteTableByTableIdAndCafeId(req.body.tableId, tokenData.cafeId)
        .then(() => {
          res.status(200).json({
            status: false,
            message: "Masa silindi",
            data: null,
          });
        });
    } else {
      res.status(404).json({
        status: false,
        message: "Son ödeme tarihi geçti",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

module.exports = tablesController;
