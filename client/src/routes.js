import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { EmployeePage } from "./pages/EmployeePage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/employee" exact>
          <EmployeePage />
        </Route>
        <Redirect to="/employee" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
