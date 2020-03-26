import React from "react";
import Spinner from "react-spinkit";
import "./Menu.css";
import { connect } from "react-redux";
import { logout } from "../../redux";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import logo from "./images/Kwitter-logo.png"
import { Link } from "react-router-dom";

class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { loading, error } = this.props;
    const classes = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          flexGrow: 1
        },
        menuButton: {
          marginLeft: theme.spacing(2)
        },
        title: {
          flexGrow: 1
        }
      })
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "#4e209e" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
             <img src={logo} alt="logo" height="120" width="150" /> 
            </Typography>

            {this.props.isAuthenticated && (
              <div id="menu-links">
                <Link to="/messagefeed" style={{ color: "white" }}>
                  Message Feed
                </Link>
                <Link to="/" style={{ color: "white" }}>Home</Link> 
                <Link
                  to="/"
                  onClick={this.handleLogout}
                  style={{ color: "white" }}
                >
                  Logout
                </Link>
              </div>
            )}
            {loading && <Spinner name="circle" color="blue" />}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.logout.result,
    loading: state.auth.logout.loading,
    error: state.auth.logout.error
  }),
  { logout }
)(Menu);
