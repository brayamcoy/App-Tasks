import React from "react";
import { toastSuccess, toastError } from "../toasts";
import { InputLabel } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

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

export default function AddForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formTask, setformTask] = React.useState({});

  const addTask = (event) => {
    event.preventDefault();
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`;
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formTask),
    };

    fetch(url, options)
      .then((response) => {
        return response.json;
      })
      .then((myJson) => {
        toastSuccess();
        props.getTasksFn();
        document.getElementById("form").reset();
      })
      .catch((error) => {
        console.log(error);
        toastError();
      });
  };

  const handleInput = (event) => {
    setformTask({
      ...formTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="light" variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
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
              Add new Task
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
                  onInput={handleInput}
                  onSubmit={addTask}
                >
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="content">
                      Write some text...
                    </InputLabel>
                    <Input
                      color="secondary"
                      autoFocus
                      required
                      fullWidth={false}
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
                      label="Fecha"
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
                      <AddCircleTwoToneIcon></AddCircleTwoToneIcon>
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
