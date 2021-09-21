import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import OrderdItems from "../components/OrderdItems";
import {
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import Axios from "../axios";
// const options = {
//   // orientation: 'portrait',
//   unit: 'in',
//   format: [8,13]
// };
const useStyels = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
    // height: "100vh"
  },
  orderlistItems: {
    justifyContent: "space-between"
  },
  card: {
    border: "1px #c0c0c0 solid",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    margin: "8px",
    paddingLeft: "5px"
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

function OrderST() {
  const classes = useStyels();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const [usrImg, setUsrImg] = useState(null);
  // const { order, loading, error } = useState({})
  const [order, setOrder] = useState({});
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  console.log("done Order", order);
  // const OrderImage = order[0];
  // console.log(OrderImage)
  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await Axios.get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setOrder(data);
      const OrderImage = order.userImage;
      await fetch(OrderImage)
        .then((res) => res.blob())
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          setUsrImg(objectURL);
        });
    };
    fetchOrder();
  }, [id]);
  // useEffect(() => {
  //   dispatch(detailsOrder(id));
  //   // console.log("done Order",order.userImage);
  //   const toBlob = async () => {
  //     const OrderImage = order.userImage;
  //     await fetch(OrderImage)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         let objectURL = URL.createobjectURL(blob);
  //         setUsrImg(objectURL);
  //       });
  //   };
  //   toBlob();
  // }, [dispatch, id]);
  return (
    <Grid
      style={{ marginTop: "60px", height: "100%" }}
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      <>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Order: {order._id}
            </Typography>
            <div className={classes.card}>
              <Typography variant="h6" gutterBottom>
                Shipping
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong>
                {order.shippingAddress.phoneNumber},{" "}
                {order.shippingAddress.place}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>
                  Delivery will take 10 working days After Payment is Comfirmd
                </strong>{" "}
                <br />
                <strong>ትእዛዞ የሚደርሰው ክፍያው ከተፈፀመ በኃላ ባሉት 10 የስራ ቀናት ነው!!</strong>
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
                <strong>Method:</strong> {order.paymentMethod} <br />
                <strong>ክፍያውን በሁለት ቀናት መፈፀም አለበት:</strong> <br />
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
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            {order.orderItems.map((item) => (
              <OrderdItems key={item.product} item={item} userImage={usrImg} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
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
            {/* <Pdf targetRef={ref} filename={`medaf_order${order._id}`}
                 >
                  {({ toPdf }) => (
                    <button className={classes.printable} onClick={toPdf}>
                      Print Your Order
                    </button>
                  )}
                </Pdf> */}
          </Paper>
        </Grid>
      </>
    </Grid>
  );
}

export default OrderST;
