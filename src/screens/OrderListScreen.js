import { makeStyles, Typography, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteOrder, listOrders } from "../actions/orderActions";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Moment from "react-moment";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
    // marginTop: "60px"
  }
}));

function OrderListScreen(props) {
  const classes = useStyles();
  const history = useHistory();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = orderDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <Grid
      style={{ width: "100%" }}
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      <Paper
        style={{ alignSelf: "flex-start", marginTop: "50px" }}
        className={classes.paper}
      >
        <Typography variant="h6" gutterBottom>
          Orders
        </Typography>
      </Paper>
      {loadingDelete && <div>Loading...</div>}
      {errorDelete && <div>{errorDelete} </div>}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>USER</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <Moment>{order.createdAt}</Moment>
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    {order.isPaid ? <Moment>{order.paidAt}</Moment> : "No"}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered ? (
                      <Moment>{order.deliveredAt}</Moment>
                    ) : (
                      "No"
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        history.push(`/order/${order._id}/edit`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              </TableBody>
          </Table>
        </Paper>
      )}
    </Grid>
  );
}

export default OrderListScreen;
