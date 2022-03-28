const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const applicationController = require("./controller/application.controller");
const imagesController = require("./controller/images.controller");
const customerInformationsController = require("./controller/customerInformations.controller");
const cafesController = require("./controller/cafes.controller");
const tablesController = require("./controller/tables.controller");
const categoriesController = require("./controller/categories.controller");
const productsController = require("./controller/products.controller");
const orderController = require("./controller/order.controller");
const callWaiterController = require("./controller/callWaiter.controller");
const callBillController = require("./controller/callBill.controller");
const odemeDenemeController = require("./controller/odemeDeneme.controller");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["https://cafe.qrgarsonum.com", "https://siparis.qrgarsonum.com"],
    methods: ["GET", "POST"],
  },
});
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
app.use("/", categoriesController);
app.use("/", productsController);
app.use("/", orderController);
app.use("/", callWaiterController);
app.use("/", callBillController);
app.use("/", odemeDenemeController);

// app.get("/api/sockdene", (req, res) => {
//   io.to("3").emit("siparis", 0);
//   res.send("deneme");
// });

io.on("connection", (socket) => {
  console.log("Bağlandı: " + socket.id);
  socket.on("joincafeId", (cafeId) => {
    console.log(cafeId + " Ye girildi");
    socket.join(cafeId);
  });
  socket.on("siparis", (cafeId) => {
    io.to(cafeId).emit("siparis");
  });
  socket.on("garson", (values) => {
    console.log(values);
    io.to(values.cafeId).emit("garson", values.tableId);
  });
  socket.on("hesap", (values) => {
    io.to(values.cafeId).emit("hesap", values.cafeId);
  });
});

// Start Server here
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
