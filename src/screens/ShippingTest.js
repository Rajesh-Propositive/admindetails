import React, { useState } from "react";
import {
  AppBar,
  FormControl,
  Select,
  Button,
  InputLabel,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "#FFFFFF"
  },
  formControl: {
    width: "100%",
    borderRadius: "10px"
    // margin: theme.spacing(1),
    // minWidth: 120
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
    borderRadius: "4px",
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
    borderRadius: "2px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    cursor: "pointer",
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
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  }
}));
function ShippingTest() {
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const { shippingAddress } = cart;
  if (!userInfo) {
    history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [place, setPlace] = useState(shippingAddress.place);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setPlace(event.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        phoneNumber,
        place
      })
    );
    console.log(saveShippingAddress);
    history.push("/payment");
  };
  // const handleClick = () => {
  //   history.push("/payment");
  // };
  return (
    <div className={classes.login}>
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
        <CheckOutSteps step1 step2></CheckOutSteps>
      </div>
      <div className={classes.loginContainer}>
        <Typography className={classes.heading}>Shipping Address </Typography>
        <form onSubmit={submitHandler}>
          <input
            className={classes.inputContainer}
            type="text"
            placeholder="?????? / Your Name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className={classes.inputContainer}
            type="text"
            placeholder="????????? / Mobile ( 09 _ _ _ )"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* <input
            className={classes.inputContainer}
            type="text"
            placeholder="Your City"
            value={place}
            required
            onChange={(e) => setPlace(e.target.value)}
          /> */}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              {" "}
              Your City / ???????????? ?????????
            </InputLabel>
            <Select
              native
              // labelId="demo-simple-select-outlined-label"
              // id="demo-simple-select-outlined"
              value={place}
              onChange={handleChange}
              name="place"
              // inputProps={{ "aria-label": "Without label" }}
            >
              <option aria-label="None" value="" />
              <option>Addis Ababa / ????????? ?????????</option>
              <option>Dire Dawa / ????????????</option>
              <option>Mekele/ ?????????</option>
              <option>Nazret / ????????????</option>
              <option>BahrDar / ???????????????</option>
              <option>Gonder / ????????????</option>
              <option>Desse / ??????</option>
              <option>Hawassa / ?????????</option>
              <option>Jima / ??????</option>
              <option>Harrar / ?????????</option>
              <option>Jigjiga / ?????????</option>
              <option>Asayta / ????????????</option>
              <option>Asosa / ?????????</option>
              <option>Other / ??????</option>
            </Select>
          </FormControl>
          <Button type="submit" className={classes.signInButton}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ShippingTest;
