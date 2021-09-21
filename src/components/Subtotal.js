import React from "react";

import CurrencyFormat from "react-currency-format";


import { getBasketTotal } from "../reducers/cartReducers";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  checkout: {
    background: "#f0c14b",
    borderRadius: "2px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "bold",
    height: "40px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: "#a88734 #9c7e31 #846a29"
  }
}));

function Subtotal() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();
  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };
  return (
    <div>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({cartItems.length} items): <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(cartItems)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Birr"}
      />
      <button
        disabled={cartItems.length === 0}
        className={classes.checkout}
        onClick={checkoutHandler}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
export default Subtotal;
