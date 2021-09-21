import { makeStyles, Grid, Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    margin: "10px 10px 10px 10px",
    width: "143px",
    float: "left",
    height: "215px",
    position: "relative",
    textAlign: "center",
    justifyContent: "center"
  },
  p: {
    whiteSpace: "nowrap",
    width: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#0f1111",
    fontSize: "16px !important",
    textDecoration: "none !important",
    fontWeight: "400 !important"
  },
  pImage: {
    objectFit: "contain",
    background: "#fff",
    clear: "both",
    margin: "0 auto",
    paddingTop: "7px",
    paddingBottom: "7px",
    width: "100px"
  },
  modelname: {
    // position: "absolute",
    top: "46%",
    left: 0,
    padding: "0 15px",
    fontWeight: "700",
    fontSize: "14px",
    width: "100%"
    // "&:hover": {

    // }
  },
  modelStorong: {
    clear: "both",
    display: "block",
    font: "700 14px Arimo,Arial,sans-serif",
    margin: "0 auto",
    padding: "28px 5px",
    justifyContent: "center",
    background: "hsla(0,0%,96%,.4)",
    textDecoration: "none",
    color: "#777",
    position: "absolute",
    bottom: "12px",
    width: "140px",
    "&:hover": {
      background: "#e40017",
      color: "white"
    }
  }
}));

function Product({ id, modelName, image }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} md={2}>
      <center>
        <Paper className={classes.paper}>
          <Link
            style={{ hover: "#E67A00" }}
            to={`/upload/${id}`}
            className={classes.p}
          >
            <img className={classes.pImage} src={image} alt="modelName" />
          </Link>
          <div>
            <Link
              style={{ hover: "#E67A00" }}
              to={`/upload/${id}`}
              className={classes.p}
            >
              <strong className={classes.modelStorong}>
                <span className={classes.modelname}> {modelName} </span>
              </strong>
            </Link>
          </div>
        </Paper>
      </center>
    </Grid>
  );
}

export default Product;
