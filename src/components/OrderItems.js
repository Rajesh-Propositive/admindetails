import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    display: "flex",
    color: theme.palette.text.secondary,
    justifyContent: "space-evenly",
    marginBottom: theme.spacing(2)
  },
  naming: {
    fontSize: "16px",
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#f0c040"
    }
  },
  title: {
    textRendering: "optimizeLegibility",
    fontSize: "18px !important",
    lineHeight: "24px !important",
    fontWeight: "700 !important",
    boxSizing: "border-box",
    color: "#0066c0"
  },
  images: {
    width: "150px",
    objectFit: "contain",
    height: "150px"
  },
  checkoutProduct: {
    display: "flex"
  },
  price: {
    color: "#B12704",
    fontSize: "18px !important",
    boxSizing: "border-box",
    textAlign: "left"
  },
  pricing: {
    paddingBottom: theme.spacing(3)
  },
  mock: {
    position: "absolute",
    maxHeight: "138px",
    maxWidth: "100%",
    objectFit: "contain"
  },
  cropped: {
    position: "absolute",
    objectFit: "contain",
    zIndex: "-1",
    maxWidth: "100%",
    width: 75,
    height: 121.8
  },
  rootn: {
    padding: theme.spacing(1)
    // display: "flex"
  },
  typo: {
    color: "black"
  },
  card: {
    border: "1px #c0c0c0 solid",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    margin: "8px",
    paddingLeft: "5px"
  },
  container: {
    position: "relative",
    marginBottom: "140px",
    marginRight: "100px"
  }
}));

function OrderItems({ item, userImage }) {
  const classes = useStyles();

  return (
    <div className={classes.rootn}>
      <div className={classes.card}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Name:</strong>
          {item.ItemName} <br />
        </Typography>
        <Typography className={classes.typo} variant="subtitle1" gutterBottom>
          {item.Quantity} x ብር {item.UnitPrice} = ብር{" "}
          <strong> {item.Quantity * item.UnitPrice}</strong>
        </Typography>
      </div>
      <div className={classes.container}>
        <img className={classes.mock} src={item.mockImage} alt="mock" />
        <img className={classes.cropped} src={userImage} alt="" />
      </div>
    </div>
  );
}

export default OrderItems;
