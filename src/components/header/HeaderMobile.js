import { AppBar, Badge, makeStyles, Toolbar } from "@material-ui/core";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";
import { useSelector } from "react-redux";
import MenuBar from "./MenuBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FFFFFF"
  },
  tools: {
    display: "block",
    padding: "5px",
    ...theme.mixins.toolbar
  },
  topheader: {
    display: "flex",
    justifyContent: "space-between"
  },
  hederleft: {
    display: "flex"
  },
  headerLogo: {
    width: "120px",
    objectFit: "contain",
    margin: "0, 20px",
    marginTop: "18px"
  },
  hederright: {
    display: "flex",
    float: "right",
    marginTop: "18px",
    paddingRight: "3px"
  },
  headerSearch: {
    display: "flex",
    pdding: "15px",
    alignItems: "center",
    flex: 1,
    borderRadius: "24px",
    backgroundColor: "white"
  },
  searchInput: {
    height: "25px",
    borderRadius: "15px",
    padding: "10px",
    border: "1px solid lightgray",
    width: "100%"
  },
  searchIcon: {
    padding: "5px",
    height: "22px !important",
    alignSelf: "flex-end",
    backgroundColor: "black",
    borderRadius: "15px"
  }
}));

function HeaderMobile() {
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.tools}>
          <div className={classes.topheader}>
            <div className={classes.hederleft}>
              <MenuBar />
              <Link to="/">
                <img
                  className={classes.headerLogo}
                  src="https://i.imgur.com/r9gZrUe.jpg"
                />
              </Link>
            </div>
            <div className={classes.hederright}>
              {userInfo ? (
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  {userInfo.name}
                </span>
              ) : (
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    paddingRight: "3px"
                  }}
                  to="/signin"
                >
                  <span>Sign In </span>
                </Link>
              )}

              <Link to="">
                <Badge
                  style={{ paddingRight: "3px" }}
                  color="secondary"
                  badgeContent={cartItems?.length}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <ShoppingCartIcon style={{ color: "black" }} />
                </Badge>
              </Link>
            </div>
          </div>
          {/* <div className={classes.headerSearch}>
            <InputBase placeholder="Search…" className={classes.searchInput} />
            <SearchIcon className={classes.searchIcon} />
          </div> */}

          {/* <TabNavigation /> */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderMobile;
