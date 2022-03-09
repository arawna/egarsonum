const express = require("express");
const categoriesDb = require("../db/categoriesDb");
const imagesDb = require("../db/imagesDb");
const tokenService = require("../core/tokkenService");
const productsDb = require("../db/productsDb");

const productsController = express.Router();

productsController.post("/api/products/getByCafeId", async (req, res) => {
  if (req.body.cafeId) {
    res.status(200).json({
      status: true,
      message: "Ürünler listelendi",
      data: await productsDb.getProductsByCafeId(req.body.cafeId),
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

productsController.post("/api/products/getByCategoryId", async (req, res) => {
  if (req.body.categoryId) {
    res.status(200).json({
      status: true,
      message: "Ürünler listelendi",
      data: await productsDb.getProductsByCategoryId(req.body.categoryId),
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

productsController.post("/api/products/addProduct", async (req, res) => {
  if (
    req.body.token &&
    req.body.categoryId &&
    req.body.productName &&
    req.body.productPrice &&
    req.body.prodcuctDescription &&
    req.files.pic
  ) {
    if (tokenService.validateToken(req.body.token)) {
      imagesDb
        .addImage(req.files.pic.name, req.files.pic.data)
        .then((result) => {
          productsDb
            .addProduct(
              tokenService.getDetailToken(req.body.token).cafeId,
              req.body.categoryId,
              req.body.productName,
              req.body.productPrice,
              req.body.prodcuctDescription,
              "http://localhost:5000/api/img/" + result
            )
            .then(() => {
              res.status(200).json({
                status: true,
                message: "Ürün eklendi",
                data: null,
              });
            });
        });
    } else {
      res.status(401).json({
        status: false,
        message: "Tokenin süresi doldu",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

productsController.post("/api/products/updateProduct", async (req, res) => {
  if (
    req.body.token &&
    req.body.categoryId &&
    req.body.productName &&
    req.body.productPrice &&
    req.body.prodcuctDescription &&
    req.body.productId
  ) {
    if (tokenService.validateToken(req.body.token)) {
      if (req.files?.pic !== undefined) {
        //resim varsa yapılacaklar
        productsDb.getProductByProductId(req.body.productId).then((result) => {
          imagesDb
            .deleteImageByTextId(
              result.product_img_url.substr(result.product_img_url.length - 30)
            )
            .then(() => {
              imagesDb
                .addImage(req.files.pic.name, req.files.pic.data)
                .then((result2) => {
                  productsDb
                    .updateProduct(
                      req.body.productId,
                      req.body.categoryId,
                      req.body.productName,
                      req.body.productPrice,
                      req.body.prodcuctDescription,
                      "http://localhost:5000/api/img/" + result2
                    )
                    .then(() => {
                      res.status(200).json({
                        status: true,
                        message: "Ürün güncellendi",
                        data: null,
                      });
                    });
                });
            });
        });
      } else {
        productsDb.getProductByProductId(req.body.productId).then((result) => {
          productsDb
            .updateProduct(
              req.body.productId,
              req.body.categoryId,
              req.body.productName,
              req.body.productPrice,
              req.body.prodcuctDescription,
              result.product_img_url
            )
            .then(() => {
              res.status(200).json({
                status: true,
                message: "Kategori güncellendi",
                data: null,
              });
            });
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Token süresi doldu",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

productsController.post("/api/products/deleteProduct", async (req, res) => {
  if (req.body.token && req.body.productId) {
    if (tokenService.validateToken(req.body.token)) {
      productsDb.deleteProductByProductId(req.body.productId).then(() => {
        res.status(200).json({
          status: true,
          message: "Ürün silindi",
          data: null,
        });
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Token süresi doldu",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Kötü istek",
      data: null,
    });
  }
});

module.exports = productsController;
