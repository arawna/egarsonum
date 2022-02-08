import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { applicationController } from "./controller";
import imagesController from "./controller/images.controller";
const fileUpload = require("express-fileupload");
const app = express();
app.use(cors());
// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
// use all controllers(APIs) here
app.use("/", (applicationController, imagesController));
// Start Server here
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
