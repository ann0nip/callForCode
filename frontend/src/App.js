import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";

const Logout = () => {
  localStorage.removeItem("tokenId");
  return <Redirect to="/" />;
};

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <ProtectedRoute path="/home" component={Home} />
      <Route path="/logout" component={Logout} />
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  );
}

export default App;
