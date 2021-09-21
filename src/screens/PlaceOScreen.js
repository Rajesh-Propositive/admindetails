import {
  Fab,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { createOrder } from "../actions/orderActions";
import OrderItemsT from "../components/OrderItemsT";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginTop: "60px"
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
    background: "#f0c14b",
    borderRadius: "2px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "bold",
    height: "40px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: "#a88734 #9c7e31 #846a29"
  },
  loader: {
    borderTop: "16px solid #3498db",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite"
  },
  fab: {
    width: "100%"
  }
}));
function PlaceOscreen() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [crpImage, setCrpImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const history = useHistory();
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

  useEffect(() => {
    const croppedImage = JSON.parse(
      window.localStorage.getItem("croppedImage")
    );
    setCrpImage(croppedImage);
  }, []);

  useEffect(() => {
    const croppedImage = JSON.parse(
      window.localStorage.getItem("croppedImage")
    );

    const fetchUpload = async () => {
      const imageSource = croppedImage;
      const blob = await fetch(imageSource).then((res) => res.blob());
      const file = new File([blob], "my_image.png", {
        type: "image/png",
        lastModified: new Date()
      });
      const formData = new FormData();
      formData.append("file", file);
      setIsLoading(true);

      const result = await Axios.post(
        "https://uploadingusers.herokuapp.com/upload/image",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      console.log("upload doone", result.data);
      setIsLoading(false);
      setName(result.data.filename);
    };
    fetchUpload();
  }, []);

  useEffect(() => {
    const myURL = `https://uploadingusers.herokuapp.com/retrive/image/single?name=${name}`;
    setUserImage(myURL);
  }, [name]);

  return (
    <Grid
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      {isLoading ? (
        <div> <center>  <CircularProgress /> </center>  </div>
      ) : (
        <>
          <Grid item xs={12} sm={4}>
            <div className={classes.card}>
              <Typography variant="h6" gutterBottom>
                Shipping
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.card}>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
            </div>
            {cart.cartItems.map((item) => (
              <OrderItemsT key={item.produt} item={item} crpImage={crpImage} />
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
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
              {/* <Fab className={classes.fab}> */}
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={!userImage}
                  className={classes.placeorderB}
                >
                  Place Order
                </button>
              {/* </Fab> */}
            </div>
            {loading && <div> <center>  <CircularProgress /> </center>  </div>}
            {error && <div>{error}</div>}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default PlaceOscreen;
