import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItemResPro from "../components/CartItemResPro";
import Subtotal from "../components/Subtotal";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  primaryBlock: {
    backgroundColor: "#f0c040",
    width: "100%"
  }
}));

function CartScreen() {
  const [userImage, setUserImage] = useState(null);
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log({ cartItems });

  useEffect(() => {
    const croppedImage = JSON.parse(
      window.localStorage.getItem("croppedImage")
    );
    setUserImage(croppedImage);
    console.log(croppedImage);
  }, []);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              <Subtotal />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          {cartItems.map((item) => (
            <CartItemResPro
              key={item.product}
              ItemName={item.ItemName}
              image={item.image}
              UnitPrice={item.UnitPrice}
              mockImage={item.mockImage}
              userImage={userImage}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CartScreen;
