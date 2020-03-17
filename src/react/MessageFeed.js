import React from "react";
import { Menu, MessageList } from "./components";
import { userIsAuthenticated } from "./HOCs";

class MessageFeed extends React.Component {
    render(){
        return (
            <> 
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <h2>Message List</h2>
                <MessageList />
            </>
        )
    }
}

export default userIsAuthenticated(MessageFeed);