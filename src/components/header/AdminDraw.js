import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signout } from "../../actions/userActions";
import StorefrontIcon from "@material-ui/icons/Storefront";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles((theme) => ({
  links: {
    display: "flex",
    textDecoration: "none",
    color: "black",
    fontWeight: "800"
  }
}));

function AdminDraw() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const handleToggle = () => {
    setOpen(true);
  };
  const handleToggleClose = () => {
    setOpen(false);
  };
  const list = (
    <div onClick={handleToggleClose} onKeyDown={handleToggleClose}>
      {userInfo && userInfo.isAdmin && (
        <List>
          <ListItem>
            <Link
              className={classes.links}
              to="/productlist"
              onClick={() => history.push("/productlist")}
            >
              <ListItemIcon>
                <StorefrontIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Product List" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              className={classes.links}
              to="/orderlist"
              onClick={() => history.push("/orderlist")}
            >
              <ListItemIcon>
                <ShoppingBasketIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Order List" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              className={classes.links}
              to="/userlist"
              onClick={() => history.push("/userlist")}
            >
              <ListItemIcon>
                <PeopleOutlineIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="User List" />
            </Link>
          </ListItem>
        </List>
      )}
    </div>
  );
  return (
    <div>
      <IconButton onClick={handleToggle}>
        <MenuIcon style={{ color: "black", fontSize: "25px" }} />
      </IconButton>
      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={handleToggleClose}
        onOpen={handleToggle}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}

export default AdminDraw;
