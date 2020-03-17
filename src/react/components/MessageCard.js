import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {maxWidth: 600, 
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
const MessageCard = (props) => {
    const classes = useStyles();
    const url = "/profiles/" + props.username
    return (
        <>
            <Card className ={classes.root} raised="true" variant="outlined">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '10px', width: '600px' }} />
                <CardContent>
                    <Typography variant="h5" component="h2">
                         <Link
                            href= {url}
                            variant="body2">
                                {props.username}
                        </Link>
                            
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        
        </>
    )
    
}
export default MessageCard;


// import React from "react";

// // const fakeMessage = {
// //   id: 2528,
// //   text: "It's an awesome day at Kenzie Academy!",
// //   username: "cheriaa43",
// //   createdAt: "2020-03-12T16:49:58.012Z",
// //   likes: []
// // };

// class MessageCard extends React.Component {
//     render() {
//         return (
//             <div style={{
//                 border: "1px solid black", borderRadius: "10px", padding: "1em", margin: "2em"
//             }}
//             >  
//                 <h4>{this.props.username}</h4>
//                 <p>{this.props.text}</p>
//                 <p>{new Date(this.props.createdAt).toDateString()}</p>
//             </div>
//         );
//     }
// }

// export default MessageCard;