import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { signup } from "../../redux";
import "./SignupForm.css";
import { Link } from "react-router-dom";

import {
  TextField,
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert, AlertTitle } from "@material-ui/lab";

class SignupForm extends React.Component {
  state = {
    username: "",
    displayName: "",
    password: ""
  };

  handleSignup = e => {
    e.preventDefault();
    this.props.signup(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setShow = e => {
    this.setState({ show: true });
  };

  render() {
    const { loading, error } = this.props;
    const classes = makeStyles(theme => ({
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
      }
    }));

    return (
      <Container
        component="main"
        maxWidth="xs"
        style={{ marginTop: "20px", justifyContent: "center" }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            id="signup-form"
            noValidate
            onSubmit={this.handleSignup}
          >
            <label htmlFor="username">Username</label>
            <TextField
              type="text"
              name="username"
              variant="outlined"
              autoFocus
              required
              onChange={this.handleChange}
            />
            <label htmlFor="displayName">Display Name</label>
            <TextField
              type="text"
              name="displayName"
              variant="outlined"
              required
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <TextField
              type="password"
              name="password"
              variant="outlined"
              required
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to={"/"} variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
          {loading && <Spinner name="circle" color="blue" />}
          {error && (
            <>
              <Alert severity="error">
                {/* <p style={{ color: "red" }}> */}
                <AlertTitle>Registration Error</AlertTitle>
                <p>
                  Please resubmit according to the following guidelines: <br />
                  (1) Username must be unique and at least 3 characters. <br />
                  (2) Username is case-sensitive.
                  <br />
                  (3) Password must be at least 3 alphanumeric characters and
                  case-sensitive.
                </p>
              </Alert>
            </>
          )}
        </div>
      </Container>
    );
  }
}

export default connect(
  state => ({
    result: state.users.signup.result,
    loading: state.users.signup.loading,
    error: state.users.signup.error
  }),
  { signup }
)(SignupForm);
