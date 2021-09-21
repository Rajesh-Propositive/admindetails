import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  images: {
    maxHeight: "250px",
    objectFit: "contain"
  },
  title: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black"
  }
}));
function ItemTick({ item }) {
  const classes = useStyles();
  return (
    <div>
      <img className={classes.images} src={item.image} alt="" />
      {/* <div>
        <h3
          style={{
            color: "white",
            background: "black",
            textAlign: "center",
            objectFit: "contain",
            width: "100px",
            justifyContent: "center",
            marginTop: "-50%",
            margingLeft: "50%",

            paddingLeft: "50%px"
            // top: "50%",
            // left: "50px",
            // position: "absolute",
            // zIndex: 1
          }}
        >
          {item.name}{" "}
        </h3>
      </div> */}
    </div>
  );
}

export default ItemTick;
