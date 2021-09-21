import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import {
  Fab,
  Grid,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import CheckOutSteps from "../components/CheckOutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { createOrder } from "../actions/orderActions";
import OrderItems from "../components/OrderItems";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  root: {
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    border: "1px #c0c0c0 solid",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    margin: "8px",
    paddingLeft: "5px"
  },

  steps: {
    paddingTop: "10px"
  },
  orderlistItems: {
    justifyContent: "space-between"
  },
  placeorderB: {
    padding: "1rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    background: "#f0c14b",
    cursor: "pointer",
    width: "100%",
    border: "0.1rem #808080 solid"
  },
  fab: {
    width: "100%"
  }
}));
function PlaceOrder() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [isLoading, setIsLoading] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);

  const [query, setQuery] = useState("");
  const { userInfo } = userSignin;
  const [userImage, setUserImage] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(location.name);
    const name = location.name;
    const myURL = `http://localhost:3000/retrive/image/single?name=${name}`;
    console.log(myURL);
    setUserImage(myURL);
  }, [location]);

  // if (!cart.paymentMethod) {
  //   history.push("/payment");
  // }
  // if (cart.cartItems.length === 0) {
  //   history.push("/");
  // }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  cart.itemsPrice = cart.cartItems.reduce(
    (amount, item) => item.UnitPrice + amount,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 99;
  cart.taxPrice = 0.15 * cart.itemsPrice;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const dispatch = useDispatch();

  console.log("hello pixel", cart.cartItems);
  console.log("hello shipping", cart.shippingAddress);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({ ...cart, orderItems: cart.cartItems, userImage: userImage })
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, history, success]);

  return (
    <div className={classes.root}>
      {userImage ? (
        <>
          <Grid container spacing={2}>
            <div className={classes.steps}>
              <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            </div>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <div className={classes.card}>
                  <Typography variant="h6" gutterBottom>
                    Shipping
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Phone: </strong> {cart.shippingAddress.phoneNumber},
                    {cart.shippingAddress.place}
                  </Typography>
                </div>
                <div className={classes.card}>
                  <Typography variant="h6" gutterBottom>
                    Payment
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Method:</strong> {cart.paymentMethod}
                    <br />
                    {/* <strong>Deposit To:</strong> {cart.Acount} */}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.card}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
              </div>
              {cart.cartItems.map((item) => (
                <OrderItems
                  key={item.product}
                  userImage={userImage}
                  item={item}
                />
              ))}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <div className={classes.card}>
                  <Typography variant="h6" gutterBottom>
                    Order Summery
                  </Typography>
                  <List>
                    <ListItem className={classes.orderlistItems}>
                      <Typography variant="subtitle2" gutterBottom>
                        Items
                      </Typography>

                      <div> ብር {cart.itemsPrice}</div>
                    </ListItem>
                    <ListItem className={classes.orderlistItems}>
                      <Typography variant="subtitle2" gutterBottom>
                        Shipping
                      </Typography>

                      <div> ብር {cart.shippingPrice}</div>
                    </ListItem>
                    <ListItem className={classes.orderlistItems}>
                      <Typography variant="subtitle2" gutterBottom>
                        Tax
                      </Typography>

                      <div> ብር {cart.taxPrice}</div>
                    </ListItem>
                    <ListItem className={classes.orderlistItems}>
                      <Typography variant="subtitle2" gutterBottom>
                        <strong> Order Total</strong>
                      </Typography>

                      <strong>ብር {cart.totalPrice}</strong>
                    </ListItem>
                  </List>
                </div>
                <div className={classes.submiting}>
                  <Fab className={classes.fab}>
                    <button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      className={classes.placeorderB}
                    >
                      Place Order
                    </button>
                  </Fab>
                </div>
              </Paper>
              {loading && <div>Loading..</div>}
              {error && <div>{error}</div>}
            </Grid>
          </Grid>
        </>
      ) : (
        <div>Loading......</div>
      )}
    </div>
  );
}

export default PlaceOrder;
