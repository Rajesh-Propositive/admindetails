import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import { register, signin } from "../actions/userActions";
import { Link, useHistory, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "#FFFFFF"
  },
  loginlogo: {
    marginTop: "20px",
    marginBottom: "20px",
    objectFit: "contain",
    width: "100px",
    marginRight: "auto",
    marginLeft: "auto"
  },
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
    margin: "auto",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold"
  },
  signInButton: {
    background: "#f0c14b",
    borderRadius: "2px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    cursor: "pointer",
    borderColor: " #a88734 #9c7e31 #846a29"
  },
  agreement: {
    marginTop: "15px",
    fontSize: "12px"
  },
  summary: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  }
}));
function SigninScreen() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = useState("login");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dispatch = useDispatch();
  const signInHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and comfirm passoword are not match");
    } else {
      dispatch(register(name, email, password));
      history.push(redirect);
    }
  };
  return (
    <div className={classes.login}>
      {/* <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Link to="/">
            <img
              className={classes.loginlogo}
              src="https://i.imgur.com/r9gZrUe.jpg"
              alt=""
            />
          </Link>
        </Toolbar>
      </AppBar> */}
      <div className={classes.loginContainer}>
        <Accordion
          expanded={expanded === "login"}
          onChange={handleChange("login")}
        >
          <AccordionSummary
            aria-controls="logind-content"
            id="logind-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>Login </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.loginDetails}>
            <form onSubmit={signInHandler}>
              <input
                className={classes.inputContainer}
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className={classes.inputContainer}
                placeholder="Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className={classes.signInButton}>
                Sign In
              </button>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "register"}
          onChange={handleChange("register")}
        >
          <AccordionSummary
            aria-controls="registerd-content"
            id="registerd-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>Sign Up </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.loginDetails}>
            <form onSubmit={registerHandler}>
              <input
                className={classes.inputContainer}
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={classes.inputContainer}
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className={classes.inputContainer}
                placeholder="Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={classes.inputContainer}
                placeholder="Your Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className={classes.agreement}>
                By signing-in you agree to the company Conditions of Use & Sale.
                Please see our Privacy Notice, our Cookies Notice and our
                Interest-Based Ads Notice.
              </p>
              <button type="submit" className={classes.signInButton}>
                Create Account
              </button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default SigninScreen;
