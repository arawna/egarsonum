const express = require("express");
const orderItemsDb = require("../db/orderItemsDb");
const tokenService = require("../core/tokkenService");

const orderController = express.Router();

orderController.post("/api/order/add", async (req, res) => {
  if (req.body.cart && req.body.cafeId && req.body.tableId) {
    for (let i = 0; i < req.body.cart.length; i++) {
      //ekleme db
      await orderItemsDb.addOrderItem(
        req.body.cart[i].productId,
        req.body.cart[i].productName,
        parseFloat(req.body.cart[i].productPrice),
        req.body.cart[i].amount,
        req.body.cart[i].note,
        req.body.tableId,
        req.body.cafeId,
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
    }
    res.status(200).json({
      status: true,
      message: "Sipariş verildi",
      data: null,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

orderController.post(
  "/api/order/getActiveAndNotSeenOrdersByCafeId",
  async (req, res) => {
    if (req.body.token) {
      if (tokenService.validateToken(req.body.token)) {
        orderItemsDb
          .getActiceAndNotSeenOrdersByCafeId(
            tokenService.getDetailToken(req.body.token).cafeId
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
          message: "Token süresi geçti",
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

orderController.post(
  "/api/order/getActiveAndSeenOrdersByCafeId",
  async (req, res) => {
    if (req.body.token) {
      if (tokenService.validateToken(req.body.token)) {
        orderItemsDb
          .getActiveAndSeenOrdersByCafeId(
            tokenService.getDetailToken(req.body.token).cafeId
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
          message: "Token süresi geçti",
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

orderController.post("/api/order/setSeenTrue", async (req, res) => {
  if (req.body.token && req.body.orderId) {
    if (tokenService.validateToken(req.body.token)) {
      orderItemsDb.setSeenTrueByOrderId(req.body.orderId).then(() => {
        res.status(200).json({
          status: true,
          message: "Görültü olarak işaretlendi",
          data: null,
        });
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Token süre geçmiş",
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

module.exports = orderController;
