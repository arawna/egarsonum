import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import { cartClear } from "../Store/actions/cartActions";
import swal from "sweetalert";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import OrderService from "../Services/OrderService";

export default function Cart() {
  const { cartItem } = useSelector(({ cart }) => cart);
  const { authItem } = useSelector(({ auth }) => auth);
  let [totalAmount, setTotalAmount] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let tempAmount = 0;
    let tempPrice = 0;
    for (let i = 0; i < cartItem.length; i++) {
      tempAmount += cartItem[i].amount;
      tempPrice += parseFloat(cartItem[i].productPrice) * cartItem[i].amount;
    }
    setTotalAmount(tempAmount);
    setTotalPrice(tempPrice);
  }, [cartItem]);

  const handleClearBtnClick = () => {
    dispatch(cartClear());
  };

  const handleOrderBtnClick = () => {
    if (cartItem.length !== 0) {
      //sipariş verme kodları eklenecek
      const orderService = new OrderService();
      orderService
        .addOrder({
          cart: cartItem,
          cafeId: authItem[0].cafeId,
          tableId: authItem[0].tableId,
        })
        .then((result) => {
          console.log(result);
        });
      dispatch(cartClear());
      swal("Sipariş verildi!", {
        icon: "success",
        buttons: "Tamam",
      });
    } else {
      swal("Sepetiniz boş önce sepetinize birşeyler eklemelisiniz", {
        icon: "warning",
        buttons: "Tamam",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#2C3333" }}>
      <div style={{ height: "50px" }}></div>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "800",
            marginBottom: "0px",
            color: "white",
          }}
        >
          Sepet
        </p>
        <p style={{ marginTop: "0px", color: "white" }}>
          Onay Bekleyen Siparişler
        </p>
      </div>
      <div>
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
              Sepet
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              backgroundColor: "#EEEDDE",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            {cartItem.length === 0 && (
              <b style={{ margin: "0px" }}>Sepetiniz Boş!</b>
            )}
            {cartItem.map((product, index) => (
              <Grid
                container
                key={index}
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
                    {product.productName}
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
                  <p style={{ margin: "0px" }}>x{product.productPrice} ₺</p>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  <p style={{ margin: "0px" }}>Toplam</p>
                  <p style={{ margin: "0px" }}>
                    {product.amount * parseFloat(product.productPrice)} ₺
                  </p>
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
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
            Onay Bekleyen Toplam{" "}
            <b style={{ color: "#F0A500" }}>{totalAmount}</b> Adet Ürün
          </p>
          <p style={{ fontWeight: "500", color: "white" }}>
            Onay Bekleyen Toplam Tutar ={" "}
            <b style={{ color: "#F0A500" }}>{totalPrice}</b> ₺
          </p>
        </div>
        <div
          style={{
            width: "90%",
            backgroundColor: "#203239",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "6px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={() => handleOrderBtnClick()}
        >
          <Grid container>
            <Grid item xs={10}>
              <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
                Siparişleri Onayla
              </p>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                textAlign: "center",
                borderLeft: "1px solid #fff",
                color: "white",
              }}
            >
              <DoneAllIcon />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: "90%",
            backgroundColor: "#203239",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "6px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={() => handleClearBtnClick()}
        >
          <Grid container>
            <Grid item xs={10}>
              <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
                Sepeti Temizle
              </p>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                textAlign: "center",
                borderLeft: "1px solid #fff",
                color: "white",
              }}
            >
              <DeleteIcon />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: "90%",
            backgroundColor: "#203239",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "6px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          <Grid container>
            <Grid item xs={10}>
              <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
                Garson Çağır
              </p>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                textAlign: "center",
                borderLeft: "1px solid #fff",
                color: "white",
              }}
            >
              <AddAlertIcon />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: "90%",
            backgroundColor: "#203239",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "6px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          <Grid container>
            <Grid item xs={10}>
              <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
                Hesap İste
              </p>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                textAlign: "center",
                borderLeft: "1px solid #fff",
                color: "white",
              }}
            >
              <AccountBalanceWalletIcon />
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ height: "100px" }} />
    </div>
  );
}
