const express = require("express");
const categoriesDb = require("../db/categoriesDb");
const imagesDb = require("../db/imagesDb");
const tokenService = require("../core/tokkenService");

const categoriesController = express.Router();

categoriesController.post("/api/categories/add", async (req, res) => {
  if (req.body.token && req.body.name && req.files.pic) {
    if (tokenService.validateToken(req.body.token)) {
      imagesDb
        .addImage(req.files.pic.name, req.files.pic.data)
        .then((result) => {
          categoriesDb
            .addCategory(
              tokenService.getDetailToken(req.body.token).cafeId,
              req.body.name,
              "http://localhost:5000/api/img/" + result
            )
            .then((result2) => {
              res.status(200).json({
                status: true,
                message: "Kategori eklendi",
                data: null,
              });
            });
        });
    } else {
      res.status(404).json({
        status: false,
        message: "Son ödeme tarihi geçti",
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

categoriesController.get(
  "/api/categories/getByCafeId/:cafeId",
  async (req, res) => {
    categoriesDb.getCategoriesByCafeId(req.params.cafeId).then((result) => {
      res.status(200).json({
        status: true,
        message: "Data listelendi",
        data: result,
      });
    });
  }
);

categoriesController.post("/api/categories/delete", async (req, res) => {
  if (req.body.token && req.body.categoryId) {
    if (tokenService.validateToken(req.body.token)) {
      categoriesDb
        .getCategoryByCategoryId(req.body.categoryId)
        .then((result) => {
          imagesDb
            .deleteImageByTextId(
              result.img_url.substr(result.img_url.length - 30)
            )
            .then((result2) => {
              categoriesDb
                .deleteCategoryByCafeIdAndCategoryId(
                  req.body.categoryId,
                  result.cafe_id
                )
                .then((result3) => {
                  res.status(200).json({
                    status: true,
                    message: "Kategori silindi",
                    data: null,
                  });
                });
            });
        });
    } else {
      res.status(404).json({
        status: false,
        message: "Son ödeme tarihi geçti",
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

categoriesController.post("/api/categories/update", async (req, res) => {
  if (req.body.name && req.body.token && req.body.categoryId) {
    if (tokenService.validateToken(req.body.token)) {
      if (req.files) {
        categoriesDb
          .getCategoryByCategoryId(req.body.categoryId)
          .then((result) => {
            imagesDb
              .deleteImageByTextId(
                result.img_url.substr(result.img_url.length - 30)
              )
              .then(() => {
                imagesDb
                  .addImage(req.files.pic.name, req.files.pic.data)
                  .then((result2) => {
                    categoriesDb
                      .updateCategory(
                        req.body.categoryId,
                        req.body.name,
                        "http://localhost:5000/api/img/" + result2
                      )
                      .then(() => {
                        res.status(200).json({
                          status: true,
                          message: "Kategori güncellendi",
                          data: null,
                        });
                      });
                  });
              });
          });
      } else {
        //resim yoksa kodları yazılacak
        categoriesDb
          .getCategoryByCategoryId(req.body.categoryId)
          .then((result) => {
            categoriesDb
              .updateCategory(
                req.body.categoryId,
                req.body.name,
                result.img_url
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
        message: "Token süresi geçti",
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

  // if (req.body.token && req.body.categoryId && req.body.name && req.files.pic) {
  //   if (tokenService.validateToken(req.body.token)) {
  //     categoriesDb
  //       .getCategoryByCategoryId(req.body.categoryId)
  //       .then((result) => {
  //         imagesDb
  //           .deleteImageByTextId(
  //             result.img_url.substr(result.img_url.length - 30)
  //           )
  //           .then((resul2) => {
  //             imagesDb
  //               .addImage(req.files.pic.name, req.files.pic.data)
  //               .then((result3) => {
  //                 categoriesDb
  //                   .updateCategory(
  //                     req.body.categoryId,
  //                     req.body.name,
  //                     "https://qrgarsonum.com/api/img/" + result3
  //                   )
  //                   .then((resul4) => {
  //                     res.status(200).json({
  //                       status: true,
  //                       message: "Kategori güncellendi",
  //                       data: null,
  //                     });
  //                   });
  //               });
  //           });
  //       });
  //   } else {
  //     res.status(404).json({
  //       status: false,
  //       message: "Son ödeme tarihi geçti",
  //       data: null,
  //     });
  //   }
  // } else {
  //   res.status(400).json({
  //     status: false,
  //     message: "Kötü istek",
  //     data: null,
  //   });
  // }
});

module.exports = categoriesController;
