import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton style={{ color: "white" }} {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Categories() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ backgroundColor: "#2C3333" }}>
      <div style={{ height: "60px" }}></div>
      <Card
        sx={{
          width: "95%",
          marginLeft: "2%",
          marginRight: "2%",
          marginTop: "10px",
          border: "1px solid #141E27",
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image="https://mui.com/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardContent
          style={{
            backgroundColor: "#203239",
            color: "white",
          }}
        >
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h5">Pizzalar</Typography>
            </Grid>
            <Grid item xs={1}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          style={{ backgroundColor: "#203239", color: "white" }}
        >
          <CardContent>asdasdasdasdd</CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
