import React, { useRef } from "react";
import { OrderScreenClass } from "./OrderScreenClass";
import { useReactToPrint } from "react-to-print";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  printable: {
    background: "#f0c14b",
    borderRadius: "2px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "bold",
    height: "40px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: "#a88734 #9c7e31 #846a29"
  }
}));
const OrderPrint = () => {
  const history = useHistory();
  const classes = useStyles();
  const componentRef = useRef();
  const handleAfterPrint = React.useCallback(() => {
    history.push("/orderhistory");
  }, [history]);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    // content: () => componentRef.current
    content: reactToPrintContent,
    documentTitle: "medafOrder",
    onAfterPrint: handleAfterPrint
  });

  return (
    <div>
      <OrderScreenClass ref={componentRef} />

      <button className={classes.printable} onClick={handlePrint}>
        Print this out!
      </button>
    </div>
  );
};

export default OrderPrint;
