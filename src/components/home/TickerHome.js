import { makeStyles } from "@material-ui/core";

import React from "react";
import ItemTick from "./ItemTick";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    paddingTop: "10px"
  }
}));
const items = [
  {
    id: "001",
    name: "Shirts",
    image: "/images/wed.webp"
  },
  {
    id: "002",
    name: "Women Jacket",
    image: "/images/first.webp"
  },
  {
    id: "003",
    name: "Mens Pant",
    image: "/images/second.webp"
  },
  {
    id: "004",
    name: "Benie Hat",
    image: "/images/third.webp"
  },
  {
    id: "005",
    name: "UniSex Tshirt",
    image: "/images/fourth.webp"
  },
  {
    id: "006",
    name: "women Shirt",
    image: "/images/fifth.webp"
  },
  {
    id: "007",
    name: "Mens Shirt",
    image: "/images/six.webp"
  },
  {
    id: "008",
    name: "Mens Jacket",
    image: "/images/seven.webp"
  }
];

function TickerHome() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {items.map((item) => (
        <ItemTick key={item.id} item={item} />
      ))}
    </div>
  );
}

export default TickerHome;
