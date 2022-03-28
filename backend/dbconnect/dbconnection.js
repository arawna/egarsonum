const mysql2 = require("mysql2");
const dbcon = () => {
  let con = mysql2.createConnection({
    host: "localhost",
    user: "qrgarson_ali",
    password: "alialiFb777.",
    database: "qrgarson_qrgarsonum",
  });
  return con;
};
module.exports = dbcon;
