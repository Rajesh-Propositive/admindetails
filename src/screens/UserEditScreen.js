import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { detailsUser, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
const useStyles = makeStyles((theme) => ({
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
    marginTop: "60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  signInButton: {
    fontWeight: "bold",
    background: "#f0c14b",
    borderRadius: "2px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: " #a88734 #9c7e31 #846a29"
  }
}));

function UserEditScreen() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = userUpdate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, history, successUpdate, user, id]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: id, name, email, isSeller, isAdmin }));
  };
  return (
    <div className={classes.login}>
      <div className={classes.loginContainer}>
        <form onSubmit={submitHandler}>
          <div>
            <Typography className={classes.heading}>
              Edit User {name}
            </Typography>
            {loadingUpdate && <div>Loading...</div>}
            {errorUpdate && <div>{errorUpdate}</div>}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  className={classes.inputContainer}
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className={classes.inputContainer}
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="isSeller">Is Seller</label>
                <input
                  id="isSeller"
                  type="checkbox"
                  checked={isSeller}
                  onChange={(e) => setIsSeller(e.target.checked)}
                ></input>
              </div>
              <div>
                <label htmlFor="isAdmin">Is Admin</label>
                <input
                  id="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></input>
              </div>
              <div>
                <label></label>
                <button className={classes.signInButton} type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserEditScreen;
