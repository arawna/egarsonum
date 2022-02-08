import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import "./Navi.css";

export default function Navi() {
  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <QrCode2Icon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Lobster" }}
          >
            Qrgarsonum
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
