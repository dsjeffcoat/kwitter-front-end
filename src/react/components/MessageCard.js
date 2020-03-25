import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: { maxWidth: 600 },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
const MessageCard = props => {
  const classes = useStyles();
  const url = "/profiles/" + props.username;
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
        </CardActions>
      </Card>
    </>
  );
};
export default MessageCard;
