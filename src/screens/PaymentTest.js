import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import Axios from "axios";
import { savePaymentMethod } from "../actions/cartActions";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "#FFFFFF"
  },
  steps: {
    paddingTop: "10px"
  },
  loginlogo: {
    marginTop: "20px",
    marginBottom: "20px",
    objectFit: "contain",
    width: "100px",
    marginRight: "auto",
    marginLeft: "auto"
  },
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
    fontSize: "20px",
    marginBottom: "10px",
    backgroundColor: "white",
    width: "98%"
  },
  login: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold"
  },
  signInButton: {
    background: "#f0c14b",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "2px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: " #a88734 #9c7e31 #846a29"
  },
  agreement: {
    marginTop: "15px",
    fontSize: "12px"
  },
  summary: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  paymentLogo: {
    objectFit: "contain",
    width: "100px",
    maxHeight: "60px",
    borderRadius: "15px",
    display: ""
  },
  paymentInput: {
    display: "flex",
    padding: "5px",
    justifyContent: "center"
  },
  radio: {
    padding: "10px"
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  }
}));

function PaymentTest() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState("YenePay");
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push({
      pathname: "/placeorder",
      name
    });
  };
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
  return (
    <div className={classes.login}>
      {name ? (
        <>
          <AppBar className={classes.appbar} position="static">
            <Toolbar>
              <Link to="/">
                <img
                  className={classes.loginlogo}
                  src="https://i.imgur.com/r9gZrUe.jpg"
                  alt=""
                />
              </Link>
            </Toolbar>
          </AppBar>
          <div className={classes.steps}>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
          </div>
          <div className={classes.loginContainer}>
            <form onSubmit={submitHandler}>
              <Typography className={classes.heading}>
                Payment Method{" "}
              </Typography>
              <div className={classes.paymentInput}>
                <div className={classes.radio}>
                  <input
                    type="radio"
                    id="yenepay"
                    value="YenePay"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="yenePay">
                    <img
                      className={classes.paymentLogo}
                      src="https://i.imgur.com/LBuoC65.png"
                      alt=""
                    />
                  </label>
                </div>
              </div>
              <div className={classes.paymentInput}>
                <div className={classes.radio}>
                  <input
                    type="radio"
                    id="Amole"
                    value="Amole"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="Amole">
                    <img
                      className={classes.paymentLogo}
                      src="https://i.imgur.com/Y4JrHzk.jpg"
                      alt=""
                    />
                  </label>
                </div>
              </div>
              <div className={classes.paymentInput}>
                <div className={classes.radio}>
                  <input
                    type="radio"
                    id="CBE Birr"
                    value="CBE Birr"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="CBE Birr">
                    <img
                      className={classes.paymentLogo}
                      src="https://i.imgur.com/c6YmOKg.png"
                      alt=""
                    />
                  </label>
                </div>
              </div>
              <div className={classes.paymentInput}>
                <div className={classes.radio}>
                  <input
                    type="radio"
                    id="Awash Bank"
                    value="Awash Bank"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="Awash Bank">
                    <img
                      className={classes.paymentLogo}
                      src="https://i.imgur.com/B3gTolM.png"
                      alt=""
                    />
                  </label>
                </div>
              </div>
              <div className={classes.paymentInput}>
                <div className={classes.radio}>
                  <input
                    type="radio"
                    id="HelloCash"
                    value="HelloCash"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="HelloCash">
                    <img
                      className={classes.paymentLogo}
                      src="https://i.imgur.com/tYQXEW1.png"
                      alt=""
                    />
                  </label>
                </div>
              </div>
              <button type="submit" className={classes.signInButton}>
                Continue
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <AppBar className={classes.appbar} position="static">
            <Toolbar>
              <Link to="/">
                <img
                  className={classes.loginlogo}
                  src="https://i.imgur.com/r9gZrUe.jpg"
                  alt=""
                />
              </Link>
            </Toolbar>
          </AppBar>
          <div className={classes.steps}>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
          </div>
          <div> Loading.... </div>
        </>
      )}
    </div>
  );
}

export default PaymentTest;
