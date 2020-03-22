import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  token: null,
  user: null,
  setUser: noop,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  storageName: ""
});
