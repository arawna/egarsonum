const mysql = require("mysql");
const dbcon = () => {
  let con = mysql.createConnection({
    host: "localhost",
    user: "arawnsoft_qr",
    password: "alialiFb777.",
    database: "arawnsoft_qrgarsonum",
  });
  return con;
};
module.exports = dbcon;
