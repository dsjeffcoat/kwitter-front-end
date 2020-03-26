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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles({
  root: { maxWidth: 600 },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function MessageCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const url = `/profiles/${props.username}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = event => {
    if (event.currentTarget.id === "btnYes") {
      props.deletemessage(props.messageID);
    }
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "10px", width: "600px" }}
        />
        <CardContent>
          <Link href={url} variant="h5" component="h2">
            {props.username}
          </Link>

          <Typography className={classes.pos} color="textSecondary">
            {props.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => props.togglelikes(props.id)}
          >
            <FavoriteIcon />
            {props.likes + " likes."}
          </IconButton>
          {props.username && (
            <IconButton>
              <Button size="small" color="primary" onClick={handleClickOpen}>
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
                    Are you sure you want to permanently delete your message?
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
                  <Button onClick={handleClose} color="primary" id="btnYes">
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
