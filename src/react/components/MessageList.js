import React from "react";
//import MessageCard from "./MessageCard";
import { connect } from "react-redux";
import { messagelist, addlike, removelike } from "../../redux";
import MessageCard from "./MessageCard";

class MessageList extends React.Component {
  componentDidMount() {
    this.props.messagelist();
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
          <MessageCard username={message.username} text={message.text} />
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
    result: state.messages.messagelist.result,
    loading: state.messages.messagelist.loading,
    error: state.messages.messagelist.error
  }),
  { messagelist, addlike, removelike }
)(MessageList);

// import React from "react";
// import MessageCard from "./MessageCard";

// const messages = [
//     {
//         "id": 2532,
//         "text": "<3 Kenzie Academy!",
//         "username": "cheriaa43",
//         "createdAt": "2020-03-12T18:17:27.132Z",
//         "likes": []
//     },
//     {
//         "id": 2528,
//         "text": "It's an awesome day at Kenzie Academy!",
//         "username": "cheriaa43",
//         "createdAt": "2020-03-12T16:49:58.012Z",
//         "likes": []
//     }];

// class MessageList extends React.Component {
//     render() {
//         return messages.map(message => {
//             return <MessageCard
//                 username={message.username}
//                 text={message.text}
//                 createdAt={message.createdAt}
//             />
//         });
//     }
// }

//export default MessageList;
