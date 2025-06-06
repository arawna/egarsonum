const express = require("express");
const nodemailer = require("nodemailer");
const dbcon = require("../dbconnect/dbconnection");
let requestIp = require("request-ip");
const userDb = require("../db/userDb");
const cafesDb = require("../db/CafesDb");
const imagesDb = require("../db/imagesDb");
const applicationController = express.Router();
let con;
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arawnapubg01@gmail.com",
    pass: "alialiFb777",
  },
});

applicationController.get("/api/application/getAll", (req, res) => {
  con = dbcon();
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM arawnsoft_qrgarsonum.application;", function (err, result) {
      if (err) throw err;
      res.status(200).json({
        status: true,
        message: "Data Listelendi",
        data: result,
      });
    });
    con.end();
  });
});

applicationController.post("/api/application/add", (req, res) => {
  if (req.body.companyName === undefined || req.body.companyName === "") {
    res.status(400).json({
      status: false,
      message: "Kafe Adı boş bırakılamaz",
      data: null,
    });
  } else if (req.body.name === undefined || req.body.name === "") {
    res.status(400).json({
      status: false,
      message: "Ad boş bırakılamaz",
      data: null,
    });
  } else if (req.body.phone === undefined || req.body.phone === "") {
    res.status(400).json({
      status: false,
      message: "Telefon numarası bırakılamaz",
      data: null,
    });
  } else if (req.body.email === undefined || req.body.email === "") {
    res.status(400).json({
      status: false,
      message: "Email boş bırakılamaz",
      data: null,
    });
  } else {
    let mailOptions = {
      from: "arawnapubg01@gmail.com",
      to: "alihocaoglu1220@gmail.com",
      subject: "Qrgarsonum Başvuru",
      text: `Sirket adı: ${req.body.companyName} -- Ad: ${req.body.name} -- Telefon: ${req.body.phone} -- Email: ${req.body.email} -- Not: ${req.body.note}`,
    };
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    con = dbcon();
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO `arawnsoft_qrgarsonum`.`application`(`company_name`,`name`,`phone`,`email`,`note`) VALUES(" +
          '"' +
          req.body.companyName +
          '"' +
          "," +
          '"' +
          req.body.name +
          '"' +
          "," +
          '"' +
          req.body.phone +
          '"' +
          "," +
          '"' +
          req.body.email +
          '"' +
          "," +
          '"' +
          req.body.note +
          '"' +
          ");",
        function (err, result) {
          if (err) throw err;
          res.status(200).json({
            status: true,
            message: "Başvuru Gönderildi",
            data: null,
          });
        }
      );
      con.end();
    });
  }
});
applicationController.get("/api/deneme/:textId", (req, res) => {
  // const { name, data } = req.files.pic;
  // if (name && data) {
  //   imagesDb.addImage(name, data).then((response) => {
  //     res.status(200).json({
  //       textId: response,
  //     });
  //   });
  // } else {
  //   res.status(400);
  // }
  imagesDb.getImageByTextId(req.params["textId"]).then((response) => {
    if (response) {
      res.end(response);
    } else {
      res.end("Böyle bir resim yok");
    }
  });
  // cafesDb
  //   .addCafe(
  //     req.body.email,
  //     req.body.pass,
  //     req.body.cafeName,
  //     req.body.tableAmount,
  //     req.body.createDate,
  //     req.body.lastDate
  //   )
  //   .then(() => {
  //     res.status(200).json({
  //       durum: "Eklendi",
  //     });
  //   });
  // cafesDb.getAllCafes().then((response) => {
  //   res.status(200).json(response);
  // });
});
// export default applicationController;
module.exports = applicationController;
