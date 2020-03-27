import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class NotFound extends React.Component {
  render() {
    return (
      <>
        <Container fixed>
          <Typography align="center" variant="h3">
            Page not found for {this.props.location.pathname}
          </Typography>
          <Link to="/">Go Home</Link>
        </Container>
      </>
    );
  }
}

export default NotFound;
