import { Button, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));
function CartItemT({ ItemName, image, UnitPrice, mockImage, userImage }) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  console.log(userImage);
  return (
    <div style={{ display: "flex" }}>
      <Paper className={classes.paper}>
        <center>
          <div style={{ width: "200px", height: "400px", display: "flex" }}>
            <img
              style={{ objectFit: "contain", width: "150px", zIndex: "1" }}
              src={mockImage}
              alt=""
            />
            <img
              style={{
                objectFit: "contain",
                width: "110px",
                marginLeft: "-130px"
              }}
              src={userImage}
              alt=""
            />
          </div>
        </center>
        <center>
          <div style={{ alignItems: "center", display: "block" }}>
            <h5>{ItemName}</h5>
            <div>
              <Button
                onClick={removeFromCartHandler}
                type="text"
                variant="outlined"
                style={{ backgroundColor: "#f3f3f3", width: "100%" }}
              >
                Delete
              </Button>
            </div>
          </div>
        </center>
      </Paper>
    </div>
  );
}

export default CartItemT;
