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
app.use("/", imagesController);
app.use("/", applicationController);
// Start Server here
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
