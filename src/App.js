import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";

import Header from "./Components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
