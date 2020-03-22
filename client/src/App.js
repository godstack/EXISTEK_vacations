import React, { useState, useEffect } from "react";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import "materialize-css";
import { AuthContext } from "./context/auth.context";
import { Navbar } from "./components/Navbar";

const storageName = "UserData";

function App() {
  const { login, logout, token, user } = useAuth();

  const isAthenticated = !!token;

  const routes = useRoutes(isAthenticated);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        user,
        isAthenticated,
        storageName
      }}
    >
      <Router>
        {isAthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
