import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import { cartAdd } from "../Store/actions/cartActions";
import { NotificationManager } from "react-notifications";

export default function CartAddModal({ selectedProduct, handleClose }) {
  let [amount, setAmount] = useState(1);

  const addAmount = () => {
    setAmount(amount + 1);
  };
  const indeterminAmount = () => {
    if (amount !== 1) {
      setAmount(amount - 1);
    }
  };

  const dispatch = useDispatch();

  const handleAddBtnClick = () => {
    dispatch(
      cartAdd({
        productId: selectedProduct.product_id,
        productName: selectedProduct.product_name,
        productPrice: selectedProduct.product_price,
        amount: amount,
      })
    );
    NotificationManager.success("Ürün Sepete Eklendi", "Eklendi", 3000);
    handleClose();
  };

  return (
    <div style={{ backgroundColor: "#EEEDDE", borderRadius: "50px" }}>
      <Grid
        container
        style={{
          backgroundColor: "#969574",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
        }}
      >
        <Grid item xs={10}>
          <p
            style={{ marginTop: "20px", marginLeft: "17px", fontWeight: "600" }}
          >
            {selectedProduct.product_name}
          </p>
        </Grid>
        <Grid item xs={2}>
          <div
            style={{
              marginTop: "20px",
              marginRight: "17px",
              fontWeight: "700",
            }}
          >
            <span
              style={{
                backgroundColor: "gray",
                paddingTop: "5px",
                paddingBottom: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => handleClose()}
            >
              X
            </span>
          </div>
        </Grid>
      </Grid>
      <hr
        style={{ borderTopWidth: "3px", borderColor: "#000", marginTop: "0px" }}
      />
      <div
        style={{
          height: "200px",
          backgroundImage: `url("${selectedProduct.product_img_url}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          margin: "15px",
          borderRadius: "7px",
        }}
      ></div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "600" }}>{selectedProduct.product_name}</p>
        <p style={{ fontSize: "20px", fontWeight: "600" }}>
          {amount * parseFloat(selectedProduct.product_price)} ₺
        </p>
        <Grid container>
          <Grid item xs={4} style={{ position: "relative" }}>
            <div onClick={() => indeterminAmount()}>
              <IndeterminateCheckBoxIcon
                style={{
                  color: "red",
                  fontSize: "30px",
                  position: "absolute",
                  top: "50%",
                  left: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-read-only-input"
              style={{ textAlign: "center" }}
              value={amount.toString()}
              InputProps={{
                readOnly: true,
              }}
              onChange={() => console.log("")}
            />
          </Grid>
          <Grid item xs={4} style={{ position: "relative" }}>
            <div onClick={() => addAmount()}>
              <AddBoxIcon
                style={{
                  color: "green",
                  fontSize: "30px",
                  position: "absolute",
                  top: "50%",
                  right: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {selectedProduct.product_description}
      </div>
      <div style={{ padding: "10px" }}>
        <TextField
          id="outlined-multiline-static"
          label="Not"
          multiline
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#969574" }}
          onClick={() => handleAddBtnClick()}
        >
          Sepete Ekle
        </Button>
      </div>
    </div>
  );
}
