import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/home" component={Home} />
      {/* {/* <Route path="/roster" component={Roster} /> */}
    </Switch>
  );
}

export default App;
