import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: { maxWidth: 600, flexGrow: 1 },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

export default function MessageCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const url = `/profiles/${props.username}`;
  let active = false;
  if (props.username === props.loggedinUser) active = true;
  console.log(url)
  console.log("active is : " + active)
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, messageID) => {
    if (event.currentTarget.id === "btnYes") {
      props.deletemessage(messageID);
    }
    setOpen(false);
  };
  //const preventDefault = event => event.preventDefault();
  return (
    <>
      <Card className={classes.root} variant="outlined">
      <Grid container spacing={3} justify="left" className={classes.root}>
      <Typography
              component="div"
              style={{ backgroundColor: "#cfe8fc", height: "10px", width: "600px" }}
            />
          <Grid item xs={2}>
          <Paper className={classes.paper} elevation={0}>
            <CardContent>
              <Avatar alt={props.username} src="/broken-image.jpg" variant="rounded" className={classes.purple} />
            </CardContent>
          </Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
            <CardContent>
              <Link href={url} variant="h6">
              {props.username}
              </Link>
            </CardContent>
          </Paper>
          </Grid>
          <Grid item xs={12}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary" variant="h5">
            {props.text}
          </Typography>
          </CardContent>
        </Grid>
      </Grid>
        
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => props.togglelikes(props.id)}
          >
            <FavoriteIcon />
            {props.likes + " likes."}
          </IconButton>
          {active && (
            <IconButton>
              <Button size="small" color="primary" onClick={() => props.deletemessage(props.id)}>
                <DeleteIcon style={{ color: "#4e209e" }} />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete your message?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to permanently delete your message?{props.id}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    autoFocus
                    id="btnNo"
                  >
                    No
                  </Button>
                  <Button onClick={() => handleClose(props.id)} color="primary" id="btnYes">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </IconButton>
          )}
        </CardActions>
      </Card>
    </>
  );
}
