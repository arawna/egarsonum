const mysql2 = require("mysql2");
const dbcon = () => {
  let con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1220fb1220",
    database: "egarsonum",
  });
  return con;
};
module.exports = dbcon;
