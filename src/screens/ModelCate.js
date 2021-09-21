import { Grid, fade, makeStyles, InputBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Axios from "../axios";
import { useLocation, useParams } from "react-router-dom";
import Product from "../components/Product";
import SearchIcon from "@material-ui/icons/Search";

import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "30px",
    marginRight: "30px"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  loader: {
    borderTop: "16px solid #3498db",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite"
  },
  search: {
    position: "relative",
    border: "1px solid gray",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: 0,
    maxWidth: "350px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    fontSize: "22px",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  }
}));

function ModelCate() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [search, setSearch] = useState("");
  // const [brand, setBrand] = useState("");
  const [brand, setBrand] = useState();

  const location = useLocation();
  // const { brand } = useParams();
  const classes = useStyles();
  useEffect(() => {
    const fetchProduct = async () => {
      setBrand(location.name);
      setIsLoading(true);
      const result = await Axios.post("/products/brand", { brand });
      setProducts(result.data);
      console.log(result.data);
      setIsLoading(false);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    setFilteredModels(
      products.filter((product) =>
        product.modelName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <div clasName={classes.root}>
      {isLoading ? (
        <div>
          {" "}
          <center>
            {" "}
            <CircularProgress />{" "}
          </center>{" "}
        </div>
      ) : (
        <>
          <center>
            {/* <h1> {brand} Phones</h1> */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="የስልክ ሞዴሎን ይፈልጉ/Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </center>

          <Grid style={{ justifyContent: "center" }} container spacing={2}>
            {filteredModels.map((product, idx) => (
              <Product
                key={idx}
                id={product._id}
                modelName={product.modelName}
                image={product.image}
              />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default ModelCate;
