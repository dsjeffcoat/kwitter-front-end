import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import {
  TextField,
  Button,
  makeStyles,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  Paper
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import sideImage from "./images/Kwitter-symbol5.png";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
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
            <img
              src={sideImage}
              alt="animal"
              style={{ paddingBottom: "50px" }}
            />{" "}
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                id="login-form"
                onSubmit={this.handleLogin}
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
                  // style={{ color: "white" }}
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to={"/signup"} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
              {loading && <Spinner name="circle" color="blue" />}
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          </Grid>
        </Grid>
        {/* <form id="login-form" onSubmit={this.handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          autoFocus
          required
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={this.handleChange}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {loading && <Spinner name="circle" color="blue" />}
      {error && <p style={{ color: "red" }}>{error.message}</p>} */}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login }
)(LoginForm);
