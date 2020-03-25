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
import Home from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
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
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Home to={"/profile"} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Kwitter
            </Typography>

            {this.props.isAuthenticated && (
              <div id="menu-links">
                <Link to="/messagefeed">Message Feed</Link>
                {/* <Link to="/profiles/:username">Profile</Link> */}
                <Link to="/" onClick={this.handleLogout}>
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

// import React from "react";
// import { Link } from "react-router-dom";
// import "./Menu.css";
// import { connect } from "react-redux";
// import { logout } from "../../redux";
// // import logo from "./Images/logo.png";

// class Menu extends React.Component {
//   handleLogout = event => {
//     event.preventDefault();
//     this.props.logout();
//   };

//   render() {
//     return (
//       <div id="menu">
//         <h2>Kwitter</h2>
//         {this.props.isAuthenticated && (
//           <div id="menu-links">
//             <Link to="/messagefeed">Message Feed</Link>
//             <Link to="/" onClick={this.handleLogout}>
//               Logout
//             </Link>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default connect(
//   state => ({
//     result: state.auth.logout.result,
//     loading: state.auth.logout.loading,
//     error: state.auth.logout.error
//   }),
//   { logout }
// )(Menu);
