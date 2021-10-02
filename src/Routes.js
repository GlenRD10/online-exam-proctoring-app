import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "./containers/login/Login";
import Dashboard from "./containers/dashboard/Dashboard";
import Main from "./containers/exam/Main";
import Instructions from "./containers/exam/Instructions";

export default function RoutesMain() {
  return (
    <Routes>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/instructions">
        <Instructions />
      </Route>
      <Route exact path="/main">
        <Main />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Routes>
  );
}
