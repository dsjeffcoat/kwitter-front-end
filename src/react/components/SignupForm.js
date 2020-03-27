import React from "react";
import Spinner from "react-spinkit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signup, login } from "../../redux";

import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";

//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
//import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import sideImage from "./images/Kwitter-symbol5.png";
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

  render() {
    const { loading, error } = this.props;
    const classes = makeStyles(theme => ({
      root: {
        height: "100vh"
      },
      image: {
        backgroundImage: sideImage,
        backgroundRepeat: "no-repeat",
        backgroundColor:
          theme.palette.type === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      paper: {
        margin: theme.spacing(8, 4),
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
      <React.Fragment>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={3}
            md={7}
            className={classes.image}
            alignItems="center"
            justify="center"
          >
            <img src={sideImage} alt="animal" />{" "}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div
              className={classes.paper}
              style={{ paddingLeft: "250px", paddingTop: "100px" }}
            >
              <Avatar className={classes.avatar}>
                <AddCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up Today
              </Typography>
              <form
                className={classes.form}
                id="login-form"
                onSubmit={this.handleSignup}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.handleChange}
                />
                <TextField
                  name="displayName"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="inherit"
                  className={classes.submit}
                >
                  Create User
                </Button>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href={"/"} variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>

            {loading && <Spinner name="circle" color="blue" />}
            {error && (
              <>
                <Alert severity="error">
                  {/* <p style={{ color: "red" }}> */}
                  <AlertTitle>Registration Error</AlertTitle>
                  <p>
                    Please resubmit according to the following guidelines:{" "}
                    <br />
                    (1) Username must be unique and at least 3 characters.{" "}
                    <br />
                    (2) Username is case-sensitive.
                    <br />
                    (3) Password must be at least 3 alphanumeric characters and
                    case-sensitive.
                  </p>
                </Alert>
              </>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.users.signup.result,
    loading: state.users.signup.loading,
    error: state.users.signup.error
  }),
  { signup, login }
)(SignupForm);
