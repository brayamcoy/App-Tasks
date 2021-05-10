import React, { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../components/toasts";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddForm from "../components/dashboard/add-form";
import EditForm from "../components/dashboard/edit-form";
import Navpanel from "../components/dashboard/navbar";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import Cards from "../components/dashboard/card";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import TimerIcon from "@material-ui/icons/Timer";

export default function TaskPanel() {
  const [tasks, setTasks] = useState([]);
  const [taskEdited, setTaskEdited] = useState({
    content: "",
    date: "",
    is_completed: "",
  });
  const [showView, setView] = useState("add");
  const [type, setType] = useState();
  const [tasksFiltered, setTasksFiltered] = useState("");

  const getTasks = () => {
    const url = "http://apptasks-nodejs.herokuapp.com/api/v1/tasks";
    fetch(url)
      .then((response) => response.json())
      .then((myJson) => {
        setTasks(myJson);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const showForm = () => {
    switch (showView) {
      case "add":
        return <AddForm getTasksFn={getTasks} />;
      case "edit":
        return (
          <EditForm
            task={taskEdited}
            editInput={editInput}
            updateTask={updateTask}
            changeView={changeView}
          />
        );
      default:
        return <AddForm getTasksFn={getTasks} />;
    }
  };
  const changeView = () => {
    setView("add");
  };
  const setTask = (task, e) => {
    e.preventDefault();
    setTaskEdited(task);
    setView("edit");
  };

  const editInput = (event) => {
    setTaskEdited({
      ...taskEdited,
      [event.target.name]: event.target.value,
    });
  };

  const updateTask = (event) => {
    event.preventDefault();
    fetch(
      "http://apptasks-nodejs.herokuapp.com/api/v1/tasks/" + taskEdited._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskEdited),
      }
    )
      .then((response) => response.json())
      .then((results) => {
        getTasks();
        toastSuccess();
      })
      .catch((error) => {
        console.log(error);
        toastError();
      });
  };

  const updateTaskCompleted = (event, task) => {
    event.preventDefault();
    let newTask = task;
    if (newTask.is_completed === true) {
      newTask.is_completed = false;
    } else if (newTask.is_completed === false) {
      newTask.is_completed = true;
    }
    fetch("https://apptasks-nodejs.herokuapp.com/api/v1/tasks/" + newTask._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((results) => {
        getTasks();
        toastSuccess();
      })
      .catch((error) => {
        console.log(error);
        toastError();
      });
  };

  const deleteTask = (id) => {
    fetch("https://apptasks-nodejs.herokuapp.com/api/v1/tasks/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        getTasks();
        toastSuccess();
      })
      .catch((error) => {
        console.log(error);
        toastError();
      });
  };

  const filterTasks = (event) => {
    setTasksFiltered(event.target.value);
  };

  const formatDate = (date) => {
    let newDate = moment(date).add(1, "days").format("DD-MM-YYYY");
    return newDate;
  };

  const onChangeSelect = (task) => {
    let today = moment().subtract(1, "days"); //Fecha de hoy usando moment
    let startOfWeek = moment().startOf("week");
    let endOfWeek = moment().endOf("week");
    let startOfNextWeek = moment(endOfWeek).add(1, "seconds");
    let endOfNextWeek = moment(endOfWeek).add(7, "days");
    switch (type) {
      case "all":
        return true;
      case "today":
        if (moment(task.date).isSame(today, "day")) {
          return true;
        } else {
          return false;
        }
      case "week":
        if (moment(task.date).isBetween(startOfWeek, endOfWeek)) {
          return true;
        } else {
          return false;
        }
      case "nextWeek":
        if (moment(task.date).isBetween(startOfNextWeek, endOfNextWeek)) {
          return true;
        } else {
          return false;
        }
      case "completed":
        if (task.is_completed) {
          return true;
        } else {
          return false;
        }
      case "noCompleted":
        if (!task.is_completed) {
          return true;
        } else {
          return false;
        }
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const showStatusCard = (task) => {
    if (task.is_completed === true) {
      return <CheckCircleOutlineIcon />;
    } else {
      return <TimerIcon />;
    }
  };
  return (
    <div>
      <Navpanel filter={filterTasks} type={type} handleChange={handleChange} />
      <div className="mt-4 mb-5 has-background-light">
        <CssBaseline />
        <Container>
          <Grid container className="mb-4 mt-4" spacing={1} justify="flex-end">
            {showForm()}
          </Grid>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} justify="center">
              <Grid container spacing={1} alignContent="space-around">
                {tasks
                  .filter((task) => {
                    return task.content === ""
                      ? true
                      : task.content
                          .toLocaleLowerCase()
                          .includes(tasksFiltered.toLocaleLowerCase());
                  })
                  .filter((task) => onChangeSelect(task))
                  .map((task) => {
                    return (
                      <Grid item xs={12} sm={6} lg={3}>
                        <Box>
                          <Cards
                            taskFn={task}
                            showStatusCardFn={showStatusCard}
                            deleteTaskFn={deleteTask}
                            setTaskFn={setTask}
                            updateTaskCompletedFn={updateTaskCompleted}
                            formatDateFn={formatDate}
                          />
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Divider />
    </div>
  );
}
