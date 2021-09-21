import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderScreen from "./screens/HeaderScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeScreenGrid from "./screens/HomeScreenGrid";
import ModelCate from "./screens/ModelCate";
import UploadOne from "./components/UploadOne";
import Uploader from "./components/Uploader";
import MockScreen from "./screens/MockScreen";
import SigninScreen from "./screens/SigninScreen";

import PlaceOscreen from "./screens/PlaceOScreen";

import OrderPrint from "./screens/OrderPrint";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderEditScreen from "./screens/OrderEditScreen";
import AdminRoute from "./screens/AdminRoute";
import ModelCateScreen from "./screens/ModelCateScreen";
import HomeGridTwo from "./screens/HomeGridTwo";

export default function App() {
  return (
    <Router>
      <HeaderScreen />
      <div className="App">
        <Switch>
          <AdminRoute path="/order/:id/edit">
            <OrderEditScreen />
          </AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/user/:id/edit">
            <UserEditScreen />
          </AdminRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/userlist"
            component={UserListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></AdminRoute>
          <Route path="/order/:id">
            <OrderPrint />
          </Route>
          <Route path="/orderhistory">
            <OrderHistoryScreen />
          </Route>
          <Route path="/placeorder">
            <PlaceOscreen />
          </Route>
          <Route path="/signin">
            <SigninScreen />
          </Route>
          <Route path="/mockup/:id">
            <MockScreen />
          </Route>
          <Route path="/upload/:id">
            <Uploader />
          </Route>
          {/* <Route path="/brand/:brand">
            <ModelCate />
          </Route> */}
          <Route path="/brand/:brand">
            <ModelCateScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
            <HomeScreenGrid />
            {/* <HomeGridTwo /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
