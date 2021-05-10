import React from 'react'
import {useState, useEffect} from "react";
import "./App.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import 'bulma/css/bulma.css'
import Loading from "./components/loading";
import TaskPanel from "./pages/task-panel";
import NotFound from "./pages/404-error";
import {
    Switch,
    Route,
  } from "react-router-dom";

export default function App() {

  const [loading, setloading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setloading(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="App">
      <Switch>
        {/* Ruta protegida */}
        <TaskPanel path="/task-panel" />
        <Route exact path="/">
            {loading === false
            ? <TaskPanel />
            : <Loading />
            }
        </Route>
        {/* Pagina 404 */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

