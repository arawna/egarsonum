import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../Services/OrderService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CartVerifyedProducts({ reloadValues }) {
  let [verifyedOrders, setVerifyedOrders] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);
  const { authItem } = useSelector(({ auth }) => auth);

  const calculateTotals = (productsArr) => {
    let tempPrice = 0;
    let tempAmount = 0;
    for (let i = 0; i < productsArr.length; i++) {
      tempPrice +=
        productsArr[i].amount * parseFloat(productsArr[i].product_price);
      tempAmount += productsArr[i].amount;
    }
    setTotalPrice(tempPrice);
    setTotalAmount(tempAmount);
  };

  useEffect(() => {
    let orderService = new OrderService();
    orderService
      .getActiveOrdersByTableId(authItem[0].tableId)
      .then((result) => {
        console.log(result.data.data);
        setVerifyedOrders(result.data.data);
        calculateTotals(result.data.data);
      });
  }, [authItem, reloadValues]);

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "white", fontSize: "20px", fontWeight: "800" }}>
        Onaylanan Ürünler
      </p>
      <Accordion
        expanded
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
          borderTopLeftRadius: "13px",
          borderTopRightRadius: "13px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            backgroundColor: "#203239",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Typography style={{ fontWeight: "600", color: "white" }}>
            Onaylanmış Ürünler
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: "#EEEDDE",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          {verifyedOrders.length === 0 && (
            <b style={{ margin: "0px" }}>Hiç onaylanmış ürün yok!</b>
          )}
          {verifyedOrders.map((product) => (
            <Grid
              container
              key={product.id}
              style={{
                borderBottom: "1px solid #000",
                paddingBottom: "5px",
                paddingTop: "5px",
              }}
            >
              <Grid item xs={4} style={{ borderRight: "1px solid #000" }}>
                <p
                  style={{
                    margin: "0px",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  {product.product_name}
                </p>
                <p style={{ margin: "0px", fontSize: "15px" }}>
                  <b>x{product.amount}</b> Adet
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ textAlign: "center", borderRight: "1px solid #000" }}
              >
                <p style={{ margin: "0px" }}>x{product.product_price} ₺</p>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <p style={{ margin: "0px" }}>Toplam</p>
                <p style={{ margin: "0px" }}>
                  {product.amount * parseFloat(product.product_price)} ₺
                </p>
              </Grid>
            </Grid>
          ))}
        </AccordionDetails>
      </Accordion>
      <div
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
          backgroundColor: "#203239",
          padding: "6px",
          borderRadius: "7px",
          textAlign: "center",
        }}
      >
        <p style={{ fontWeight: "500", color: "white" }}>
          Onaylanan Toplam <b style={{ color: "#F0A500" }}>{totalAmount}</b>{" "}
          Adet Ürün
        </p>
        <p style={{ fontWeight: "500", color: "white" }}>
          Onaylanan Toplam Tutar ={" "}
          <b style={{ color: "#F0A500" }}>{totalPrice}</b> ₺
        </p>
      </div>
    </div>
  );
}
