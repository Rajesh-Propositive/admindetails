import {
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import OrderdItems from "../components/OrderdItems";
import Pdf from "react-to-pdf";
const ref = React.createRef();
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
  printable: {
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
function OrderScreenN() {
  const classes = useStyles();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  console.log(order);
  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [dispatch, id]);
  return (
    <Grid
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      {loading ? (
        <div>Loading..... </div>
      ) : error ? (
        <div> {error}</div>
      ) : (
        <>
          <div ref={ref}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Order: {order._id}
              </Typography>
              <div className={classes.card}>
                <Typography variant="h6" gutterBottom>
                  Shipping
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Phone: </strong> {order.shippingAddress.phoneNumber},
                  {order.shippingAddress.place}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>
                    Delivery will take 10 working days After Payment is Comfirmd
                  </strong>{" "}
                  <br />
                  <strong>
                    ትእዛዞ የሚደርሰው ክፍያው ከተፈፀመ በኃላ ባሉት 10 የስራ ቀናት ነው!!
                  </strong>
                </Typography>
                {order.isDelivered ? (
                  <div>Delivered at {order.deliveredAt}</div>
                ) : (
                  <div>Not Delivered</div>
                )}
              </div>
              <div className={classes.card}>
                <Typography variant="h6" gutterBottom>
                  Payment
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Method:</strong> {order.paymentMethod}
                  <br />
                  {order.paymentMethod === "YenePay" ? (
                    <strong>YenePay</strong>
                  ) : "CBE Birr" ? (
                    <strong>CBE Birr</strong>
                  ) : "Amole" ? (
                    <strong>Amole</strong>
                  ) : "Awash Bank" ? (
                    <strong>Awash Bank</strong>
                  ) : (
                    "HelloCash"(<strong>Hello Cash</strong>)
                  )}
                </Typography>
                {order.isPaid ? (
                  <div>Paid at {order.paidAt}</div>
                ) : (
                  <div>Not Paid</div>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.card}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
              </div>
              {order.orderItems.map((item) => (
                <OrderdItems
                  key={item.product}
                  item={item}
                  userImage={order.userImage}
                />
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

                    <div> ብር {order.itemsPrice}</div>
                  </ListItem>
                  <ListItem className={classes.orderlistItems}>
                    <Typography variant="subtitle2" gutterBottom>
                      Shipping
                    </Typography>

                    <div> ብር {order.shippingPrice}</div>
                  </ListItem>
                  <ListItem className={classes.orderlistItems}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tax
                    </Typography>

                    <div> ብር {order.taxPrice}</div>
                  </ListItem>
                  <ListItem className={classes.orderlistItems}>
                    <Typography variant="subtitle2" gutterBottom>
                      <strong> Order Total</strong>
                    </Typography>

                    <strong>ብር {order.totalPrice}</strong>
                  </ListItem>
                </List>
              </div>
              <Pdf targetRef={ref} filename={`medaf_order${order._id}`}>
                {({ toPdf }) => (
                  <button className={classes.printable} onClick={toPdf}>
                    Print Your Order
                  </button>
                )}
              </Pdf>
            </Grid>
          </div>
        </>
      )}
    </Grid>
  );
}

export default OrderScreenN;
