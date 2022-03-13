const express = require("express");
const callWaiterDb = require("../db/callWaiterDb");
const tokkenService = require("../core/tokkenService");

const callWaiterController = express.Router();

callWaiterController.post("/api/callWaiter/add", (req, res) => {
  if ((req.body.tableId, req.body.cafeId)) {
    callWaiterDb
      .addCallWaiter(
        req.body.tableId,
        req.body.cafeId,
        new Date().toISOString().slice(0, 19).replace("T", " ")
      )
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Garson çağırıldı",
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

callWaiterController.post("/api/callWaiter/getByCafeId", async (req, res) => {
  if (req.body.token) {
    if (tokkenService.validateToken(req.body.token)) {
      callWaiterDb
        .getActiveCallWaitersByCafeId(
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

callWaiterController.post(
  "/api/callWaiter/setActiveFalseByCallWaiterId",
  (req, res) => {
    if ((req.body.token, req.body.callWaiterId)) {
      if (tokkenService.validateToken(req.body.token)) {
        callWaiterDb
          .setActiveFalseByCallWaiterId(req.body.callWaiterId)
          .then(() => {
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

module.exports = callWaiterController;
