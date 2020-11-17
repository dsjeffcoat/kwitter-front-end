import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import EditUserCard from "./EditUserCard";
import { getuserpicture } from "../../redux";

import { domain } from "../../redux/helpers";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "2",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export default function UserCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  let active = false;
  if (props.username === props.loggedinUser) active = true;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = event => {
    if (event.currentTarget.id === "btnYes") {
      //console.log(props.deleteuser)
      props.deleteuser(props.username);
    }
    setOpen(false);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let hasImage = false;
  //let url = `editprofile/${props.username}`
  //let hasBio = false;
  let defaultBio = "No about info setup";
  if (props.pictureLocation !== null) {
    console.log("Get picture username: " + props.username);
    getuserpicture(props.username);
    hasImage = true;
  }
  if (props.bio !== "") {
    defaultBio = props.bio;
  }
  // const handleEdit = () => {
  //   window.location = url;
  // }

  if (setExpanded === true) setExpanded(!expanded);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="User Image"
          height="260"
          image={
            hasImage
              ? `${domain + props.pictureLocation}`
              : "https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png"
          }
          title="Profile Picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.displayName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {defaultBio}
          </Typography>
        </CardContent>
      </CardActionArea>
      {active && (
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        Edit Profile <ExpandMoreIcon />
        </IconButton>
       
        <Button
          size="small"
          color="primary"
          style={{ color: "#4e209e" }}
          onClick={handleClickOpen}
        >
          Delete User
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete user account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to delete {props.username} account. Are you sure you
              want to do this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus id="btnNo">
              No
            </Button>
            <Button onClick={handleClose} color="primary" id="btnYes">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>)}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <EditUserCard
            username={props.username}
            displayName={props.displayName}
            about={props.bio}
            password={props.password}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
