import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { addtoBasket } from "../actions/cartActions";
// import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie';
import { savePaymentMethod } from "../actions/cartActions";
import { saveShippingAddress } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Axios from "../axios";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginTop: "60px"
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
  formControl: {
    width: "100%",
    borderRadius: "10px"
    // margin: theme.spacing(1),
    // minWidth: 120
  }
}));
function MockScreen() {
  const { id } = useParams();
  const [cookies, setCookie] = useCookies(['crpImg']);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { cartItems } = cart;
  const hisory = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [Quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cropedPixel, setCropedPixel] = useState(undefined);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [place, setPlace] = useState(shippingAddress.place);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("YenePay");
  const handleChange = (event) => {
    setPlace(event.target.value);
  };

  const handleChangePay = (event) => {
    setPaymentMethod(event.target.value);
  };
  useEffect(() => {
    setLoading(true);
    Axios.get(`/products/get/${id}`).then((response) => {
      setProduct(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, [id]);

  // useEffect(() => {

  //   cookies.get("crpImg")
  // }, [cookies]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addtoBasket({
        product: product._id,
        ItemName: product.modelName,
        image: product.image,
        mockImage: product.mockImage,
        UnitPrice: product.unitPrice,
        Quantity
      })
    );
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(
      saveShippingAddress({
        fullName,
        phoneNumber,
        place
      })
    );
    hisory.push("/signin?redirect=/placeorder");
  };

  return (
    <Grid
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      {loading ? (
        <div>
          {" "}
          <center>
            {" "}
            <CircularProgress />{" "}
          </center>{" "}
        </div>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <div>
              <Paper className={classes.paper}>
                <center>
                  <div
                    style={{ width: "250px", height: "500px", display: "flex" }}
                  >
                    <img
                      style={{
                        objectFit: "contain",
                        // width: "100%",
                        width: "240px",
                        zIndex: "1"
                      }}
                      src={product.mockImage}
                      alt=""
                    />
                    <img
                      style={{
                        objectFit: "contain",
                        // width: "100%",
                        width: "176px",
                        marginLeft: "-208px"
                      }}
                      src={cookies.crpImg}
                      alt=""
                    />
                  </div>
                </center>
              </Paper>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <center>
              <div className={classes.loginContainer}>
                {/* <h4>Place Order NOw </h4> */}
                <form onSubmit={submitHandler}>
                  <h4>Shipping </h4>
                  <input
                    className={classes.inputContainer}
                    type="text"
                    placeholder="ስም / Your Name"
                    value={fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <input
                    className={classes.inputContainer}
                    type="text"
                    placeholder="ስልክ / Mobile ( 09 _ _ _ )"
                    value={phoneNumber}
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      {" "}
                      Your City / ያሉበት ከተማ
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
                      <option>Addis Ababa / አዲስ አበባ</option>
                      <option>Dire Dawa / ድሬደዋ</option>
                      <option>Mekele/ መቀሌ</option>
                      <option>Nazret / ናዝሬት</option>
                      <option>BahrDar / ባህርዳር</option>
                      <option>Gonder / ጎንደር</option>
                      <option>Desse / ደሴ</option>
                      <option>Hawassa / ሀዋሳ</option>
                      <option>Jima / ጅማ</option>
                      <option>Harrar / ሀረር</option>
                      <option>Jigjiga / ጅጅጋ</option>
                      <option>Asayta / አሳይታ</option>
                      <option>Asosa / አሶሳ</option>
                      <option>Other / ሌላ</option>
                    </Select>
                  </FormControl>
                  <br />
                  <h4>Payment </h4>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Payment Method</FormLabel>
                    <RadioGroup
                      row
                      value={paymentMethod}
                      onChange={handleChangePay}
                      aria-label="position"
                      name="position"
                      defaultValue="YenePay"
                    >
                      <FormControlLabel
                        value="YenePay"
                        control={<Radio />}
                        label="YenePay"
                      />
                      <FormControlLabel
                        value="CBE Birr"
                        control={<Radio />}
                        label="CBE Birr"
                      />
                      <FormControlLabel
                        value="Awash Bank"
                        control={<Radio />}
                        label="Awash Bank"
                      />
                      <FormControlLabel
                        value="Amole"
                        control={<Radio />}
                        label="Amole"
                      />
                      <FormControlLabel
                        value="HelloCash"
                        control={<Radio />}
                        label="HelloCash"
                      />
                    </RadioGroup>
                  </FormControl>
                  <button type="submit" className={classes.signInButton}>
                    PLACE ORDER
                  </button>
                </form>
              </div>
            </center>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default MockScreen;
