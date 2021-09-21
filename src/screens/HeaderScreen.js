import { Hidden } from "@material-ui/core";
import React from "react";

import HeaderDesktop from "../components/header/HeaderDesktop";
import HeaderMobile from "../components/header/HeaderMobile";

function HeaderScreen() {
  return (
    <>
      <Hidden smUp>
        <HeaderMobile />
      </Hidden>
      <Hidden xsDown>
        <HeaderDesktop />
      </Hidden>
    </>
  );
}

export default HeaderScreen;
