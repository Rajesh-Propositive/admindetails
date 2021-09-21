import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
    // marginTop: "60px"
  }
}));

function UserListScreen() {
  const classes = useStyles();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const history = useHistory();
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <Grid
      style={{ width: "100%" }}
      direction="row"
      spacing={1}
      container
      justify="center"
      alignItems="center"
    >
      <Paper
        style={{ alignSelf: "flex-start", marginTop: "50px" }}
        className={classes.paper}
      >
        <Typography variant="h6" gutterBottom>
          Users
        </Typography>
      </Paper>
      {loadingDelete && <div>Loading...</div>}
      {errorDelete && <div>{errorDelete} </div>}
      {successDelete && <div>User Deleted Succesfuly</div>}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>IS SELLER</TableCell>
                <TableCell>IS ADMIN</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isSeller ? "yes" : "No"}</TableCell>
                  <TableCell>{user.isAdmin ? "yes" : "No"}</TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      className="small"
                      onClick={() => history.push(`/user/${user._id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(user)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Grid>
  );
}

export default UserListScreen;
