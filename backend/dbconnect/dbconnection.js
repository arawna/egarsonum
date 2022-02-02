import mysql2 from "mysql2";
const dbcon = () => {
  let con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1220fb1220",
  });
  return con;
};
export default dbcon;
