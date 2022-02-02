import express from "express";
import mysql2 from "mysql2";
import bodyParser from "body-parser";
import { userController, applicationController } from "./controller";
const app = express();
// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use all controllers(APIs) here
app.use("/", (userController, applicationController));
// Start Server here
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
