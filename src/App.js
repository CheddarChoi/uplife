import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/customStyle.css";

import Home from "./Pages/Home";
import Goal from "./Pages/Goal";

import Header from "./Components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/goal" component={Goal} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
