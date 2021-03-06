import React from "react";
import { Menu, MessageList } from "./components";
import { userIsAuthenticated } from "./HOCs";

class MessageFeed extends React.Component {
  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        
        <MessageList />
      </>
    );
  }
}

export default userIsAuthenticated(MessageFeed);
