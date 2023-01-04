const express = require("express");
const requestIp = require("request-ip");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const dbcon = require("../dbconnect/dbconnection");
const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const getCustomerInfoByIp = require("../core/customer");
const customerInformationsController = express.Router();

customerInformationsController.get("/api/cafe/:cafetext", async (req, res) => {
  let cafeAndTable = CryptoJS.AES.decrypt(
    req.params["cafetext"],
    "ali"
  ).toString(CryptoJS.enc.Utf8);
  if (!cafeAndTable) {
    //sifreli metin geçersizse yönlendirme
    res.redirect("https://qrgarsonum.arawnsoft.com");
  } else {
    //sifreli medin geçerli ise
    //db kayıt ve yönlendirme yapılacak
    let clientIp = requestIp.getClientIp(req);
    // console.log(new Date().toISOString().slice(0, 19).replace("T", " "));
    await knex
      .insert({
        ip: clientIp,
        cafe_id: cafeAndTable.split("----")[0],
        table_id: cafeAndTable.split("----")[1],
        create_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .into("customer_informations");
    res.redirect("https://siparis.arawnsoft.com");
  }
});

customerInformationsController.post(
  "/api/cafe/getCustomerInfoByIp",
  async (req, res) => {
    if (req.body.ip) {
      // let data = await knex("customer_informations")
      //   .where({ ip: req.body.ip })
      //   .orderBy("create_date", "desc")
      //   .first();
      // data.stil_valid =
      //   new Date(
      //     new Date(data.create_date).setHours(
      //       new Date(data.create_date).getHours() + 2
      //     )
      //   ) > new Date();
      let data = await getCustomerInfoByIp(req.body.ip);
      res.status(200).json({
        status: true,
        message: "Data listelendi",
        data: data,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Geçersiz istek",
        data: null,
      });
    }
  }
);

customerInformationsController.get("/api/getMyIp", async (req, res) => {
  let clientIp = requestIp.getClientIp(req);
  res.status(200).json({
    ip: clientIp,
  });
});

// export default customerInformationsController;
module.exports = customerInformationsController;
