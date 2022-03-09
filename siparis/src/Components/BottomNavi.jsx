import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

export default function BottomNavi() {
  const navigate = useNavigate();
  const { cartItem } = useSelector(({ cart }) => cart);

  return (
    <div>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "black",
          zIndex: "99",
        }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ backgroundColor: "black", color: "white" }}
          showLabels
          //   value={value}
          //   onChange={(event, newValue) => {
          //     setValue(newValue);
          //   }}
        >
          <BottomNavigationAction
            sx={{ color: "white" }}
            onClick={() => navigate("/")}
            label="Ana Sayfa"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="Sepet"
            onClick={() => navigate("/sepet")}
            icon={
              <Badge badgeContent={cartItem.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            }
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
