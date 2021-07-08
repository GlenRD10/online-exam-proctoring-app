import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/login/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/login/Login";
import Dashboard from "./containers/dashboard/Dashboard";

export default function RoutesMain() {
  return (
    <Routes>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Routes>
  );
}
