import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from "../constants/orderConstants";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    width: "300px",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    border: "1px solid lightgray",
    padding: "20px"
  },
  inputContainer: {
    height: "30px",
    marginBottom: "10px",
    backgroundColor: "white",
    width: "98%"
  },
  login: {
    backgroundColor: "white",
    height: "100%",
    marginTop: "60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  signInButton: {
    fontWeight: "bold",
    background: "#f0c14b",
    borderRadius: "2px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: " #a88734 #9c7e31 #846a29"
  }
}));

function OrderEditScreen() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [isDelivered, setIsDelivered] = useState("");
  const [isPaid, setIsPaid] = useState("");

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!order || successPay || successDeliver || (order && order._id !== id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(id));
    } else {
      setIsPaid(order.isPaid);
      setIsDelivered(order.isDelivered);
    }
  }, [dispatch, id, successDeliver, successPay, order]);
  const successPayHandler = (e) => {
    e.preventDefault();
    dispatch(
      payOrder({
        _id: id,
        isPaid
      })
    );
  };
  const successDeliverHandler = (e) => {
    e.preventDefault();
    dispatch(
      deliverOrder({
        _id: id,

        isDelivered
      })
    );
  };
  return (
    <div className={classes.login}>
      <div className={classes.loginContainer}>
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div>
              <Typography className={classes.heading}>
                Edit Order {id}
              </Typography>
            </div>
            {order.isPaid ? (
              <h2>
                Paid{""} <Moment>{order.paidAt}</Moment>
              </h2>
            ) : (
              <h3>Not Paid</h3>
            )}
            <form onSubmit={successPayHandler}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  className={classes.inputContainer}
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={isPaid}
                  onChange={(e) => setIsPaid(e.target.value)}
                ></input>
              </div>
              <div>
                <label></label>
                <button className={classes.signInButton} type="submit">
                  Update
                </button>
              </div>
            </form>
          </>
        )}
        {!order.isDelivered && (
          <div>
            {loadingDeliver && <div>Loading....</div>}
            {errorDeliver && <div>{errorDeliver}</div>}
          </div>
        )}
        <form onSubmit={successDeliverHandler}>
          <div>
            <label htmlFor="name">Delivery</label>
            <input
              className={classes.inputContainer}
              id="name"
              type="text"
              placeholder="Enter name"
              value={isDelivered}
              onChange={(e) => setIsDelivered(e.target.value)}
            ></input>
          </div>
          <div>
            <label></label>
            <button className={classes.signInButton} type="submit">
              Update Delivery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderEditScreen;
