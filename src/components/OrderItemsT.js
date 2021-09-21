import { Button, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

function OrderItemsT({ item, crpImage }) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  return (
    <div>
      <Paper className={classes.paper}>
        <center>
          <div style={{ width: "100px", height: "200px", display: "flex" }}>
            <img
              style={{ objectFit: "contain", width: "150px", zIndex: "1" }}
              src={item.mockImage}
              alt=""
            />
            <img
              style={{
                objectFit: "contain",
                width: "110px",
                marginLeft: "-130px"
              }}
              src={crpImage}
              alt=""
            />
          </div>
        </center>
      </Paper>
    </div>
  );
}

export default OrderItemsT;
