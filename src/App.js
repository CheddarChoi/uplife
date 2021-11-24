import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./static/customStyle.css";

import Home from "./Pages/Home";
import Goal from "./Pages/Goal";
import TotalGoal from "./Pages/TotalGoal";
import CategoryGoal from "./Pages/CategoryGoal";
import TimeGoal from "./Pages/TimeGoal";
import Header from "./Components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/goal" component={Goal} />
          <Route exact path="/goal/total" component={TotalGoal} />
          <Route exact path="/goal/category" component={CategoryGoal} />
          <Route exact path="/goal/time" component={TimeGoal} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
