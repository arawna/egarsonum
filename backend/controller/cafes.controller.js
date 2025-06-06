const express = require("express");
const cafesDb = require("../db/CafesDb");
const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const tokenService = require("../core/tokkenService");

const cafesController = express.Router();

cafesController.post("/api/cafelogin", async (req, res) => {
  //   cafesDb.getCafeByEmail(req.body.email).then((result) => {
  //     res.status(200).json(result);
  //   });
  if (req.body.email && req.body.pass) {
    cafesDb.getCafeByEmail(req.body.email).then((result) => {
      if (result) {
        if (req.body.pass === result.password) {
          if (result.last_date < new Date()) {
            res.status(400).json({
              status: false,
              message: "Ödeme Tarihi geçti",
              data: null,
            });
          } else {
            result.token = tokenService.createTokken(
              req.body.email,
              req.body.pass,
              result.cafe_id,
              result.table_amount,
              result.last_date,
              result.name
            );
            res.status(200).json({
              status: true,
              message: "Giriş yapıldı",
              data: result,
            });
          }
        } else {
          res.status(400).json({
            status: false,
            message: "Email yada şifre hatalı",
            data: null,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "Email yada şifre hatalı",
          data: null,
        });
      }
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

cafesController.post("/api/getCafeDetailsByToken", async (req, res) => {
  if (req.body.token) {
    if (tokenService.validateToken(req.body.token)) {
      res.status(200).json({
        status: true,
        message: "Detaylar listelendi",
        data: tokenService.getDetailToken(req.body.token),
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
});

module.exports = cafesController;
