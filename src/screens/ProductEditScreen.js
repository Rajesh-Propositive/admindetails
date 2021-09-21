import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory, useParams } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";
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
    cursor: "pointer",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: " #a88734 #9c7e31 #846a29"
  }
}));
function ProductEditScreen(props) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [modelName, setModelName] = useState("");
  const [brand, setBrand] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [image, setImage] = useState("");
  const [mockImage, setMockImage] = useState("");
  const [category, setCategory] = useState("");
  const [version, setVersion] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = productUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      history.push("/productlist");
    }
    if (!product || product._id !== id || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(id));
    } else {
      setModelName(product.modelName);
      setUnitPrice(product.unitPrice);
      setImage(product.image);
      setCategory(product.category);
      setReleaseDate(product.releaseDate);
      setBrand(product.brand);
      setMockImage(product.mockImage);
      setVersion(product.version);
    }
  }, [product, dispatch, id, successUpdate, history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        modelName,
        unitPrice,
        image,
        category,
        mockImage,
        brand,
        releaseDate,
        version
      })
    );
  };
  return (
    <div className={classes.login}>
      <div className={classes.loginContainer}>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <Typography className={classes.heading}>
              Edit Product {id}
            </Typography>
          </div>
          {loadingUpdate && <div> <center>  <CircularProgress /> </center>  </div>}
          {errorUpdate && <div>{errorUpdate}</div>}
          {loading ? (
            <div> <center>  <CircularProgress /> </center>  </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <div>
                <label htmlFor="name">Model Name</label>
                <input
                  className={classes.inputContainer}
                  id="name"
                  type="text"
                  placeholder="Enter model name"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="name">Brand Name</label>
                <input
                  className={classes.inputContainer}
                  id="name"
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  className={classes.inputContainer}
                  id="price"
                  type="text"
                  placeholder="Enter price"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <input
                  className={classes.inputContainer}
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="image">mock Image</label>
                <input
                  className={classes.inputContainer}
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={mockImage}
                  onChange={(e) => setMockImage(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  className={classes.inputContainer}
                  id="category"
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="category">Relese Date</label>
                <input
                  className={classes.inputContainer}
                  id="category"
                  type="text"
                  placeholder="Enter releaseDate"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="category">Version</label>
                <input
                  className={classes.inputContainer}
                  id="category"
                  type="text"
                  placeholder="Enter version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                ></input>
              </div>
              <div>
                <label></label>
                <button className={classes.signInButton} type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProductEditScreen;
