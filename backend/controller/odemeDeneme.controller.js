const express = require("express");
const kenxConnection = require("../dbconnect/knexconnection");
const knex = require("knex")(kenxConnection);
const userDb = require("../db/userDb");
const cafesDb = require("../db/CafesDb");
const randomText = require("../core/randomText");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "mail.qrgarsonum.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "iletisim@qrgarsonum.com", // generated ethereal user
    pass: "alialiFb777.", // generated ethereal password
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const odemeDenemeController = express.Router();

odemeDenemeController.post("/api/odemedeneme", async (req, res) => {
  //   await knex.insert({ cevap: JSON.stringify(req.body) }).into("odeme_deneme");
  //   let data = JSON.parse(atob(req.body.res));
  let data = req.body.res;
  let buff = new Buffer.alloc(
    Buffer.byteLength(data, "base64"),
    data,
    "base64"
  );
  let text = buff.toString("ascii");
  console.log(text);
  let jsonText = JSON.parse(text);
  let oneYearLater = new Date(
    new Date().setTime(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  let pass = randomText(10);
  await knex.insert({ cevap: text }).into("odeme_deneme");
  cafesDb
    .addCafe(
      jsonText.email,
      pass,
      jsonText.buyername,
      50,
      new Date().toISOString().slice(0, 19).replace("T", " "),
      oneYearLater,
      jsonText.productid === "11211678" ? 0 : 1
    )
    .then(() => {
      transporter
        .sendMail({
          from: "iletisim@qrgarsonum.com",
          to: jsonText.email,
          subject: "QR Garsonum Kullanıcı Bilgileri",
          text: `Email: ${jsonText.email} - Şifre: ${pass}`,
          html: `<div><p><b>Eposta:</b> ${jsonText.email}</p><p><b>Şifre:</b> ${pass}</p><p>Şifrenizi panelinizden değiştirebilirsiniz</p><p>https://cafe.qrgarsonum.com</p></div>`,
        })
        .then((result2) => {
          res.send("success");
        });
    });
});

odemeDenemeController.post("/api/maildeneme", async (req, res) => {
  await transporter.sendMail({
    from: "iletisim@qrgarsonum.com",
    to: "alihocaoglu1220@gmail.com",
    subject: "QR Garsonum Kullanıcı Bilgileri",
    text: "Hello word",
    html: `<div><p><b>Eposta:</b> alihocaoglu1220@gmail.com</p><p><b>Şifre:</b> 13579</p></div>`,
  });
  res.status(200).json({
    message: "Gönderildi",
  });
});

module.exports = odemeDenemeController;
