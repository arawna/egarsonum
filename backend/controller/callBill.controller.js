const express = require("express");
const callBillDb = require("../db/callBillDb");
const tokkenService = require("../core/tokkenService");

const callBillController = express.Router();

callBillController.post("/api/callBill/add", (req, res) => {
  if ((req.body.tableId, req.body.cafeId)) {
    callBillDb
      .addCallBill(
        req.body.tableId,
        req.body.cafeId,
        new Date().toISOString().slice(0, 19).replace("T", " ")
      )
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Hesap istendi",
          data: null,
        });
      });
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

callBillController.post("/api/callBill/getByCafeId", async (req, res) => {
  if (req.body.token) {
    if (tokkenService.validateToken(req.body.token)) {
      callBillDb
        .getActiveCallBillsByCafeId(
          tokkenService.getDetailToken(req.body.token).cafeId
        )
        .then((result) => {
          res.status(200).json({
            status: true,
            message: "Data listelendi",
            data: result,
          });
        });
    } else {
      res.status(401).json({
        status: false,
        message: "Token geçersiz",
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

callBillController.post(
  "/api/callBill/setActiveFalseByCallBillId",
  (req, res) => {
    if ((req.body.token, req.body.callBillId)) {
      if (tokkenService.validateToken(req.body.token)) {
        callBillDb.setActiveFalseByCallBillId(req.body.callBillId).then(() => {
          res.status(200).json({
            status: true,
            message: "Görüldi olarak işaretlendi",
            data: null,
          });
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Token geçersiz",
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
  }
);

module.exports = callBillController;
