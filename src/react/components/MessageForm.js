// import React from "react";
// //import MessageCard from "./MessageCard";
// import { connect } from "react-redux";
// import Spinner from "react-spinkit";
// import { TextField, Button, Card, CardContent, Typography } from "@material-ui/core";
// import { postmessage } from "../../redux/messages";
// import { makeStyles } from "@material-ui/core/styles"

// class MessageForm extends React.Component {
//   state = {
//     text: ""
//   };

//   handlePost = e => {
//     e.preventDefault();
//     this.props.postmessage(this.state);
//     this.setState({ text: "" });
//   };

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   countText = () => {
//     let text = document.getElementById("textarea");
//     document.getElementById("message").innerHTML =
//       120 - text.value.length + " / 120";
//   };

//   render() {
//     const classes = makeStyles({
//             root: {maxWidth: 600, maxHeight: 30,
//             },
//             title: {
//                 fontSize: 14,
//             },
//             pos: {
//                 marginBottom: 12,
//             },
//         });
//     const { loading, error } = this.props;
//     return (
//       <>
//       <Card className={classes.root} variant="outlined">
//         <Typography component="div" style={{ backgroundColor: "#1a237e", height: "24px", width: "400px" }} >Post Your Thoughts</Typography>
//         <CardContent>
//         <form className={classes.root} autoComplete="off">
//           <TextField
//             id="textarea"
//             maxLength="120"
//             placeholder={this.state.text}
//             type="text"
//             name="text"
//             label="New Message"
//             variant="outlined"
//             required
//             onKeyUp={this.countText}
//             onChange={this.handleChange}

//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={this.handlePost}
//             disabled={loading}>
//             Post Kweet
//           </Button>
//         </form>
//         {loading && <Spinner name="circle" color="blue" />}
//         {error && <p style={{ color: "red" }}>{error.message}</p>}
//         </CardContent>
//         </Card>
//       </>
//     );
//   }
// }

// export default connect(
//   state => ({
//     result: state.messages.postmessage.result,
//     loading: state.messages.postmessage.loading,
//     error: state.messages.postmessage.error
//   }),
//   { postmessage }
// )(MessageForm);
