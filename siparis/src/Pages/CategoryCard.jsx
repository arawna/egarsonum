import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Products from "./Products";

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

export default function CategoryCard({ category }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card
        sx={{
          width: "95%",
          marginLeft: "2%",
          marginRight: "2%",
          marginTop: "10px",
          border: "1px solid #141E27",
          borderRadius: "10px",
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={category.img_url}
          alt={category.name}
          onClick={handleExpandClick}
        />
        <CardContent
          style={{
            backgroundColor: "#203239",
            color: "white",
          }}
        >
          <Grid container>
            <Grid item xs={11}>
              <div onClick={handleExpandClick}>
                <Typography variant="h5">{category.name}</Typography>
              </div>
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
          <CardContent>
            <Products categoryId={category.id} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
