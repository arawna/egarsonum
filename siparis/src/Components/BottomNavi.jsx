import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function BottomNavi() {
  return (
    <div>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "black",
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
            label="Ana Sayfa"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="Sepet"
            icon={<ShoppingCartIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
