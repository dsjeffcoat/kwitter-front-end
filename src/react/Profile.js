import React from "react";
import { Menu, UserCard, MessageList } from "./components";
import { userIsAuthenticated } from "./HOCs";
import { connect } from "react-redux";
import { getUser } from "../redux/index";

// const fakeuser = {
//   user: {
//     username: "fakey",
//     displayName: "fake",
//     about: "I'm fake",
//     createdAt: "2020-03-11T16:57:39.885Z",
//     updatedAt: "2020-03-11T16:57:39.885Z",
//     pictureLocation: "https://i.picsum.photos/100/100.jpg",
//     googleId: "string"
//   },
//   statusCode: 0
// };

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.userName)
  }
  toDisplayInfo() {
    if (this.props.userInfo ==
      null) {
      return (
        <div>Loading</div>
      )
    } else {
      return (
        <div>
          <em>Created at: </em>
          {this.props.userInfo.user.createdAt}
        </div>
      );
    }
  }
  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>
        <UserCard />
        <MessageList />
        
      </>
    );
  }
}

const mapDispatchToProps = { getUser };
const mapStateToProps = state => {
  return {
    userName: state.auth.login.result.username,
    userInfo: state.users.getUser.result
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userIsAuthenticated(Profile));
