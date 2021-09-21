import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
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
    maxHeight: "184px",
    maxWidth: "100%",
    objectFit: "contain"
  },
  cropped: {
    position: "absolute",
    objectFit: "contain",
    zIndex: "-1",
    maxWidth: "100%",
    width: 100,
    height: 162.4
  }
}));

function CartItemResPro({
  image,
  mockImage,
  userImage,
  UnitPrice,
  ItemName,
  product
}) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const classes = useStyles();

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  function AddingCart() {
    return (
      <>
        <Grid item xs={6}>
          <Typography style={{ color: "black" }} variant="h5" gutterBottom>
            {ItemName} Case
          </Typography>
          <Typography style={{ color: "black" }} variant="h6" gutterBottom>
            Price: {UnitPrice} ETB
          </Typography>
          <Button
            onClick={removeFromCartHandler}
            type="text"
            variant="outlined"
            style={{ backgroundColor: "#f3f3f3" }}
          >
            Delete{" "}
          </Button>
        </Grid>
      </>
    );
  }
  return (
    <div>
      <img className={classes.mock} src={mockImage} alt="mock" />
      <img className={classes.cropped} src={userImage} alt="background" />
    </div>
  );
}

export default CartItemResPro;
