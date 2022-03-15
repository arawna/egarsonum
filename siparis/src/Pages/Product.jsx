import { Box, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartAddModal from "./CartAddModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "50px",
};

export default function Product({ product }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [selectedProduct, setSelectedProduct] = useState({});
  const handleAddCartBtn = (product) => {
    setSelectedProduct(product);
    handleOpen();
  };

  const { authItem } = useSelector(({ auth }) => auth);

  return (
    <>
      <div style={{ border: "3px solid #141E27", borderRadius: "50px" }}>
        <div
          style={{
            height: "200px",
            backgroundImage: `url("${product.product_img_url}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
          }}
        />
        <hr
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            color: "#141E27",
            borderColor: "#141E27",
            borderTopWidth: "3px",
          }}
        />
        <div
          style={{
            backgroundColor: "#EEEDDE",
            marginTop: "0px",
            paddingBottom: "5px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              marginTop: "0px",
              fontWeight: "600",
              color: "black",
              marginBottom: "0px",
            }}
          >
            {product.category_name}
          </p>
          <p style={{ textAlign: "center", color: "black", fontWeight: "500" }}>
            {product.product_name}
          </p>
          <p
            style={{ textAlign: "center", color: "black", marginBottom: "0px" }}
          >
            {product.product_description}
          </p>
        </div>
        <hr
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            color: "#141E27",
            borderColor: "#141E27",
            borderTopWidth: "3px",
          }}
        />
        <div
          style={{
            height: "70px",
            backgroundColor: "#E0DDAA",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={authItem[0].order === 0 ? 12 : 6}
              style={{
                borderRight: "3px solid #141E27",
                height: "70px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  textAlign: "center",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                <p>{product.product_price} ₺</p>
                <p>Fiyat</p>
              </div>
            </Grid>
            {authItem[0].order === 1 && (
              <Grid
                item
                xs={6}
                style={{
                  height: "70px",
                  textAlign: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    textAlign: "center",
                    color: "black",
                    fontWeight: "500",
                  }}
                  onClick={() => handleAddCartBtn(product)}
                >
                  Sepete Ekle
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CartAddModal
            selectedProduct={selectedProduct}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
}
