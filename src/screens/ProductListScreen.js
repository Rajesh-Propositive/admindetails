import {
  Button,
  AppBar,
  Grid,
  Paper,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect } from "react";
import { Link, useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { useHistory } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET
} from "../constants/productConstants";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
    // marginTop: "60px"
  },
  placeorderB: {
    padding: "1rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    background: "#f0c14b",
    cursor: "pointer",
    width: "100%",
    border: "0.1rem #808080 solid"
  }
}));

function ProductListScreen(props) {
  const classes = useStyles();
  const history = useHistory();
  // const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [
    createdProduct,
    dispatch,
    history,

    successCreate,
    successDelete,
    userInfo._id
  ]);
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
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
      <Paper style={{alignSelf: "flex-start", marginTop: "50px"}} className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Products
        </Typography>
        <button
          type="button"
          className={classes.placeorderB}
          onClick={createHandler}
        >
          Create Product{" "}
        </button>
      </Paper>
      {loadingDelete && <div> <center>  <CircularProgress /> </center>  </div>}
      {errorDelete && <div>{errorDelete} </div>}
      {loadingCreate && <div> <center>  <CircularProgress /> </center>  </div>}
      {errorCreate && <div>{errorCreate} </div>}
      {loading ? (
        <div> <center>  <CircularProgress /> </center>  </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>BRAND</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.modelName}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHandler(product)}
                    >
                      delete
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

export default ProductListScreen;
