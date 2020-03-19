import React, { Component } from "react";
import { connect } from "../HOCs";
import { toggleLikes } from "../../redux";

class ToggleLikes extends Component {
    handleToggleLikes = event => {
        this.props.toggleLikes(this.props.messageID);
    };
    render() {
        const isLiked = this.props.likes.find(
            likes => likes.username === this.props.loggedInUsername
        );
        return (
            <button onClick={this.handleToggleLike}>
                {isLiked ? "Unlike" : "Like"}
            </button>
        );
    }
}
const mapStateToProps = state => {
    return {
        loggedInUsername: throwStatement.auth.login.result.username
    };
};
const napDispatchToProps = {
    toggleLikes
};
export default connect(mapDispatchToProps, mapDispatchToProps)(ToggleLikes);