import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../css/Navbar.css";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div className="navigation-wrapper">
      <div className="navigation-content">Vacation managing</div>
      <div className="navigation-content">
        <a href="/" onClick={logoutHandler}>
          Exit
        </a>
      </div>
    </div>
  );
};
