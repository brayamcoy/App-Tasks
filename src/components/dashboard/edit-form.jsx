import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { InputLabel, FormHelperText, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    margin: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditForm(props) {
  const { content } = props.task;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.changeView();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="link">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Task
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Ok
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={6} lg={4} justify="center">
              <div>
                <form
                  className={classes.form}
                  id="form"
                  onSubmit={props.updateTask}
                  onInput={props.editInput}
                >
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="content">
                      {" "}
                      Write some text...
                    </InputLabel>
                    <Input
                      color="secondary"
                      autoFocus
                      required
                      fullWidth={false}
                      value={content}
                      id="content"
                      label="Content"
                      aria-describedby="my-helper-content"
                      name="content"
                    />
                    <FormHelperText id="my-helper-content">
                      Content
                    </FormHelperText>
                  </FormControl>
                  <FormControl fullWidth className={classes.margin}>
                    <Input
                      color="secondary"
                      label="Date"
                      className="ml-4"
                      autoFocus
                      required
                      fullWidth={false}
                      id="date"
                      name="date"
                      type="date"
                    />
                    <FormHelperText id="my-helper-date">Date</FormHelperText>
                    <Button
                      type="submit"
                      variant="contained"
                      color="light"
                      className=" ml-4 mt-4 mb-2"
                    >
                      <EditIcon />
                    </Button>
                  </FormControl>
                </form>
              </div>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}
