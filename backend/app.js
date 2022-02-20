const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const applicationController = require("./controller/application.controller");
const imagesController = require("./controller/images.controller");
const customerInformationsController = require("./controller/customerInformations.controller");
const cafesController = require("./controller/cafes.controller");
const tablesController = require("./controller/tables.controller");
const app = express();
app.use(cors());
// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
// use all controllers(APIs) here
app.use("/", imagesController);
app.use("/", applicationController);
app.use("/", customerInformationsController);
app.use("/", cafesController);
app.use("/", tablesController);
// Start Server here
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
