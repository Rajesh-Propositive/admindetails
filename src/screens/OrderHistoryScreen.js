import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Moment from "react-moment";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    // marginTop: "60px"
  }
}));

function OrderHistoryScreen() {
  const classes = useStyles();
  const history = useHistory()
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <Grid
      style={{ width: "100%" }}
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Paper className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
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
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Grid>
  );
}

export default OrderHistoryScreen;
