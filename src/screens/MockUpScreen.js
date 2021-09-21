import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { addtoBasket } from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    alignItems: "center"
  },
  mock: {
    position: "absolute",
    maxHeight: "460px",
    maxWidth: "100%",
    objectFit: "contain"
  },
  cropped: {
    position: "absolute",
    objectFit: "contain",
    zIndex: "-1",
    maxWidth: "100%",
    width: 250,
    height: 406
  },
  pImage: {
    width: "100px",
    padding: "10px"
  }
}));

function MockUpScreen() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [cropedPixel, setCropedPixel] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/products/get/${id}`).then((response) => {
      setProduct(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, [id]);

  useEffect(() => {
    const croppedImage = JSON.parse(
      window.localStorage.getItem("croppedImage")
    );
    setCropedPixel(croppedImage);
  }, []);

  const addToBasketHandler = (id) => {
    dispatch(
      addtoBasket({
        product: product._id,
        ItemName: product.modelName,
        image: product.image,
        mockImage: product.mockImage,
        UnitPrice: product.unitPrice,
        cropedPixel: cropedPixel
      })
    );
    history.push(`/cart/${id}`);
  };
// if (!cropedPixel) {
// history.push(`/upload/${id}`)
// }
  function AddingCart() {
    return (
      <>
        <Grid item xs={6}>
          <img
            className={classes.pImage}
            src={product.image}
            alt="productImage"
          />
        </Grid>

        <Grid item xs={6}>
          <Typography style={{ color: "black" }} variant="h5" gutterBottom>
            {product.modelName} Case
          </Typography>
          <Typography style={{ color: "black" }} variant="h6" gutterBottom>
            Price: {product.unitPrice} ETB
          </Typography>
          <Button onClick={addToBasketHandler}
            style={{ background: "#FFCC33", width: "100%", padding: "15px" }}
          >
            Add to Cart{" "}
          </Button>
        </Grid>
      </>
    );
  }
  return (
    <div>
      
      {loading ? (
        <div>Loading..... </div>
      ) : (
        <Grid container spacing={2}>
          <Grid container spacing={1} item xs={12} sm={6}>
            {/* <div className={classes.root}> */}
            <AddingCart style={{ justifyContent: "space-evenly" }} />
            {/* </div> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <img className={classes.mock} src={product.mockImage} alt="mock" />
            <img
              className={classes.cropped}
              src={cropedPixel}
              alt="background"
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default MockUpScreen;
