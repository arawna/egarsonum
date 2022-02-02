import express from "express";
import mysql2 from "mysql2";
import dbcon from "../dbconnect/dbconnection";
const applicationController = express.Router();
let con;

applicationController.get("/api/application/getAll", (req, res) => {
  con = dbcon();
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM egarsonum.application;", function (err, result) {
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
    con = dbcon();
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO `egarsonum`.`application`(`company_name`,`name`,`phone`,`email`,`note`) VALUES(" +
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
export default applicationController;
