import React from "react";
//import MessageCard from "./MessageCard";
import { connect } from "react-redux";
import { getusermessages, addlike, removelike } from "../../redux";
import MessageCard from "./MessageCard";

class GetUserMessages extends React.Component {
  componentDidMount() {
    this.props.getusermessages(this.props.username);
  }
  handleToggleLikes = messageID => {
    console.log("button worked " + messageID);
    this.props.addlike(messageID);
  };

  render() {
    if (this.props.result === null) {
      return <div>Work please.</div>;
    }
    return (
      <div>
        {this.props.result.map(message => (
          <MessageCard
            key={message.id}
            username={message.username}
            text={message.text}
            id={message.id}
            likes={message.likes.length}
            togglelikes={this.handleToggleLikes}
          />
        ))}
      </div>
    );
  }
}

// const mapDispatchToProps = { messagelist};
// const mapStateToProps = state => {
//     return {
//         messages: state.messages.messagelist.result
//     }
// };

export default connect(
  state => ({
    result: state.messages.getusermessages.result,
    loading: state.messages.getusermessages.loading,
    error: state.messages.getusermessages.error
  }),
  { getusermessages, addlike, removelike }
)(GetUserMessages);
