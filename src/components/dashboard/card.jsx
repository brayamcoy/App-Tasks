import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        height: 140,
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    playIcon: {
        height: 20,
        width: 20
    },
}));



export default function Cards(props) {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.cover} image="/backcard.jpg" title="Card Image"/>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        {props.showStatusCardFn(props.taskFn)}
                        <Typography component="h6" variant="h6">
                            {props.taskFn.content}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {props.formatDateFn(props.taskFn.date)}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="delete" onClick={(event) => props.deleteTaskFn(props.taskFn._id)}>
                            <DeleteIcon className={classes.playIcon}/>
                        </IconButton>
                        <IconButton aria-label="edit" onClick={(event) => props.setTaskFn(props.taskFn, event)}>
                            <EditRoundedIcon className={classes.playIcon}/>
                        </IconButton>
                        <IconButton aria-label="complete" onClick={(event) => props.updateTaskCompletedFn(event, props.taskFn)}>
                            <AssignmentTurnedInTwoToneIcon className={classes.playIcon}/>
                        </IconButton>
                    </div>
                </div>
            </CardActionArea>
        </Card>
    );
}
